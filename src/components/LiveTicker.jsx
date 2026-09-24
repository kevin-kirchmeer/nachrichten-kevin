import { useTicker } from "../hooks/useTicker";

export default function LiveTicker() {
  const { items, loading, error } = useTicker();

  if (loading) {
    return <aside className="p-4 text-gray-500">Ticker wird geladen...</aside>;
  }

  if (error) {
    return (
      <aside className="p-4 text-red-500">Fehler beim Ticker: {error}.</aside>
    );
  }

  return (
    <aside className="bg-gray-100 p-4 rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
        Live Ticker
      </h2>

      <ul className="space-y-4">
        {items.map((item) =>(
            <li key={item.sys.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                <strong>
                    {item.fields.titel}
                </strong>
                <p className="text-sm text-gray-600 mt-1">
                    {item.fields.text}
                </p>
            </li>
        ))}
      </ul>
    </aside>
  );
}
