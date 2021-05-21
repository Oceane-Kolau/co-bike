import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

export default function Login() {
  const [email, setEmail]       = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const _handleSignInClick = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  const login = () => {
    axios
      .post("http://localhost:4000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res: AxiosResponse) => {
        if (res.data === "success") {
          window.location.href = "/profile";
        } else if (res.data === "no user exists") {
          console.log("aucun utilisateur trouvé avec cet email");
        } else {
          console.log("Une erreur s'est produite. Connectez vous avec vous compte google ou inscrivez-vous")
        }
      }, () => {
        console.log("failure");
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={login}>Login</button>
      <button onClick={_handleSignInClick}>Google auth</button>
    </div>
  );
}
