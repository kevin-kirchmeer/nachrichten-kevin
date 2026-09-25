import { useState, useEffect } from "react";
import { client } from "../lib/contentful";

export function useTicker() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTicker() {
            try {

                setError(null);

                const response = await client.getEntries({
                    content_type: "ticker",
                    order: "-sys.createdAt",
                    limit: 5,
                });
                
                setItems(response.items ?? []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTicker();

        const interval = setInterval(() => {
            fetchTicker()
        }, 30000);

        console.log(interval);
        return () => clearInterval(interval);
    }, []);

    return { items, loading, error }
}