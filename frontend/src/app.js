import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "./components";
import {Profile, /*ExternalApi*/ } from "./views";
import { HomeContent } from "./components";
import Lists from "./views/lists";
import ProtectedRoute from "./auth/protected-route";
import UserLists from "./userlist/pages/UserLists";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={HomeContent} />
          {/* 
          <ProtectedRoute path="/external-api" component={ExternalApi} /> */}
          <ProtectedRoute path='/create-list' component={Lists} />
          <ProtectedRoute path='/my-lists' component={UserLists} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
