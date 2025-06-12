import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AboutPage from "./pages/about/about";
import HomePage from "./pages/home/home";
import { ToastProvider } from "./provider/ToastProvider"; // pastikan path benar
// import QuestionPage from "./pages/test/question";
import TestIndexPage from "./pages/test/index";
import PersonalityTypesPage from "./pages/personality-types/personality-types";
import ScrollToTop from "./utils/ScrollToTop";
import NotFoundPage from "./pages/404";
import RespondentFormPage from "./pages/home/respondent-form";
import LoginPage from "./pages/login";

function App() {
  return (
    <ToastProvider>
      <ThemeConfig dark={true} />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}

            <Route path="/test" element={<TestIndexPage />} />
            {/* <Route path="/test/start" element={<TestStartPage />} />
            <Route path="/test/result" element={<TestResultPage />} /> */}

            <Route
              path="/respondent-fill-form"
              element={<RespondentFormPage />}
            />
            <Route
              path="/personality-types"
              element={<PersonalityTypesPage />}
            />

            <Route path="/sys/g/login" element={<LoginPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
