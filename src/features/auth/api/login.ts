import { api } from "@/lib/ky";

import { LoginValues } from "../components";
import { UserResponse } from "../types/response";

export interface LoginDTO extends LoginValues {}

export const login = async (data: LoginValues): Promise<UserResponse> => {
  return await api.post("login", { json: data }).json();
};
