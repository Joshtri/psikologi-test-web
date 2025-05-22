import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/home";
import AboutPage from "./pages/about/about";
import { ToastProvider } from "./provider/ToastProvider"; // pastikan path benar

function App() {
  return (
    <ToastProvider>
      <ThemeConfig dark={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/tentang" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
