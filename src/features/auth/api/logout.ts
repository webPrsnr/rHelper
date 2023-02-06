import { api } from "@/lib/ky";

interface LogoutResponse {
  message: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  return await api.post("logout").json();
};
