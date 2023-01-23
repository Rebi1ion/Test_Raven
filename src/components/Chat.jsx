import React from "react";
import styled from "@emotion/styled";

import Header from "./Header";
import Footer from "./Footer";
import MainChat from "./MainChat";

const Chat = () => {
  return (
    <ChatStyle>
      <Header
        title={chatName}
        isFavorite={false}
        chatMembers={"1093"}
        hasNotification={true}
      />
      <MainChat />
      <Footer chatName={chatName} />
    </ChatStyle>
  );
};

export default Chat;

const ChatStyle = styled.section`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const chatName = "#general";
