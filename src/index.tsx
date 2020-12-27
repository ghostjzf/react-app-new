import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import US from "./locales/en_US.json";
import "./index.scss";

console.log(US.首页);
window.$t = $t;

function $t(key: string) {
  return (US as any)[key];
}

ReactDOM.render(<App />, document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept();
}
