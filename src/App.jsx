import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AboutPage from "./pages/about/about";
import HomePage from "./pages/home/home";
import { ToastProvider } from "./provider/ToastProvider";
import TestIndexPage from "./pages/test/index";
import PersonalityTypesPage from "./pages/personality-types/personality-types";
import ScrollToTop from "./utils/ScrollToTop";
import NotFoundPage from "./pages/404";
import RespondentFormPage from "./pages/home/respondent-form";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/sys/dashboard/page";
import RespondentPage from "./pages/sys/respondent/page";
import RespondentShowPage from "./pages/sys/respondent/show";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ThemeConfig dark={true} />
        <ScrollToTop />

        {/* ✅ Public Layout */}
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/test" element={<TestIndexPage />} />
            <Route
              path="/respondent-fill-form"
              element={<RespondentFormPage />}
            />
            <Route
              path="/personality-types"
              element={<PersonalityTypesPage />}
            />
          </Route>

          <Route path="/g/login" element={<LoginPage />} />
          {/* ✅ Admin-only layout */}
          <Route path="/sys" element={<Layout isRole="Admin" />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="respondents" element={<RespondentPage />} />
            <Route path="respondents/:id" element={<RespondentShowPage />} />
            <Route path="master" element={<div>Data Master</div>} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
