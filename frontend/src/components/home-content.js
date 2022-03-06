import React from "react";
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from "./login-button";

const HomeContent = () => {

  const { isAuthenticated } = useAuth0();

  return (
    <div className='welcome-screen'>
      { !isAuthenticated ?
        <>
        <p>Welcome! Please log in to create a list, or see your lists.</p>
        <section className='welcome-login'>
          <LoginButton />
        </section>
        </>
       : <p>Welcome!</p>}
    </div>
  );
};

export default HomeContent;
