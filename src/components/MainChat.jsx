import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import ChatComment from "./ChatComment";

import avatar from "../assets/images/user-avatar.jpg";
import { useCallback } from "react";
import ChatData from "./ChatData";

const MainChat = () => {
  const MainStyle = styled.main`
    flex: 1 1 auto;
    padding: 18.5px 25px;
    overflow-y: auto;
  `;

  const messages = useSelector((state) => state.message);

  const renderMessages = useCallback(() => {
    return messages.map((object, i, arr) => {
      return (
        <div key={i}>
          {!arr[i - 1] || arr[i - 1].messageDate[0] < object.messageDate[0] ? (
            <ChatData data={object.messageDate.join("/")} />
          ) : null}
          <ChatComment
            userAvatar={avatar}
            username={object.username}
            commentTime={object.messageTime}
            commentMessage={object.messageText}
            idComment={i}
          />
        </div>
      );
    });
  }, [messages]);

  return <MainStyle>{renderMessages()}</MainStyle>;
};

export default MainChat;
