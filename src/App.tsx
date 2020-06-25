import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </div>
  );
}
