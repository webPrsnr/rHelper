import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "@/components/Elements";
import { Dashboard as Layout } from "@/components/Layouts";
import { lazyImport } from "@/utils/lazyImport";

const { Dashboard } = lazyImport(() => import("@/features/misc"), "Dashboard");
const { Profile } = lazyImport(() => import("@/features/users"), "Profile");

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
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
