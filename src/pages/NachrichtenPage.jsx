import { useNachrichten } from "../hooks/useNachrichten";
import { Link } from "react-router-dom";

export default function NachrichtenPage() {
  const { items } = useNachrichten();

  return (
    <div>
      <Link to={`/nachrichten/${items.sys.id}`}>
        <h2>{items.fields.titel}</h2>
        <p>{items.fields.teaser}</p>
      </Link>
    </div>
  );
}
