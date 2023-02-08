import { api } from "@/lib/ky";
import { AuthResponse } from "../types/response";

export const getUser = async (): Promise<AuthResponse> => {
  return await api.get("me").json();
};
