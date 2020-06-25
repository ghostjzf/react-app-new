import React from "react";

export default () => {
  const asyncFn = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("sucess");
      }, 1000);
    });
  };

  const show = async () => {
    const resp = await asyncFn();

    alert(resp);
  };

  return <div onClick={show}>Blogs</div>;
};
