import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span className="bg-emerald-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">
            N
          </span>
          NewsHub
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Nachrichten
          </NavLink>

          <NavLink
            to="/medien"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Medien-Galerie
          </NavLink>
        </nav>

      </div>
    </header>
  );
}