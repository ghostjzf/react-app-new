import React from "react";
import logo from "./logo.png";

export default () => {
  const show = async () => {
    alert("success");
  };

  return (
    <div onClick={show}>
      <img src={logo} />
    </div>
  );
};
