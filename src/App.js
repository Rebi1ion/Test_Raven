import React, { useState } from "react";
import Header from "./components/Header";
import { css } from "@emotion/css";

const AppClass = css`
`;

function App() {

  return (
    <div className={AppClass}>
      <Header />
    </div>
  );
}

export default App;
