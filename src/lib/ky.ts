import { UserResponse } from "@/features/auth/types/response";
import { storage } from "@/utils/storage";
import ky, { Options } from "ky";
const baseURL = "http://localhost:5000/api/v1/";

const authRequestInterceptor = (request: Request, options: Options) => {
  const token = storage.getToken();
  if (token) {
    request.headers.set("authorization", `Bearer ${token}`);
  }
};

const retryWithFreshToken = async (
  request: Request,
  options: Options,
  response: Response
) => {
  const token = storage.getToken();
  if (response.status === 401 && token) {
    console.log("run");
    const data = (await api.get("refresh").json()) as UserResponse;
    storage.setToken(data.accessToken);
    request.headers.set("authorization", `Bearer ${data?.accessToken}`);
    return ky(request);
  }
};

export const api = ky
  .create({ prefixUrl: baseURL, credentials: "include" })
  .extend({
    hooks: {
      beforeRequest: [authRequestInterceptor],
      afterResponse: [retryWithFreshToken],
    },
  });
