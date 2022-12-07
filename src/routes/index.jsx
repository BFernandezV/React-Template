import React from "react";
import Home from "../views/Home";
import Calculator from "../views/Calculator";
import ReportBuilder from "../views/ReportBuilder";
import Info from "../views/Info";
import Login from "../views/Login";
import Dashboard from "../views/DashboardAdmin";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/private-route";
import { withAuthenticationRequired } from "@auth0/auth0-react";
export const routerBrowser = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/calculator",
    element: <Calculator></Calculator>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/reportBuilder",
    element: <ReportBuilder></ReportBuilder>,
  },
  {
    path: "/info",
    element: <Info></Info>,
  },
  {
    path: "/dashboardAdmin",
    element: <Dashboard></Dashboard>,
  },
]);
