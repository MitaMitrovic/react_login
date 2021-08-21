import React from "react";
import Login from "../../pages/login"
import { Route } from "react-router-dom";

export default function NotAuthorizedRoutes() {
  return (
    <>
      <Route path="/login" component={Login} />
    </>
  );
}
