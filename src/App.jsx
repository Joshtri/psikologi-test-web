import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AboutPage from "./pages/about/about";
import HomePage from "./pages/home/home";
import { ToastProvider } from "./provider/ToastProvider"; // pastikan path benar
// import QuestionPage from "./pages/test/question";
import TestStartPage from "./pages/test/start";
import TestIndexPage from "./pages/test";
import TestResultPage from "./pages/test/result";

function App() {
  return (
    <ToastProvider>
      <ThemeConfig dark={false} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/tentang" element={<AboutPage />} />


            <Route path="/test" element={<TestIndexPage />} />
            <Route path="/test/start" element={<TestStartPage />} />
            <Route path="/test/result" element={<TestResultPage />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
