import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";



function useRedirectIfLoggedIn(): void {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      // If user is logged in, navigate to the dashboard
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);
}

export default useRedirectIfLoggedIn;
