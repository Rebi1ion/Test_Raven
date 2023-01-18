import React from "react";
import { Global, css } from "@emotion/react";
// import styled from "@emotion/styled";
import emotionReset from "emotion-reset";

import NavigationChats from "./components/NavigationChats";
import NavigationFriends from "./components/NavigationFriends";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

function App() {
  const appClass = css`
    width: 100vw;
    height: 100vh;
    font-family: "Lato", sans-serif;
	 display: flex;
	 overflow-x: hidden; 
  `;

  const minify = css`
    ${emotionReset}
    * {
      padding: 0;
      margin: 0;
      border: 0;
    }
    *,
    *:before,
    *:after {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    :focus,
    :active {
      outline: none;
    }
    a:focus,
    a:active {
      outline: none;
    }
    nav,
    footer,
    header,
    aside {
      display: block;
    }
    html,
    body {
      height: 100%;
      width: 100%;
      line-height: 1;
      -ms-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }
    input,
    button,
    textarea {
      font-family: inherit;
    }
    input::-ms-clear {
      display: none;
    }
    button {
      cursor: pointer;
    }
    button::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
    a,
    a:visited {
      text-decoration: none;
    }
    a:hover {
      text-decoration: none;
    }
    ulli {
      list-style: none;
    }
    img {
      vertical-align: top;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: inherit;
      font-weight: 400;
    }
  `;

  return (
    <div css={appClass}>
      <Global styles={minify} />

      <NavigationChats />
		<NavigationFriends />
		<Chat/>
		<Profile/>

    </div>
  );
}

export default App;
