import { useEffect, useState } from "react";

const SPACE = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const TOKEN = import.meta.env.VITE_CONTENTFUL_TOKEN;
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

export function useNachrichten(){
    const [items, setItems] = useState(null);
    
    useEffect(() => {
        async function load() {

            const url = `${BASE}/entries?` +
            `content_type=nachrichten` + 
            `&select=sys.id,fields.title,fields.teaser` + 
            `&order=-sys.createdAt&access_token=${TOKEN}`;

            const data = await (await fetch(url)).json();

            setItems(
                data.items.map(items => (
                    {
                        id: items.sys.id,
                        title: items.fields.title,
                        body: items.fields.body,
                        category: items.fields.category
                    }
                ))
            )
        }

        load();
    }, []);

    return { items };
}
