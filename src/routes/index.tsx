import { useRoutes } from "react-router-dom";

import { Landing } from "@/features/misc";

import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { useUser } from "@/lib/auth";

export const AppRoutes = () => {
  const { data: user } = useUser();
  const commonRoutes = [{ path: "/", element: <Landing /> }];

  const routes = user ? protectedRoutes : publicRoutes;
  const element = [...commonRoutes, ...routes];

  const router = useRoutes(element);

  return <>{router}</>;
};
