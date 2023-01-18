import React from "react";
import { css } from "@emotion/react";
// import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

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
    display: flex;
    textarea {
      width: 100%;
      resize: none;
      height: 15px;
      margin-right: 20px;
    }
  `;

  const dispatch = useDispatch();
  const message = useSelector((state) => state);



  const addMessage = (event) => {
    let lastKey = Object.keys(message);
    lastKey = lastKey.length !== 0 ? +lastKey[lastKey.length - 1] + 1 : 0;
    let currentDate = new Date();
    let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    event.preventDefault();
    let textArea = event.target[0];
    let comment = textArea.value;
    if (comment) {
      textArea.value = "";
      dispatch({
        type: "ADD_MESSAGE",
        payload: { key: lastKey, commentTime: time, comment: comment },
      });
    }
  };

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

      <form action="post" css={messageForm} onSubmit={addMessage}>
        <textarea
          type="text"
          placeholder={`Message in ` + prop.chatName}
        ></textarea>

        <button
          submit="true"
          css={css`
            background: inherit;
          `}
          //  onClick={() => addMessage()}
        >
          Отправить
        </button>
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
