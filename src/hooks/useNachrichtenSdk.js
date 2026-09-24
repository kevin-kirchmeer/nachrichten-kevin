import { useEffect, useState } from "react";
import { client } from "../lib/contentful";

const LIMIT = 3;

export function useNachrichtenSdk(tag = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [prevTag, setPrevTag] = useState(tag);
  const [hasMore, setHasMore] = useState(true);

  if (prevTag !== tag) {
    setPrevTag(tag);
    setSkip(0);
  }

  useEffect(() => {
    async function loadEntries() {
      try {
        setLoading(true);
        setError(null);

        const query = {
          content_type: "nachrichten",
          limit: LIMIT,
          skip: skip,
          order: "-sys.createdAt",
        }

        if (tag) {
          query["fields.hashtags[in]"] = tag;
        }

        const response = await client.getEntries(query);
        const fetchedItems = response.items ?? [];

        const enrichedItems = fetchedItems.map((item) => {
          const rawUrl = item.fields.bild?.fields?.file?.url;
          const bildUrl = rawUrl ? `https:${rawUrl}` : null;

          return {
            ...item,
            bildUrl,
          };
        });

        if (skip === 0) {
          setItems(enrichedItems ?? []);
        } else {
          setItems((prev) => [...prev, ...(enrichedItems ?? [])]);
        }

        setHasMore(skip + LIMIT < response.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, [tag, skip]);

  const loadMore = () => {
    setSkip((prev) => prev + LIMIT);
  };

  return { items, loading, error, loadMore, hasMore };
}
