export interface AuthResponse {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  organization: string;
}

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthResponse;
}
