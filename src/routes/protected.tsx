import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "@/components/Elements";
import { Dashboard as Layout } from "@/components/Layouts";
import { lazyImport } from "@/utils/lazyImport";

const { Panel } = lazyImport(() => import("@/features/dashboard"), "Panel");
const { Profile } = lazyImport(() => import("@/features/users"), "Profile");

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner size="md" />
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
      { path: "", element: <Panel /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];
