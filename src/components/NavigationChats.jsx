import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useMenuContext } from "../providers/MenuModalProvider";
import AddButton from "./GlobalComponents/AddButton";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ChatService } from "../app/services/chat.service";
import { useDispatch } from "react-redux";
import { ChannelService } from "../app/services/channel.service";

const NavigationChats = () => {
  const { closeMenu } = useMenuContext();
  const { channelId } = useLocation().state || { channelId: 1 };
  const { chatId } = useLocation().state || { chatId: 1 };
  const { userId } = useLocation().state || { userId: 3 };
  const dispatch = useDispatch();

  const { data: allChats } = useQuery(
    ["get all chats"],
    ChatService.getAllChats
  );

  const { data: allChannels } = useQuery(
    ["get all channels"],
    ChannelService.getAllChannels
  );

  const getFirstUserChannel = useCallback(
    (selectedChatId) => {
      return (
        allChannels?.data.filter(
          (channel) =>
            channel.chatId === selectedChatId && channel.users.includes(userId)
        )[0] || -1
      );
    },
    [allChannels?.data, userId]
  );
	 
  return (
    <NavChatStyle onClick={closeMenu}>
      <div>
        {allChats?.data.map((chat, i) => {
          if (!chat.users.includes(userId)) return null;

          return (
            <Link
              to={"/"}
              state={{
                chatId: chat.id,
                userId: userId,
                channelId: getFirstUserChannel(chat.id).id,
              }}
              onClick={() => dispatch({ type: "RELOAD_PAGE", payload: true })}
              key={i}
            >
              {chat.id === chatId ? (
                <ActiveChannelButton style={{ background: chat.bgColor }}>
                  {chat.chatName[0].toUpperCase()}
                </ActiveChannelButton>
              ) : (
                <ChannelButton style={{ background: chat.bgColor }}>
                  {chat.chatName[0].toUpperCase()}
                </ChannelButton>
              )}
            </Link>
          );
        })}
      </div>
      <div>
        <Link
          to={"/add-chat-panel"}
          state={{ chatId: chatId, userId: userId, channelId: -1 }}
        >
          <ChannelButton>
            <AddChannelButton></AddChannelButton>
          </ChannelButton>
        </Link>
      </div>
    </NavChatStyle>
  );
};

const NavChatStyle = styled.nav`
  position: fixed;
  height: 100vh;
  width: 75px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  background: #000000;
  opacity: 0.7;
  padding: 16px 0;
  gap: 50px;
`;

const ChannelButton = styled.button`
  height: 41.5px;
  width: 41.5px;
  border-radius: 50%;
  background: #ffffff1a;
  margin-bottom: 16px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  &:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ActiveChannelButton = styled(ChannelButton)`
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: #8f8f8f;
    display: block;
    position: absolute;
    top: 50%;
    left: -53%;
    transform: translateY(-50%);
    border-radius: 50%;
  }
`;

const AddChannelButton = styled(AddButton)`
  background: transparent;
  &::before,
  &::after {
    background: rgba(255, 255, 255, 0.4);
  }
`;

export default NavigationChats;
