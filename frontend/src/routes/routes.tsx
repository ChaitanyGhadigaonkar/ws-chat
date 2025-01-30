import { createBrowserRouter } from "react-router-dom";

import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
