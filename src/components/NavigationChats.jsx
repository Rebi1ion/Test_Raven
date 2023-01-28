import React from "react";
import styled from "@emotion/styled";
import { useMenuContext } from "../providers/MenuModalProvider";
import { AddButton } from "./GlobalElements";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationChats = () => {
  const { closeMenu } = useMenuContext();
  const chats = useSelector((state) => state.chatUsers);

  return (
    /* В этой секции отображаются все избранные чаты, и в которых пользователь админ */

    <NavChatStyle onClick={closeMenu}>
      <div>
        {chats.map((chat, i) => {
          return chat.isAdmin || chat.isFavorite ? (
            <Link to={"/"} state={{ chatId: i }} key={i}>
              <ChannelButton style={{ background: chat.bgColor }}>
                {chat.chatName[0].toUpperCase()}
              </ChannelButton>
            </Link>
          ) : null;
        })}
      </div>
      <div>
        <Link to={"/add-chat-panel"}>
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

  &:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
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
