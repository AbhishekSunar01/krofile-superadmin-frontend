import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
