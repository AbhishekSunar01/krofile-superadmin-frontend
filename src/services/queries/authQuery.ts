import { useQuery } from "@tanstack/react-query";
import { getLoggedinUser } from "../api/auth";

export function useLoggedInUser() {
  return useQuery({
    queryKey: ["loggedInUser"],
    queryFn: getLoggedinUser,
  });
}
