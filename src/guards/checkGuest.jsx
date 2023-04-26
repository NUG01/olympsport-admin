import React from "react";
import { Navigate } from "react-router-dom";
import BasicAxios from "../helpers/axios/BasicAxios";

const checkGuest = (Component) => {
  const AuthenticatedComponent = (props) => {
    if (props.data ) {
      return <Navigate to="/dashboard" />;
    }

    if (!props.data) {
      return <Component {...props} />;
    }
  };

  return AuthenticatedComponent;
};

export default checkGuest;
