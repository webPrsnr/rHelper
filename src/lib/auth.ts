import { getUser } from "@/features/auth/api/getUser";
import { register, RegisterDTO } from "@/features/auth/api/register";
import { UserResponse } from "@/features/auth/types/response";
import { configureAuth } from "react-query-auth";
import { storage } from "@/utils/storage";
import { login, LoginDTO } from "@/features/auth/api/login";

const handleUserResponse = async (data: UserResponse) => {
  const { accessToken, user } = data;
  storage.setToken(accessToken);
  return user;
};

const userFn = async () => {
  if (storage.getToken() !== null) {
    const user = await getUser();
    return user;
  }
  return null;
};

const registerFn = async (data: RegisterDTO) => {
  const response = await register(data);
  const user = await handleUserResponse(response);
  return user;
};

const loginFn = async (data: LoginDTO) => {
  const response = await login(data);
  const user = await handleUserResponse(response);
  return user;
};

const logoutFn = async () => {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
};

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });
