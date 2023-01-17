import React from "react";
import { css } from "@emotion/react";
// import styled from "@emotion/styled";

import attach from "../assets/images/attach-icon.svg";
import microphone from "../assets/images/microphone-icon.svg";
import smile from "../assets/images/smile-icon.svg";

export default function Footer(prop) {
  const footerStyle = css`
    padding: 0 22px;
    height: 72px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.24);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  `;
  const messageForm = css`
    margin-right: 20px;
    flex-grow: 1;
    textarea {
      width: 100%;
      resize: none;
      height: 15px;
    }
  `;

  return (
    <footer css={footerStyle}>
      <button
        css={css`
          margin-right: 20px;
          background: inherit;
        `}
      >
        <img src={attach} alt="attach" />
      </button>
      <button
        css={css`
          margin-right: 21px;
          background: inherit;
        `}
      >
        <img src={microphone} alt="microphone" />
      </button>
      <form action="post" css={messageForm}>
        <textarea
          type="text"
          placeholder={`Message in ` + prop.chatName}
        ></textarea>
      </form>
      <button
        css={css`
          background: inherit;
        `}
      >
        <img src={smile} alt="smile" />
      </button>
    </footer>
  );
}
