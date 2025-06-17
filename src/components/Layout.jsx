import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import FooterCustom from "./partials/Footer";

export default function Layout({ isRole }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isRole={isRole} />
      <main className="flex-grow w-full">
        <div className="w-full">
          <Outlet /> {/* ⬅️ Ini penting agar children route muncul */}
        </div>
      </main>
      <FooterCustom />
    </div>
  );
}
