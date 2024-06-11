import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import Leave from "./pages/Leave";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/survey",
        element: <Survey />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/update_profile",
        element: <UpdateProfile />,
      },
      {
        path: "/profile/update_password",
        element: <UpdatePassword />,
      },
      {
        path: "/leave",
        element: <Leave />,
      },
    ],
  },
];
export default routes;
