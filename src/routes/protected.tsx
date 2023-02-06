import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "@/components/Elements";

import { lazyImport } from "@/utils/lazyImport";

const { Dashboard } = lazyImport(() => import("@/features/misc"), "Dashboard");
const { Profile } = lazyImport(() => import("@/features/users"), "Profile");

const App = () => {
  return (
    //LAYOUT component
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <h1>HEADER</h1>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];
