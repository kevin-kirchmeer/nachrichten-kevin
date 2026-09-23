import { useEffect, useState } from "react";

const SPACE = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.VITE_CONTENTFUL_TOKEN;
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

export function useNachrichten(tag = null) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        let url =
          `${BASE}/entries?content_type=nachrichten` +
          `&select=sys.id,fields.titel,fields.teaser` +
          `&order=-sys.createdAt&access_token=${TOKEN}`;

          if (tag) {
            url += `&fields.hashtags[in]=${tag}`;
          }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Fehler beim Laden: ${response.statusText}`);
        }

        const data = await response.json();
        setItems(data.items ?? []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [tag]);

  return { items, loading, error };
}