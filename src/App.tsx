import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Login,
  NotificationManager,
  Settings,
  SubscriptionManager,
  Support,
  UserManagement,
  Reports,
  SystemStatus,
  ActivityLog,
  EagleView,
  ResetPassword,
  ResetPasswordVerify,
} from "./pages/index";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route
          path="/auth/reset-password-verify-email"
          element={<ResetPasswordVerify />}
        />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/eagle-view" element={<EagleView />} />
        <Route path="/support" element={<Support />} />
        <Route path="/subscription-manager" element={<SubscriptionManager />} />
        <Route path="/notification-manager" element={<NotificationManager />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
