import { React } from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <CircularProgress />,
    })}
    {...args}
  />
);
export default PrivateRoute;
