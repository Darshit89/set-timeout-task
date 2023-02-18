import React, { useState, useCallback } from "react";
import "./App.css";
import { Login } from "./components/login/Login";
import { InvitaionListing } from "./components/List/InvitaionListing";
import {
  storeTheCurrentUser,
  removeCurrentUser,
  getCurrentUser,
} from "./utils";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCurrentUser());
  const [loggedInUser, setLoggedInUser] = useState(getCurrentUser());

  const loginTheUser = useCallback(
    (user) => {
      setLoggedInUser(user);
      setIsLoggedIn(true);
      storeTheCurrentUser(user);
    },
    [setIsLoggedIn, setLoggedInUser]
  );

  const logoutTheUser = useCallback(() => {
    setLoggedInUser(null);
    setIsLoggedIn(false);
    removeCurrentUser();
  }, [setLoggedInUser, setIsLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <InvitaionListing currentUser={loggedInUser} logout={logoutTheUser} />
      ) : (
        <Login loginTheUser={loginTheUser} />
      )}
    </div>
  );
}

export default App;
