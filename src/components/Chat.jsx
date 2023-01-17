import React from "react";
import { css } from "@emotion/react";
// import styled from "@emotion/styled";

import Header from "./Header";
import Footer from "./Footer";
import MainChat from "./MainChat";

const Chat = () => {
  const chatStyle = css`
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
  const chatName = "#general";

  return (
    <section css={chatStyle}>
      <Header
        title={chatName}
        isFavorite={false}
        chatMembers={"1093"}
        hasNotification={true}
      />
      <MainChat />
      <Footer  chatName={chatName}/>
    </section>
  );
};

export default Chat;
