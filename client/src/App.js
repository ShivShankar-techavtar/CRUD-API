import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddUserPage = lazy(() => import("./pages/AddUserPage"));
const EditUserPage = lazy(() => import("./pages/EditUserPage"));
const ViewUserPage = lazy(() => import("./pages/ViewUserPage"));

const PageFallback = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-400">
    Loading…
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  { path: "/", element: withSuspense(Dashboard) },
  { path: "/add", element: withSuspense(AddUserPage) },
  { path: "/update/:id", element: withSuspense(EditUserPage) },
  { path: "/view/:id", element: withSuspense(ViewUserPage) },
]);

function App() {
  return (
    <div className="App min-h-screen bg-surface">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#22C55E", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
