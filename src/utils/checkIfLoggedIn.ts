import Cookies from "js-cookie";

export function isUserLoggedIn(): boolean {
  const token = Cookies.get("access_token");

  return !!token;
}
