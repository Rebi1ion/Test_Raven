import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import MainChat from "./MainChat";
import MenuModal from "./MenuModal";

import { useQuery } from "react-query";
import { UserService } from "../app/services/user.service";
import { ChatService } from "../app/services/chat.service";
import axios from "axios";
import { BASE_URL, ChannelService } from "../app/services/channel.service";

const Chat = () => {
  const { chatId } = useLocation().state || { chatId: 1 };
  const { userId } = useLocation().state || { userId: 3 };
  const { channelId } = useLocation().state || { channelId: 1 };
  const reload = useSelector((state) => state.reload);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const { data: channelData, isError } = useQuery(["get channel info"], () =>
    UserService.getChannelData(channelId)
  );
  const { data: chatData } = useQuery("get chat by id", () =>
    ChatService.getChatById(chatId)
  );

  useEffect(() => {
    setIsAdmin(chatData?.data.adminUser === userId);
  }, [userId, chatData?.data]);

  useEffect(() => {
    if (reload) {
      dispatch({ type: "RELOAD_PAGE", payload: !reload });
      window.location.reload();
    }
  }, [userId, reload, dispatch]);

  const getFirstUserChannel = useCallback(() => {
    return (
      axios
        .get(`${BASE_URL}/channels`)
        ?.data.filter(
          (channel) =>
            channel.chatId === chatId &&
            channel.users.includes(userId) &&
            channel.id !== channelId
        )
        ?.sort((a, b) => {
          return a?.channelName[0]
            .toLowerCase()
            .localeCompare(b?.channelName[0].toLowerCase());
        })[0] || -1
    );
  }, [chatId, channelId, userId]);

  if (isError) {
    navigate("/", {
      state: {
        chatId: chatId,
        userId: userId,
        channelId: getFirstUserChannel().id,
      },
    });
  }

  if (channelId === -1)
    return (
      <NoChatMessage>
        <p>Каналы отсутсвуют</p>
      </NoChatMessage>
    );

  if (!channelData?.data && !channelId)
    return (
      <NoChatMessage>
        <p>У вас нет доступных каналов</p>
        {isAdmin && (
          <Link
            to="/admin-chat-panel"
            state={{ userId: userId, chatId: chatId, channelId: channelId }}
          >
            Нажмите чтобы создать новый
          </Link>
        )}
      </NoChatMessage>
    );
  return (
    <ChatStyle>
      <Header
        title={channelData?.data.channelName}
        chatMembers={channelData?.data.users.length}
        hasNotification={true}
      />
      <MenuModal active={false} />
      <MainChat />
      <Footer chatName={channelData?.data.channelName} />
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
  margin-left: 336px;
`;

const NoChatMessage = styled.h1`
  margin-left: 336px;
  flex-grow: 1;
  height: auto;
  text-align: center;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  p {
    margin-bottom: 20px;
  }
  a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
`;
