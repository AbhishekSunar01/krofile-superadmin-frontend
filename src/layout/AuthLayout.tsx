import { Outlet } from "react-router-dom";
import MainLogo from "../assets/png/Main logo.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white px-[40px] py-[40px]">
      <span className="h-[50px] w-[150px]">
        <img src={MainLogo} alt="Main Logo" className="w-[150px] h-[50px]" />
      </span>
      <Outlet />
    </div>
  );
}
