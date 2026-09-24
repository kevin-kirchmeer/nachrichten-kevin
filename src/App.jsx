import "./App.css";
import NachrichtenPage from "./pages/NachrichtenPage";
import NachrichtenDetailPage from "./pages/NachrichtenDetailPage";
import MedienPage from "./pages/MedienPage";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-light items-center">
      <Header />
      <Routes>
        <Route path="/" element={<NachrichtenPage />} />
        <Route path="/nachricht/:id" element={<NachrichtenDetailPage />} />
        <Route path="/medien" element={<MedienPage />} />
      </Routes>
    </div>
  );
}
