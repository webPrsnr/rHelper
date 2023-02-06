import { api } from "@/lib/ky";
import { RegisterValues } from "../components";

export const getUser = async (): Promise<RegisterValues> => {
  // try {
  return await api.get("me").json();
  // } catch (error) {
  //   return null;
  // }
};
