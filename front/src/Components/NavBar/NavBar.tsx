import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { myContext } from "../../Context/Context";
import { NavContainer, NavItem } from  "../../Assets/Styles/NavBar/NavBar";

export default function NavBar() {
  const ctx = useContext(myContext);
  const logout = () => {
    axios.get("http://localhost:4000/logout", {
      withCredentials: true,
    }).then ((res: AxiosResponse) => {
      if(res.data === "success") {
        window.location.href = "/";
      }
    })
  }
  return (
    <NavContainer>
      {ctx ? (
        <>
        <h3>Hello {ctx.username} ✨</h3>
          <NavItem onClick={logout} to="/logout">Logout</NavItem>
          <NavItem to="/profile">Profile</NavItem>
          { ctx.isAdmin ? (<NavItem to="/admin">Admin</NavItem>) : null }
        </>
      ) : (
        <>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/register">Register</NavItem>
        </>
      )}
      <NavItem to="/">Home</NavItem>
    </NavContainer>
  );
}
