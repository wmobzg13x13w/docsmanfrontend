import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../views/Dashboard.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Files = lazy(() => import("../views/Files.js"));
const Employees = lazy(() => import("../views/Employees.js"));
const Login = lazy(() => import("../views/Login.js"));

/*****Routes******/

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to='/login' />;
};

const ThemeRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Navigate to='/dashboard' /> },
      { path: "/files", exact: true, element: <Files /> },
      { path: "/employees", exact: true, element: <Employees /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
    ],
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
];

export default ThemeRoutes;
