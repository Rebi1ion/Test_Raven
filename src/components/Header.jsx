import React from "react";
import { css } from "@emotion/react";
// import styled from "@emotion/styled";
import unfavorite from "../assets/images/unfavorite.svg";
import favorite from "../assets/images/favorite.png";
import people from "../assets/images/people.svg";
import search from "../assets/images/search-icon.svg";
import bell from "../assets/images/bell-icon.svg";
import menu from "../assets/images/menu-icon.svg";

export default function Header(props) {
  const headerStyle = css`
    height: 80px;
    width: 100%;
    padding: 31.5px 23.5px 14.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.24);
  `;

  const chatTitle = css`
    font-size: 1.25rem;
    line-height: 1.2;
    font-weight: 700;
  `;

  const chatFavorite = css`
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

  const peopleCount = css`
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

  const searchForm = css`
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

  let notification = css`
    background-color: inherit;
    margin-right: 20px;
    position: relative;
  `;
  if (props.hasNotification) {
    notification.styles += `
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
    }`;
  }

  const menuIcon = css`
    background-color: inherit;
  `;

  return (
    <header css={headerStyle}>
      <h1 css={chatTitle}>
        {props.title}
        <span css={chatFavorite}>
          <img src={props.isFavorite ? favorite : unfavorite} alt="favorite" />
        </span>
      </h1>
      <div css={css`display: flex;`}>
        <div css={peopleCount}>
          <img src={people} alt="people" />
          <span>{props.chatMembers}</span>
        </div>

        <form css={searchForm} action="" method="get">
          <input type="text" placeholder="Search..." />
          <button submit="true">
            <img src={search} alt="search" />
          </button>
        </form>

        <button css={notification}>
          <img src={bell} alt="bell" />
          <span></span>
        </button>

        <button css={menuIcon}>
          <img src={menu} alt="menu" />
        </button>
      </div>
    </header>
  );
}
