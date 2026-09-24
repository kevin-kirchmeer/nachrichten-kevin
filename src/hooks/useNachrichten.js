import { useEffect, useState } from "react";

const SPACE = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.VITE_CONTENTFUL_TOKEN;
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;
const LIMIT = 3;

export function useNachrichten(tag = null) {
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
    async function load() {
      try {
        setLoading(true);
        setError(null);

        let url =
          `${BASE}/entries?content_type=nachrichten` +
          `&select=sys.id,fields.titel,fields.teaser,fields.bild` +
          `&limit=${LIMIT}&skip=${skip}` +
          `&order=-sys.createdAt&access_token=${TOKEN}`;

        if (tag) {
          url += `&fields.hashtags[in]=${tag}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Fehler beim Laden: ${response.statusText}`);
        }

        const data = await response.json();

        const assets = data.includes?.Asset ?? [];
        const enrichedItems = data.items.map((item) => {
          const imageId = item.fields.bild?.sys?.id;
          const foundAsset = assets.find((asset) => asset.sys.id === imageId);
          const rawUrl = foundAsset?.fields?.file?.url;
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
        setHasMore(skip + LIMIT < data.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [tag, skip]);

  const loadMore = () => {
    setSkip((prev) => prev + LIMIT);
  };

  return { items, loading, error, loadMore, hasMore };
}
