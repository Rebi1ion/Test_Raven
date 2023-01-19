import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import ChatComment from "./ChatComment";

import avatar from "../assets/images/user-avatar.jpg";
import { useCallback } from "react";
// import ChatData from "./ChatData";

const MainChat = () => {
  const MainStyle = styled.main`
    flex: 1 1 auto;
    padding: 18.5px 25px;
    overflow-y: auto;
  `;

  const messages = useSelector((state) => state);

  const renderMessages = useCallback(() => {
    return messages.map((object, index) => {
      return (
        <ChatComment
          userAvatar={avatar}
          username={object.username}
          commentTime={object.messageTime}
          commentMessage={object.messageText}
          idComment={index}
          key={index}
        />
      );
    });
  }, [messages]);

  return <MainStyle>{renderMessages()}</MainStyle>;
};

export default MainChat;
