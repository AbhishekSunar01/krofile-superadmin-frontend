import axios, { AxiosResponse } from "axios";
import { ILoginResponse } from "../../types/authTypes";

const baseUrl: string | undefined = import.meta.env.VITE_BASE_URL; // Vite uses import.meta.env
// console.log("baseurl", baseUrl);

export const handleLogin = async (email: string, password: string) => {
  try {
    const response: AxiosResponse<ILoginResponse> = await axios.post<ILoginResponse>(
      `${baseUrl}/auth/signIn`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in handleLogin function here", error);
    throw error;
  }
};
