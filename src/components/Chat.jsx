import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import MainChat from "./MainChat";
import MenuModal from "./MenuModal";

const Chat = () => {
  const allChats = useSelector((state) => state.chatUsers);
  const { chatId } = useLocation().state || { chatId: 0 };
  const selectedChat = allChats[chatId];
  return (
    <ChatStyle>
      <Header
        title={selectedChat.chatName}
        isFavorite={selectedChat.isFavorite}
        chatMembers={selectedChat.users.length}
        hasNotification={true}
      />
      <MenuModal chatId={chatId} selectedChat={selectedChat} active={false} />
      <MainChat chatId={chatId} />
      <Footer chatName={selectedChat.chatName} />
    </ChatStyle>
  );
};

export default Chat;

const ChatStyle = styled.section`
  flex-grow: 1;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;
