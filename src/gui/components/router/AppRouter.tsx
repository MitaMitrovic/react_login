import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import BasePage from "../../pages/basePage/basePage"
import Loader from "../loader/Loader";


import AuthorizedRoutes from "./AuthorizedRoutes";
import NotAuthorizedRoutes from "./NotAuthorizedRoutes";

export default function AppRouter() {

  const { loggedIn, ready } = useContext(LoginContext)

  const routes = (
    loggedIn ? <AuthorizedRoutes /> : <NotAuthorizedRoutes />
  )

  return (
    <Router>
      <Route path="*" component={BasePage} />
      {ready ? routes : <Loader />}
    </Router>
  );
}
