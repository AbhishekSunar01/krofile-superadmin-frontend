import { Outlet } from "react-router-dom";
import SideBar from "../containers/SideBar";

export default function MainLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow flex flex-col pl-[260px]">
        <Outlet />
      </div>
    </div>
  );
}
