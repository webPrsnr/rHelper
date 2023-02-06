import { api } from "@/lib/ky";

import { RegisterValues } from "../components";
import { UserResponse } from "../types/response";

export interface RegisterDTO extends RegisterValues {}

export const register = async (data: RegisterDTO): Promise<UserResponse> => {
  return await api.post("registration", { json: data }).json();
};
