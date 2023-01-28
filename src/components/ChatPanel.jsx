import styled from "@emotion/styled";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { OnlineStatus, OfflineStatus, CloseButton } from "./GlobalElements";
import users from "../states/userState";
import {
  BackButton,
  Panel,
  TitlePanel,
  PanelInput,
  PanelForm,
  PanelButton,
  Error
} from "./GlobalElements";

import avatar from "../assets/images/user-avatar.jpg";

export default function ChatPanel() {
  const { chatId } = useLocation().state;

  const selectedChat = useSelector((state) => state.chatUsers)[chatId];
  const chatUsers = selectedChat.users;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const openProfile = (e) => {
    if (!e.target.dataset.isdelete) {
      let userId =
        e.target.id ||
        e.target.parentElement.id ||
        e.target.parentElement.parentElement.id;
      dispatch({
        type: "OPEN_PROFILE",
        payload: {
          id: +userId,
        },
      });
    }
  };

  const submitForm = ({ channelName }) => {
    dispatch({
      type: "EDIT_CHANNELNAME",
      payload: {
        channelId: chatId,
        editedName: channelName,
      },
    });
  };

  const deleteUser = (e) => {
    let userId = e.target.id || e.target.parentElement.id;
    dispatch({
      type: "DELETE_USER",
      payload: {
        channelId: chatId,
        userId: +userId,
      },
    });
  };

  const addUser = (e) => {
    let userId = e.target.id || e.target.parentElement.id;
    dispatch({
      type: "ADD_USER",
      payload: {
        channelId: chatId,
        user: users[userId],
      },
    });
  };

  const [foundUsers, setFoundUsers] = useState(null);

  let timeout;
  const findUser = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let temporaryUsers = [];
      let enteredName = e.target.value.toLowerCase();
      for (let key in users) {
        if (
          enteredName !== "" &&
          new RegExp(`^${enteredName}`).test(users[key].username.toLowerCase())
        )
          temporaryUsers.push(users[key]);
      }
      temporaryUsers.length
        ? setFoundUsers(temporaryUsers)
        : setFoundUsers(null);
    }, 250);
  };

  return (
    <Panel>
      <BackButton onClick={goBack}>← Назад</BackButton>
      <TitlePanel>Настройки чата</TitlePanel>
      <PanelForm onSubmit={handleSubmit(submitForm)}>
        <label>
          Название чата*
          <PanelInput
            {...register("channelName", {
              required: "Заполните обязательные поля",
              minLength: {
                value: 5,
                message: "Минимальное количество символов 5",
              },
              maxLength: {
                value: 25,
                message: "Максимальное количество символов 25",
              },
            })}
            type="text"
            defaultValue={selectedChat.chatName}
          />
        </label>
        <PanelButton submit="true">Подтвердить</PanelButton>
        <Error>
          {errors?.channelName && (
            <p>{errors?.channelName?.message || "Error"}</p>
          )}
        </Error>
      </PanelForm>

      <label>Текущие пользователи</label>
      <UsersList>
        {chatUsers.map((user, i) => {
          return (
            <User
              id={user.userId}
              onClick={(e) => {
                e.preventDefault();
                openProfile(e);
              }}
              key={i}
            >
              {user.isOnline ? <OnlineStatus /> : <OfflineStatus />}
              <UserAvatar>
                <img src={avatar} alt="avatar" />
              </UserAvatar>
              <UserName>{user.username}</UserName>
              <DeleteUser
                data-isdelete={true}
                onClick={(e) => deleteUser(e)}
              ></DeleteUser>
            </User>
          );
        })}
      </UsersList>
      <label>
        Добавить пользователя
        <PanelInput
          onChange={(e) => findUser(e)}
          placeholder="Имя"
          type="text"
        />
      </label>
      <UsersList>
        {!foundUsers ? (
          <h3>Пользователь не найден</h3>
        ) : (
          foundUsers.map((user, i) => {
            return (
              <User
                id={user.userId}
                onClick={(e) => {
                  e.preventDefault();
                  openProfile(e);
                }}
                key={i}
              >
                {user.isOnline ? <OnlineStatus /> : <OfflineStatus />}
                <UserAvatar>
                  <img src={avatar} alt="avatar" />
                </UserAvatar>
                <UserName>{user.username}</UserName>

                {chatUsers.find((item) => item.userId === user.userId) ? (
                  <div></div>
                ) : (
                  <AddUser
                    data-isdelete={true}
                    onClick={(e) => addUser(e)}
                  ></AddUser>
                )}
              </User>
            );
          })
        )}
      </UsersList>
    </Panel>
  );
}

const UsersList = styled.div`
  width: 600px;
  background: #efefef;
  margin-top: 10px;
  height: 300px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 30px;
  overflow: auto;
  margin-bottom: 40px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 20px 0 10px;
  cursor: pointer;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const UserName = styled.h3`
  font-size: 1.2rem;
  cursor: pointer;
`;

const DeleteUser = styled(CloseButton)`
  margin-left: auto;
`;

const AddUser = styled(DeleteUser)`
  transform: rotate(45deg);
  &::before,
  &::after {
    background: #70cc16;
  }
`;


