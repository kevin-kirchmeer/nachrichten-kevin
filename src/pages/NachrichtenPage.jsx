import { useNachrichten } from "../hooks/useNachrichten";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NachrichtenPage() {
  const [selectedTag, setSelectedTag] = useState(null);
  const { items, loading, error } = useNachrichten(selectedTag);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Lädt Nachrichten...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-500">
        Upsii da ist etwas schiefgelaufen: {error}
      </p>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Nachrichten - News
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-1.5 rounded-full text-sm cursor-pointer font-medium transition-colors ${
            selectedTag === null
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Alle
        </button>

        {["horror", "gaming", "modding", "fps"].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer 
              ${
                selectedTag === tag
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.sys.id}
            to={`/nachricht/${item.sys.id}`}
            className="block p-5 bg-gray-200 hover:bg-emerald-50 rounded-lg shadow-sm hover:shadow-md hover:shadow-emerald-700 transition-shadow duration-200 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {item.fields.titel}
            </h2>
            <p className="text-gray-600 line-clamp-3">{item.fields.teaser}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
