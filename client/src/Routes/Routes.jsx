import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";



const Login = lazy(() => import("../Pages/Auth/Login"));
const Register = lazy(() => import("../Pages/Auth/Register"));
const Home = lazy(() => import("../Pages/Home/Home"));
const SideBar = lazy(() => import("../Layout/SideBar/SideBar"));
const AddPodcast = lazy(() => import("../Pages/AddPodcast/AddPodcast"));
const ComingSoon = lazy(() => import("../Pages/ComingSoon/ComingSoon"));
const Episode = lazy(() => import("../Pages/Episode/Episode"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <SideBar>
            <Profile />
          </SideBar>
        ),
      },
      {
        path: "podcast/:projectId",
        element: <SideBar />,
        errorElement: <Error />,
        children: [
          {
            path: "create",
            element: <ComingSoon />,
          },
          {
            path: "widget",
            element: <ComingSoon />,
          },
          {
            path: "upgrade",
            element: <ComingSoon />,
          },
          {
            path: "help",
            element: <ComingSoon />,
          },
          {
            path: "add-podcast",
            errorElement: <Error/>,
            element: <AddPodcast />,
          },
          {
            path: "episode/:episodeId",
            element: <Episode />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    errorElement: <Error />,
    element: <Login />,
  },
  {
    path: "/register",
    errorElement: <Error />,
    element: <Register />,
  },
]);

export default router;
