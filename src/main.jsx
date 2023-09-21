import ReactDOM from "react-dom/client";
// import * as React from "react";
// import "./index.css";
import "../style/App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import ThemProvider from "./components/ThemProvider";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import MainDashboard from "./pages/admin/MainDashboard";
import Students from "./pages/admin/Students";
import AdminProtection from "./components/AdminProtection";
import Wallets from "./pages/admin/Wallets";

const route = createBrowserRouter([
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signUp", element: <SignUp /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile/:id", element: <h1> user profile page</h1> },
      { path: "/student-dashboard", element: <StudentDashboard /> },
    ],
  },
  {
    path: "/f35-fighter",
    element: (
      <AdminProtection>
        <AdminDashboardLayout />
      </AdminProtection>
    ),
    children: [
      // Admin Dashboard routes
      { path: "", element: <MainDashboard /> },
      { path: "students", element: <Students /> },
      { path: "add-funds", element: <Wallets /> },
      { path: "profile/:id", element: <h1> user profile page</h1> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <ThemProvider>
      <RouterProvider router={route} />
    </ThemProvider>
  </NextUIProvider>
);
