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
import Lectures from "./pages/admin/Lectures";
import Grades from "./pages/Student/Grades";
import SpecificGrade from "./pages/Student/SpecificGrade";
import Section from "./pages/Student/Section";
import Lecture from "./pages/Lecture/Lecture";
import LectureLayout from "./pages/Lecture/LectureLayout";
import Quiz from "./pages/Lecture/Quiz";
import ChargeWallet from "./pages/Student/ChargeWallet";
import UserData from "./Data/UserData";
import StudentInvoice from "./pages/Student/StudentInvoice";

const route = createBrowserRouter([
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signUp", element: <SignUp /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile/:id", element: <h1> user profile page</h1> },
      {
        path: "/student",
        element: <StudentDashboard />,
        children: [
          { path: "", element: <Grades /> },
          { path: "grade/:specificGradeId", element: <SpecificGrade /> },
          { path: "section/:specificSectionId", element: <Section /> },
          { path: "charge", element: <ChargeWallet /> },
          { path: "invoice", element: <StudentInvoice /> },
          {
            path: "lecture/:lectureId",
            element: (
              <UserData>
                <LectureLayout />{" "}
              </UserData>
            ),
            children: [
              { path: "", element: <Lecture /> },
              {
                path: "quiz/:quizId",
                element: <Quiz />,
              },
            ],
          },
        ],
      },
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
      { path: "lectures", element: <Lectures /> },
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
