import { useEffect, useState } from "react";
import { client } from "../lib/contentful";

export function useAssets() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAssets() {
      try {
        setLoading(true);
        setError(null);

        const response = await client.getAssets({
          order: "-sys.createdAt",
        });

        setItems(response.items ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  return {items, loading, error}
}
