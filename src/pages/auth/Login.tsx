import { LoginForm, LoginRobot } from "../../components/login/index";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";

export default function Login() {
  // const accessToken = useAuthStore((state) => state.accessToken);

  // if (accessToken) {
  //   return <Navigate to="/dashboard" />;
  // }

  // Use the custom hook to handle redirection
  useRedirectIfLoggedIn();

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
