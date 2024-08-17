import { NavLink } from "react-router-dom";
import MainLogo from "../assets/png/Main logo.png";
import Dashboard from "../assets/png/Sidebar logos/Dashboard.png";
import UserManagement from "../assets/png/Sidebar logos/UserManagement.png";
import Reports from "../assets/png/Sidebar logos/Reports.png";
import Eagle from "../assets/png/Sidebar logos/Eagle.png";
import Support from "../assets/png/Sidebar logos/Support.png";
import Subscription from "../assets/png/Sidebar logos/SubscriptionManager.png";
import Notification from "../assets/png/Sidebar logos/NotificationManager.png";
import System from "../assets/png/Sidebar logos/SystemStatus.png";
import Activity from "../assets/png/Sidebar logos/ActivityLog.png";
import Settings from "../assets/png/Sidebar logos/Settings.png";
import Logout from "../assets/png/Sidebar logos/Logout.png";

const sidebarItems = [
  { to: "", src: Dashboard, label: "Dashboard" },
  { to: "/user-management", src: UserManagement, label: "User Management" },
  { to: "/reports", src: Reports, label: "Reports" },
  { to: "/eagle-view", src: Eagle, label: "Eagle's View" },
  { to: "/support", src: Support, label: "Support" },
  {
    to: "/subscription-manager",
    src: Subscription,
    label: "Subscription Manager",
  },
  {
    to: "notification-manager",
    src: Notification,
    label: "Notification Manager",
  },
  { to: "/system-status", src: System, label: "System Status" },
  { to: "activity-log", src: Activity, label: "Activity Log" },
  { to: "/settings", src: Settings, label: "Settings" },
];

const hoverEffect =
  "hover:font-medium transition-opacity ease-in-out duration-300 delay-75";

const SidebarItem = ({
  to,
  src,
  label,
}: {
  to: string;
  src: string;
  label: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 ${hoverEffect} ${
        isActive ? "bg-mainBg border-r-4 px-0 border-primary" : ""
      }`
    }
  >
    <div className="sidebar_item">
      <img src={src} alt={label} className="w-4 h-4" />
      {label}
    </div>
  </NavLink>
);

export default function SideBar() {
  return (
    <div className="h-screen fixed bg-card flex flex-col justify-between items-center w-[260px]">
      <h1 className="h-[110px] border-b w-full flex flex-col justify-center text-center p-8">
        <img src={MainLogo} alt="Main Logo" className="w-full mx-auto" />
      </h1>

      <div className="h-full py-4 flex flex-col w-full">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>

      <div className="w-full px-4">
        <NavLink to={""} className={`px-4 ${hoverEffect}`}>
          <div className="sidebar_item">
            <img src={Logout} alt="Logout" className="w-4 h-4" />
            Logout
          </div>
        </NavLink>
      </div>
    </div>
  );
}
