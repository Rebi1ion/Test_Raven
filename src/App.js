import React, { useState } from "react";
// import Counter from "./components/Counter";
import Header from "./components/Header";
import { css } from "@emotion/css";

const AppClass = css`
`;

function App() {
  const [likes, setLikes] = useState(0);
  const [value, setValue] = useState("TEXT");

  return (
    <div className={AppClass}>
      <Header />
    </div>
  );
}

export default App;
