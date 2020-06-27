import React from "react";

export default () => {
  const show = async () => {
    alert("success");
  };

  return <div onClick={show}>Blogs</div>;
};
