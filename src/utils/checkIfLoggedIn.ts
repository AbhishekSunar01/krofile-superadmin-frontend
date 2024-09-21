import Cookies from "js-cookie";

export function isUserLoggedIn(): boolean {
  const token = Cookies.get("accessToken");

  return !!token;
}
