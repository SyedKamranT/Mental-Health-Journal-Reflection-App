import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { WelcomePage } from "./pages/auth/WelcomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";

import { DashboardPage } from "./pages/DashboardPage";
import { JournalEntryPage } from "./pages/JournalEntryPage";
import { JournalHistoryPage } from "./pages/JournalHistoryPage";
import { InsightsPage } from "./pages/InsightsPage";
import { ReflectionPromptsPage } from "./pages/ReflectionPromptsPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  // Public auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <WelcomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
  // Protected app routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <RootLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "journal/new", element: <JournalEntryPage /> },
          { path: "journal/:id", element: <JournalEntryPage /> },
          { path: "journal", element: <JournalHistoryPage /> },
          { path: "insights", element: <InsightsPage /> },
          { path: "prompts", element: <ReflectionPromptsPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);
