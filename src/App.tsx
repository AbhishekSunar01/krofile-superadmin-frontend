import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import ProtectedRoute from "./components/custom-ui/ProtectedRouteComponent";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import ChangePassword from "./pages/auth/ChangePassword";
import ChangePasswordSuccess from "./pages/auth/ChangePasswordSuccess";
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
import ActiveUsersGrowthPage from "./pages/reports/ActiveUsersGrowthPage";
import ActiveUsersPage from "./pages/reports/ActiveUsersPage";
import B2bReferralPage from "./pages/reports/B2bReferralPage";
import ChurnRatePage from "./pages/reports/ChurnRatePage";
import IndustryTypePage from "./pages/reports/IndustryTypePage";
import PopularCountriesPage from "./pages/reports/PopularCountriesPage";
import RetentionGrowthPage from "./pages/reports/RetentionGrowthPage";
import SystemHealthPage from "./pages/reports/SystemHealthPage";

export default function App() {
  return (
    <div className="overflow-hidden">
      <Toaster />
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route
            path="/auth/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/change-password-success"
            element={
              <ProtectedRoute>
                <ChangePasswordSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route
            path="/auth/reset-password-verify-email"
            element={<ResetPasswordVerify />}
          />
          <Route path="/auth/set-new-password" element={<NewPassword />} />
          <Route path="/auth/2fa" element={<TwoFAPage />} />
        </Route>
        {/* Protected route */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/reports/active-users-growth"
            element={<ActiveUsersGrowthPage />}
          />
          <Route path="/reports/active-users" element={<ActiveUsersPage />} />
          <Route
            path="/reports/retention-growth"
            element={<RetentionGrowthPage />}
          />
          <Route path="/reports/churn-rate" element={<ChurnRatePage />} />
          <Route path="/reports/system-health" element={<SystemHealthPage />} />
          <Route path="/reports/b2b-referral" element={<B2bReferralPage />} />
          <Route
            path="/reports/popular-countries"
            element={<PopularCountriesPage />}
          />
          <Route path="/reports/industry-type" element={<IndustryTypePage />} />

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
