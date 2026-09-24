import { useNachrichtenSdk } from "../hooks/useNachrichtenSdk";
import { Link } from "react-router-dom";
import { useState } from "react";
import LiveTicker from "../components/LiveTicker";

export default function NachrichtenPage() {
  const [selectedTag, setSelectedTag] = useState(null);
  const { items, loading, error, loadMore, hasMore } =
    useNachrichtenSdk(selectedTag);

  if (loading && items.length === 0) {
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

        {["horror", "gaming", "modding", "fps", "survival"].map((tag) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-3">
                Keine Nachrichten zu diesem Thema gefunden.
              </p>
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="text-emerald-600 hover:text-emerald-700 underline font-medium cursor-pointer"
              >
                Zurück zu allen Nachrichten
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link
                  key={item.sys.id}
                  to={`/nachricht/${item.sys.id}`}
                  className="overflow-hidden flex flex-col bg-gray-200 hover:bg-emerald-50 rounded-lg shadow-sm hover:shadow-md hover:shadow-emerald-700 transition-shadow duration-200 border border-gray-100"
                >
                  {item.bildUrl && (
                    <img
                      src={`${item.bildUrl}?w=400&h=200&fit=fill&fm=webp&q=80`}
                      alt={item.fields.titel}
                      className="w-full h-40 object-cover"
                    />
                  )}

                  <div className="p-5 flex flex-col grow">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">
                      {item.fields.titel}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {item.fields.teaser}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {hasMore && items.length > 0 && (
            <div className="text-center mt-8">
              <button
                type="button"
                onClick={loadMore}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Mehr laden
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <LiveTicker />
        </div>
      </div>
    </main>
  );
}
