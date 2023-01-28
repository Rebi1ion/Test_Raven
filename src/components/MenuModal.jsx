import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useMenuContext } from "../providers/MenuModalProvider";

export default function MenuModal({ chatId, selectedChat }) {
  const { active, closeMenu } = useMenuContext();
  const ModalWrapper = styled.section`
    position: fixed;
    z-index: 2;
    right: 15px;
    top: 90px;
    width: auto;
    height: auto;
    background-color: #efefef;
    padding: 20px 30px;
    border-radius: 7px;
    text-align: center;
  `;

  if (!active) return null;

  return (
    <ModalWrapper onClick={closeMenu}>
      <MenuList>
        {selectedChat.isAdmin ? (
          <li>
            <Link to={"/admin-panel"} state={{ chatId: chatId }}>
              Настройки чата
            </Link>
          </li>
        ) : null}

        <li>Выйти из чата</li>
      </MenuList>
    </ModalWrapper>
  );
}

//

const MenuList = styled.ul`
  li {
    margin-bottom: 15px;
    font-weight: 700;
    a {
      color: #000;
    }
    &:last-child {
      margin-bottom: 0px;
      color: #e60b00;
    }
  }
`;
