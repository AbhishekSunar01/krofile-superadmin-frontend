import { LoginForm, LoginRobot } from "../../components/login/index";

export default function Login() {
  return (
    <div className="grid grid-cols-2 w-full gap-12 -mt-[50px]">
      <div className="left col-span-1 h-full">
        <LoginForm />
      </div>
      <div className="right col-span-1">
        <LoginRobot />
      </div>
    </div>
  );
}
