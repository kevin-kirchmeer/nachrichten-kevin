import { useAssets } from "../hooks/useAssets";
import { Link } from "react-router-dom";

export default function MedienPage() {
  const { assets, loading, error } = useAssets();

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Lade Medien-Galerie...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">Fehler: {error}</p>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Medien-Galerie</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Zurück zu Nachrichten
        </Link>
      </div>

      {assets.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Keine Medien gefunden.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assets.map((asset) => {
            const rawUrl = asset.fields.file?.url;
            const imageUrl = rawUrl ? `https:${rawUrl}` : null;
            const title = asset.fields.title || "Unbenanntes Bild";

            return (
              <div
                key={asset.sys.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col"
              >
                {imageUrl ? (
                  <img
                    src={`${imageUrl}?w=400&h=300&fit=fill&fm=webp&q=80`}
                    alt={title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    Kein Bild
                  </div>
                )}
                <div className="p-4 flex flex-col grow justify-between">
                  <h2 className="font-semibold text-gray-800 text-sm truncate" title={title}>
                    {title}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {asset.fields.file?.details?.image
                      ? `${asset.fields.file.details.image.width} x ${asset.fields.file.details.image.height} px`
                      : "Datei"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}