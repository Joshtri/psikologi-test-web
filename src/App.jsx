import { ThemeConfig } from "flowbite-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AboutPage from "./pages/about/about";
import HomePage from "./pages/home/home";
import { ToastProvider } from "./provider/ToastProvider";
import TestIndexPage from "./pages/test/index";
import ScrollToTop from "./utils/ScrollToTop";
import NotFoundPage from "./pages/404";
import RespondentFormPage from "./pages/home/respondent-form";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/sys/dashboard/page";
import RespondentPage from "./pages/sys/respondents/page";
import RespondentShowPage from "./pages/sys/respondents/show";
import MasterPage from "./pages/sys/master/page";
import RespondentResultsPage from "./pages/sys/respondents-results/page";
import TestResultsPage from "./pages/test/results";
import ResultsPage from "./pages/results/resultsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ThemeConfig dark={true} />
        <ScrollToTop />

        {/* ✅ Public Layout */}
        <Routes>
          {/* ✅ Public Layout */}
          <Route element={<Layout />}>
            <Route
              index
              element={<HomePage />}
            />
            <Route
              path="/test"
              element={<TestIndexPage />}
            />
            <Route
              path="/respondent-fill-form"
              element={<RespondentFormPage />}
            />
            <Route
              path="/test-results"
              element={<ResultsPage />}
            />
            <Route
              path="results"
              element={<ResultsPage />}
            />
          </Route>

          <Route
            path="/g/login"
            element={<LoginPage />}
          />

          {/* ✅ Admin-only layout */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route
              path="/sys"
              element={<Layout isRole="Admin" />}
            >
              <Route
                path="dashboard"
                element={<DashboardPage />}
              />
              <Route
                path="respondents"
                element={<RespondentPage />}
              />
              <Route
                path="respondents/:id"
                element={<RespondentShowPage />}
              />
              <Route
                path="master"
                element={<MasterPage />}
              />
              <Route
                path="respondents-results"
                element={<RespondentResultsPage />}
              />
            </Route>
          </Route>

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
