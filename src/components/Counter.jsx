import React from "react";
import { useState } from "react";

const Counter = function () {
  const [likes, setLikes] = useState(0);

  function increment() {
    setLikes(likes + 1);
  }

  function decrement() {
    setLikes(likes - 1);
  }

  return (
    <div>
      <h1 className="title">{likes}</h1>
      <button className="button" onClick={increment}>Inc</button>
      <button className="button" onClick={decrement}>Dec</button>
    </div>
  );
};

export default Counter;


