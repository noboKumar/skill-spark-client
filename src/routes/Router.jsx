import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllClasses from "../pages/AllClasses";
import TeachOnSkillSpark from "../pages/TeachOnSkillSpark";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import UserProfile from "../pages/Dashboard/UserProfile";
import PrivateRouter from "./PrivateRouter";
import MyEnrollClass from "../pages/Dashboard/Student/MyEnrollClass";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import MyClass from "../pages/Dashboard/Teacher/MyClass";
import TeacherRequest from "../pages/Dashboard/Admin/TeacherRequest";
import Users from "../pages/Dashboard/Admin/Users";
import AdminRoute from "./AdminRoute";
import Unauthorized from "../pages/Unauthorized";
import TeacherRoute from "./TeacherRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-classes",
        Component: AllClasses,
      },
      {
        path: "/teach-on-skill-spark",
        element: (
          <PrivateRouter>
            <TeachOnSkillSpark />
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashBoardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <UserProfile />
          </PrivateRouter>
        ),
      },
      // Student Routes
      {
        path: "my-enroll-class",
        element: (
          <PrivateRouter>
            <MyEnrollClass />
          </PrivateRouter>
        ),
      },
      // Teacher Routes
      {
        path: "add-class",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
      },
      {
        path: "my-class",
        element: (
          <TeacherRoute>
            <MyClass />
          </TeacherRoute>
        ),
      },
      // Admin Routes
      {
        path: "teacher-request",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "all-classes",
        element: (
          <AdminRoute>
            <AllClasses />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
