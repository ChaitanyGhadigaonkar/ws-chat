import { createBrowserRouter } from "react-router-dom";

import UnAuthLayout from "./UnAuth";
import Login from "./UnAuth/Login";
import SignUp from "./UnAuth/SignUp";

import AuthLayout from "./Auth";
import Dashboard from "./Auth/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/main",
    element: <AuthLayout />,
    children: [
      {
        path: "chats",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
