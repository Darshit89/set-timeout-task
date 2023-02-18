import React, { useState } from "react";
import userData from "../../json/users.json";
import "./login.css";

// const userData = JSON.parse(usersJson.);

export const Login = ({ loginTheUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginUser = (user) => {
    setError(false);
    loginTheUser(user);
  };

  const userNotFound = () => {
    setError(true);
  };

  const loginHandler = (e) => {
    e.preventDefault();

    const registeredUser = userData.users.find((user) => {
      return user?.email === email && user?.password === password;
    });

    if (registeredUser) {
      loginUser(registeredUser);
    } else {
      userNotFound();
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
        <div className="input-box">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error ? <div style={{ color: "red" }}>User not found </div> : null}
      </form>
    </div>
  );
};
