import { RegisterValues } from "../components";

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
  user: RegisterValues;
}
