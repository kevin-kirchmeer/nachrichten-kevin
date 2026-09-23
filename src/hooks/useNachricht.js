import { useEffect, useState } from "react";

const SPACE = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.VITE_CONTENTFUL_TOKEN;
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

export function useNachricht(id) {
  const [nachricht, setNachricht] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const url =
          `${BASE}/entries?content_type=nachrichten` +
          `&sys.id=${id}` +
          `&access_token=${TOKEN}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Fehler beim Laden: ${response.statusText}`);
        }

        const data = await response.json();
        const item = data.items[0];

        if (!item) {
            throw new Error("Nachricht nicht gefunden...");
        }

        const bildId = item.fields.bild?.sys.id;
        const asset = data.includes?.Asset?.find((a) => a.sys.id === bildId);
        const bildUrl = asset ? "https:" + asset.fields.file.url : null;

        setNachricht({ ...item.fields, bildUrl });

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { nachricht, loading, error };
}
