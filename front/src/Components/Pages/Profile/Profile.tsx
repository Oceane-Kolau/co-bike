import React, { useContext } from "react";
import { myContext } from "../../../Context/Context";
import "./style.css";
import News from "./News";

export default function Profile() {
  const ctx = useContext(myContext);

  return (
    <div>
      <h1>Hey {ctx.username}</h1>
      <p>Voici les dernières nouvelles </p>
      <News/>
    </div>
  );
}
