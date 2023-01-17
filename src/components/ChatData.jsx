import React from "react";
import { css } from "@emotion/react";

const ChatData = (prop) => {
  const dataLine = css`
    display: flex;
    padding: 0px 0 13px;
    align-items: center;
    div {
      flex: 1 1 100%;
      background: #000000;
      opacity: 0.16;
      height: 0.5px;
    }
    span {
      padding: 0 14px;
      flex-shrink: 0;
      font-size: 0.8125rem;
      line-height: 1.38;
      color: #8d8d8d;
    }
  `;

  return (
    <section css={dataLine}>
      <div></div>
      <span>{prop.data}</span>
      <div></div>
    </section>
  );
};

export default ChatData;
