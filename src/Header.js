import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <header>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/blog"}>Blog</NavLink>
      <NavLink to={"/resume"}>Resume</NavLink>
      <NavLink to={"/contact"}>Contact</NavLink>
    </header>
  );
};
