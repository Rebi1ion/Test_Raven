import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMenuContext } from "../providers/MenuModalProvider";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import unfavorite from "../assets/images/unfavorite.svg";
import favorite from "../assets/images/favorite.png";
import people from "../assets/images/people.svg";
import search from "../assets/images/search-icon.svg";
import bell from "../assets/images/bell-icon.svg";
import menu from "../assets/images/menu-icon.svg";

export default function Header(props) {
  const { openMenu, closeMenu } = useMenuContext();
  const dispatch = useDispatch();
  const { chatId } = useLocation().state || { chatId: 0 };
  
  const toggleFavorite = () =>
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: {
        channelId: chatId,
        isFavorite: !props.isFavorite,
      },
    });

  let Notification = styled.button`
    background-color: inherit;
    margin-right: 20px;
    position: relative;
  `;
  if (props.hasNotification) {
    Notification = styled(Notification)`
      &::before {
        content: "";
        background: #fd4948;
        position: absolute;
        top: 15%;
        right: -30%;
        display: block;
        width: 5.5px;
        height: 5.5px;
        border-radius: 50%;
      }
    `;
  }

  return (
    <HeaderStyle>
      <ChatTitle>
        #{props.title}
        <ChatFavorite onClick={toggleFavorite}>
          <img src={props.isFavorite ? favorite : unfavorite} alt="favorite" />
        </ChatFavorite>
      </ChatTitle>
      <div
        css={css`
          display: flex;
        `}
      >
        <PeopleCount>
          <img src={people} alt="people" />
          <span>{props.chatMembers}</span>
        </PeopleCount>

        <SearchForm onClick={closeMenu} action="" method="get">
          <input type="text" placeholder="Search..." />
          <button submit="true">
            <img src={search} alt="search" />
          </button>
        </SearchForm>

        <Notification onClick={closeMenu}>
          <img src={bell} alt="bell" />
          <span></span>
        </Notification>

        <MenuIcon onClick={openMenu}>
          <img src={menu} alt="menu" />
        </MenuIcon>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  height: 80px;
  width: 100%;
  padding: 31.5px 23.5px 14.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.24);
`;

const ChatTitle = styled.h1`
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 700;
`;

const ChatFavorite = styled.span`
  margin-left: 6px;
  cursor: pointer;
  display: inline-block;
  position: relative;

  img {
    position: absolute;
    bottom: 0;
    width: 18px;
    height: 18px;
  }
`;

const PeopleCount = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
  img {
    margin-right: 6.5px;
  }
  span {
    font-size: 0.875rem;
    line-height: 1.14;
    color: #a4a4a4;
  }
`;

const SearchForm = styled.form`
  border: 0.5px solid rgba(0, 0, 0, 0.24);
  padding: 7.5px 16px;
  border-radius: 0.4rem;
  margin-right: 24px;

  button {
    background: inherit;
  }
  input {
    padding-right: 10px;
    ::placeholder {
      color: #8d8d8d;
    }
  }
`;

const MenuIcon = styled.button`
  background-color: inherit;
`;
