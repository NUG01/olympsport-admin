import React from "react";
import { Navigate } from "react-router-dom";

const checkAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    if (!props.data) {
      return <Navigate to="/" />;
    }

    if (props.data) {
      return <Component {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default checkAuth;
