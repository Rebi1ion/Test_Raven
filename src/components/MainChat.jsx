import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChatComment from "./ChatComment";
import { useMenuContext } from "../providers/MenuModalProvider";

import avatar from "../assets/images/user-avatar.jpg";
import { useCallback } from "react";
import ChatData from "./ChatData";

const MainChat = () => {
  const { closeMenu } = useMenuContext();
  const MainStyle = styled.main`
    flex: 1 1 auto;
    padding: 18.5px 25px;
    overflow-y: auto;
    position: relative;
  `;

  const { chatId } = useLocation().state || { chatId: 0 };
  const messages = useSelector((state) => state.message);

  const renderMessages = useCallback(() => {
    return messages[chatId]?.map((object, i, arr) => {
      return (
        <div key={i}>
          {!arr[i - 1] || arr[i - 1].messageDate[0] < object.messageDate[0] ? (
            <ChatData data={object.messageDate.join("/")} />
          ) : null}
          <ChatComment
            userId={object.userId}
            userAvatar={avatar}
            username={object.username}
            commentTime={object.messageTime}
            commentMessage={object.messageText}
            idComment={i}
          />
        </div>
      );
    });
  }, [messages, chatId]);

  return <MainStyle onClick={closeMenu}>{renderMessages()}</MainStyle>;
};

export default MainChat;
