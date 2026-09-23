import { useParams } from "react-router-dom";
import { useNachricht } from "../hooks/useNachricht";

export default function NachrichtenDetailPage() {
  const { id } = useParams();
  const { nachricht, loading, error } = useNachricht(id);

  if (loading) {
    return <p>Bilder werden geladen...</p>;
  }

  if (error) {
    return <p>Es ist ein fehler entstanden, versuch es nochmal!</p>;
  }

  if (!nachricht) {
    return <p>Keine Nachricht gefunden.</p>;
  }

  return (
    <article className="max-w-3xl mx-auto p-6">
      {nachricht.bildUrl && (
        <img
          src={nachricht.bildUrl}
          alt={nachricht.titel}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{nachricht.titel}</h1>
      <p className="text-gray-700 mb-6">{nachricht.inhalt}</p>

      <div className="flex flex-wrap gap-2">
        {nachricht.hashtags?.map((tag) => {
          return (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full font-medium"
            >
              #{tag}
            </span>
          );
        })}
      </div>
    </article>
  );
}
