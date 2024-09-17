import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import ChangePassword from "./pages/auth/ChangePassword";
import ChangePasswordEmailVerify from "./pages/auth/ChangePasswordEmailVerify";
import TwoFAPage from "./pages/auth/TwoFa";
import {
  ActivityLog,
  Dashboard,
  EagleView,
  Login,
  NewPassword,
  NotificationManager,
  Reports,
  ResetPassword,
  ResetPasswordVerify,
  Settings,
  SubscriptionManager,
  Support,
  SystemStatus,
  UserManagement,
} from "./pages/index";

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate replace to="/auth/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route
            path="change-password-email-verify"
            element={<ChangePasswordEmailVerify />}
          />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="reset-password-verify-email"
            element={<ResetPasswordVerify />}
          />
          <Route path="set-new-password" element={<NewPassword />} />
          <Route path="2fa" element={<TwoFAPage />} />
        </Route>

        {/* Main Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="eagle-view" element={<EagleView />} />
          <Route path="support" element={<Support />} />
          <Route path="subscription-manager" element={<SubscriptionManager />} />
          <Route path="notification-manager" element={<NotificationManager />} />
          <Route path="system-status" element={<SystemStatus />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
