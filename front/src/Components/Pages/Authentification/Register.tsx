import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail]       = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = () => {
    axios
      .post(
        "http://localhost:4000/register",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res: AxiosResponse) => {
        if (res.data === "success") {
          window.location.href = "/login";
        }
      });
  };

  const _handleSignInClick = () => {
    window.open("http://localhost:4000/google", "_self");
  };
  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={register}>Register</button>
      <button onClick={_handleSignInClick}>Google auth</button>
    </div>
  );
}
