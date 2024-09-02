import { Route, Routes } from "react-router-dom";
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
    <div className="overflow-hidden">
      <Toaster />
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/change-password" element={<ChangePassword />} />
          <Route
            path="/auth/change-password-email-verify"
            element={<ChangePasswordEmailVerify />}
          />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route
            path="/auth/reset-password-verify-email"
            element={<ResetPasswordVerify />}
          />
          <Route path="/auth/set-new-password" element={<NewPassword />} />
          <Route path="/auth/2fa" element={<TwoFAPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/eagle-view" element={<EagleView />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="/subscription-manager"
            element={<SubscriptionManager />}
          />
          <Route
            path="/notification-manager"
            element={<NotificationManager />}
          />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}
