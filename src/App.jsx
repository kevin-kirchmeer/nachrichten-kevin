import "./App.css";
import NachrichtenPage from "./pages/NachrichtenPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Routes>
        <Route path="/" element={<NachrichtenPage />} />
      </Routes>
    </div>
  );
}
