import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllClasses from "../pages/AllClasses";
import TeachOnSkillSpark from "../pages/TeachOnSkillSpark";

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
        path: "all-classes",
        Component: AllClasses,
      },
      {
        path: "teach-on-skill-spark",
        Component: TeachOnSkillSpark,
      }
    ],
  },
]);
