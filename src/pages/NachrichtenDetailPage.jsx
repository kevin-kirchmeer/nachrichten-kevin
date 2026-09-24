import { useParams } from "react-router-dom";
import { useNachricht } from "../hooks/useNachricht";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col m-5 gap-4">
      <Link to="/" className="px-4 py-2 bg-blue-700 text-white text-sm font-bold hover:shadow-2xl hover:scale-105 duration-200 transition-all rounded-full w-fit">
        Zurück zu den Nachrichten
      </Link>
      
      <article className="max-w-3xl mx-auto">
        {nachricht.bildUrl ? (
          <img
            src={nachricht.bildUrl}
            alt={nachricht.titel}
            className="w-full h-auto rounded-lg mb-6"
          /> ) : ( <p className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-6">Kein Bild vorhanden.</p> )
        }

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
    </div>
  );
}
