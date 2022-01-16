import {NavLink} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const MainNav = () => {

  const {user} = useAuth0();
  const {nickname} = user ? user : '';

  return (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
    Home
   </NavLink>
    {/* <NavLink
      to="/external-api"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      External API
    </NavLink>  */}
    <NavLink
      to="/create-list"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Create List
    </NavLink>
    <NavLink
      to="/my-lists"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      My Lists
    </NavLink>
    <NavLink
      to="/profile"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      {user ? nickname : 'Sign In'}
    </NavLink>
  </div>
  )
  };

export default MainNav;
