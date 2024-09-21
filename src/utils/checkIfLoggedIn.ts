export function isUserLoggedIn(): boolean {
  const token = localStorage.getItem("token");

  return !!token;
}
