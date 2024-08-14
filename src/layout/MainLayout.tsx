import { Outlet } from "react-router-dom";
import SideBar from "../containers/SideBar";

export default function MainLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full ml-[260px] flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
