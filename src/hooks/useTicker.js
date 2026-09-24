import { useState, useEffect } from "react";
import { client } from "../lib/contentful";

export function useTicker() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTicker() {
            try {
                setLoading(true);
                setError(null);

                const response = await client.getEntries({
                    content_type: "ticker",
                    order: "-sys.createdAt",
                });
                
                setItems(response.items ?? []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadTicker();
    }, []);

    return { items, loading, error }
}