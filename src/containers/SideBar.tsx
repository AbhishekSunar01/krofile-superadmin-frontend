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
  { to: "", src: UserManagement, label: "User Management" },
  { to: "", src: Reports, label: "Reports" },
  { to: "", src: Eagle, label: "Eagle's View" },
  { to: "", src: Support, label: "Support" },
  { to: "", src: Subscription, label: "Subscription Manager" },
  { to: "", src: Notification, label: "Notification Manager" },
  { to: "", src: System, label: "System Status" },
  { to: "", src: Activity, label: "Activity Log" },
  { to: "", src: Settings, label: "Settings" },
];

const SidebarItem = ({
  to,
  src,
  label,
}: {
  to: string;
  src: string;
  label: string;
}) => (
  <NavLink to={to} className="px-4">
    <div className="sidebar_item">
      <img src={src} alt={label} className="w-4 h-4" />
      {label}
    </div>
  </NavLink>
);

export default function SideBar() {
  return (
    <div className="h-screen fixed bg-card flex flex-col justify-between items-center border-r w-[260px]">
      <h1 className="h-[110px] border-b w-full flex flex-col justify-center text-center p-8">
        <img src={MainLogo} alt="Main Logo" className="w-full mx-auto" />
      </h1>

      <div className="h-full py-4 flex flex-col w-full">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>

      <div className="w-full px-4">
        <NavLink to={""} className="px-4">
          <div className="sidebar_item">
            <img src={Logout} alt="Logout" className="w-4 h-4" />
            Logout
          </div>
        </NavLink>
      </div>
    </div>
  );
}
