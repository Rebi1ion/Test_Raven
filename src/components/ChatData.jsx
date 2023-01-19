import React from "react";
import styled from "@emotion/styled";

const ChatData = (prop) => {
  return (
    <DataLine>
      <div></div>
      <span>{prop.data}</span>
      <div></div>
    </DataLine>
  );
};

export default ChatData;

const DataLine = styled.section`
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
