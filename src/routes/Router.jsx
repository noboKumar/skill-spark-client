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
import StudentRoute from "./StudentRoute";
import MyRequest from "../pages/Dashboard/Student/MyRequest";
import AllClassesRequest from "../pages/Dashboard/Admin/AllClassesRequest";
import ClassDetails from "../pages/ClassDetails";
import MyClassDetails from "../pages/Dashboard/Teacher/MyClassDetails";
import MyEnrollClassDetails from "../pages/Dashboard/Student/MyEnrollClassDetails";
import NotFound404 from "../pages/NotFound404";
import ContactUs from "../pages/ContactUs";

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
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/classes/:id",
        element: (
          <PrivateRouter>
            <ClassDetails />
          </PrivateRouter>
        ),
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
      {
        path: "*",
        Component: NotFound404,
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
          <StudentRoute>
            <MyEnrollClass />
          </StudentRoute>
        ),
      },
      {
        path: "my-enroll-class/:id",
        element: (
          <StudentRoute>
            <MyEnrollClassDetails />
          </StudentRoute>
        ),
      },
      {
        path: "my-request",
        element: (
          <StudentRoute>
            <MyRequest />
          </StudentRoute>
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
      {
        path: "my-class/:id",
        element: (
          <TeacherRoute>
            <MyClassDetails />
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
        path: "all-classes-request",
        element: (
          <AdminRoute>
            <AllClassesRequest />
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
