import React from "react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        Hello World!
      </BrowserRouter>
    </div>
  );
}
