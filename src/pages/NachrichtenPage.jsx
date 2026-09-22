import { useNachrichten } from "../hooks/useNachrichten";
import { Link } from "react-router-dom";

export default function NachrichtenPage() {
  const { items, loading, error } = useNachrichten();

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Lädt Nachrichten...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">Upsii da ist etwas schiefgelaufen: {error}</p>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Nachrichten - News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.sys.id}
            to={`/nachricht/${item.sys.id}`}
            className="block p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {item.fields.titel}
            </h2>
            <p className="text-gray-600 line-clamp-3">
              {item.fields.teaser}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}