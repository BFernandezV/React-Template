import ReactDOM from "react-dom/client";
import React from "react";
import { routerBrowser } from "./routes/index.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeApp } from "./ThemeProvider.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-baka831cvruhsmoz.eu.auth0.com"
      clientId="vRoxCX6FsfOg87fF7QTMYJGnOUSrTexs"
      redirectUri="http://0.0.0.0:5002/dashboardAdmin"
    >
      <ThemeProvider theme={ThemeApp}>
        <RouterProvider router={routerBrowser} />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
