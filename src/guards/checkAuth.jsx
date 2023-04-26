import React from "react";
import { Navigate } from "react-router-dom";

const checkAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    if (!props.data) {
      return <Navigate to="/" />;
    } else if (props.user?.role != 1) {
      return <Navigate to="/" />;
    }

    if (props.data && props.user?.role == 1) {
      return <Component {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default checkAuth;
