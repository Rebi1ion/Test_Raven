import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ChatService } from "../app/services/chat.service";
import { chatSchema } from "../validation/chatNameValidation";
import { useDispatch } from "react-redux";
import { UserService } from "../app/services/user.service";
import styled from "@emotion/styled";

import CloseButton from "./GlobalComponents/CloseButton";
import OfflineStatus from "./GlobalComponents/OfflineStatus";
import OnlineStatus from "./GlobalComponents/OnlineStatus";
import BackButton from "./GlobalComponents/BackButton";
import Panel from "./GlobalComponents/Panel";
import TitlePanel from "./GlobalComponents/TitlePanel";
import PanelInput from "./GlobalComponents/PanelInput";
import PanelForm from "./GlobalComponents/PanelForm";
import PanelButton from "./GlobalComponents/PanelButton";
import Error from "./GlobalComponents/Error";

import avatar from "../assets/images/user-avatar.jpg";
import { ChannelService } from "../app/services/channel.service";
import { channelSchema } from "../validation/channelNameValidation";

export default function ChatPanel() {
  const { chatId } = useLocation().state || { chatId: 0 };
  const { userId } = useLocation().state || { userId: 3 };
  const channelId = useLocation().state?.channelId || 1;
  const [chatUsers, setChatUsers] = useState([]);
  const [chatChannels, setChatChannels] = useState([]);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(chatSchema),
    mode: "onBlur",
  });

  const {
    register: newChannelInput,
    formState: { errors: newChannelErrors },
    handleSubmit: newChannelHandleSubmit,
  } = useForm({
    resolver: yupResolver(channelSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { data: chatData } = useQuery(["get chat data"], () =>
    ChatService.getChatById(chatId)
  );

  const { data: allUsers } = useQuery(
    ["get all chat users"],
    UserService.getAllUsers
  );

  const { data: allChannels } = useQuery(
    ["get all chat channels"],
    ChannelService.getAllChannels
  );

  useEffect(() => {
    setChatUsers(
      allUsers?.data
        .filter((user) => {
          return chatData?.data.users.includes(user.id);
        })
        .sort((a, b) => {
          return a.username[0]
            .toLowerCase()
            .localeCompare(b.username[0].toLowerCase());
        })
    );

    setChatChannels(
      allChannels?.data
        .filter((channel) => channel.chatId === chatId)
        .sort((a, b) => {
          return a.channelName[0]
            .toLowerCase()
            .localeCompare(b.channelName[0].toLowerCase());
        })
    );
  }, [allUsers?.data, allChannels?.data, chatData?.data, chatId]);

  const { mutate: mutateChatName } = useMutation(
    ["edit chat name"],
    (chatName) => ChatService.editChatName({ chatId, chatName })
  );

  const { mutate: mutateChatUsers } = useMutation(
    ["mutate chat users"],
    (newChatUsers) => ChatService.editUsersInChat({ chatId, newChatUsers }),
    {
      onSuccess: () => queryClient.refetchQueries({ stale: true }),
    }
  );

  const { mutate: addChatChannel } = useMutation(
    ["add channel in chat"],
    (newChannelData) => ChatService.addChannel(newChannelData),
    {
      onSuccess: () => queryClient.refetchQueries({ stale: true }),
    }
  );

  const { mutate: deleteChatChannel } = useMutation(
    ["add channel in chat"],
    (channelId) => ChatService.deleteChannel(channelId),
    {
      onSuccess: () => queryClient.refetchQueries({ stale: true }),
    }
  );

  const openProfile = useCallback(
    (e, userId) => {
      if (!e.target.dataset.isdelete) {
        dispatch({
          type: "OPEN_PROFILE",
          payload: {
            id: +userId,
          },
        });
      }
    },
    [dispatch]
  );

  const submitForm = useCallback(
    ({ chatName }) => {
      mutateChatName(chatName);
      window.location.reload();
    },
    [mutateChatName]
  );

  const addUser = useCallback(
    (userId) => {
      mutateChatUsers(chatData?.data.users.concat(userId));
    },
    [mutateChatUsers, chatData?.data.users]
  );

  const deleteUser = useCallback(
    (userId) => {
      mutateChatUsers(chatData?.data.users.filter((id) => userId !== id));
    },
    [chatData?.data.users, mutateChatUsers]
  );

  const addChannel = useCallback(
    ({ channelName }) => {
      const channelData = {
        chatId: chatId,
        channelName: channelName,
        users: [userId],
        adminUsers: [userId],
        favoriteUsers: [],
      };
      addChatChannel(channelData);
    },
    [addChatChannel, chatId, userId]
  );

  const deleteChannel = useCallback(
    (channelId) => {
      deleteChatChannel(channelId);
      window.location.reload();
    },
    [deleteChatChannel]
  );

  const [foundUsers, setFoundUsers] = useState(null);

  let timeout;
  const findUser = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let temporaryUsers = [];
      let enteredName = e.target.value.toLowerCase();
      for (let user of allUsers.data) {
        if (
          enteredName !== "" &&
          new RegExp(`^${enteredName}`).test(user.username.toLowerCase())
        )
          temporaryUsers.push(user);
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
            type="text"
            defaultValue={chatData?.data.chatName}
            {...register("chatName")}
          />
        </label>
        <PanelButton submit="true">Подтвердить</PanelButton>
        <Error>
          {errors?.chatName && <p>{errors?.chatName?.message || "Error"}</p>}
        </Error>
      </PanelForm>

      <label>Все каналы чата "{chatData?.data.chatName}"</label>
      <ChannelsList>
        {chatChannels?.map((channel, i) => {
          return (
            <Channel key={i}>
              <Link
                to="/"
                state={{
                  userId: userId,
                  chatId: chatId,
                  channelId: channel.id,
                }}
              >
                <ChannelName>#{channel?.channelName}</ChannelName>
              </Link>
              <DeleteChannel
                data-isdelete={true}
                onClick={() => deleteChannel(channel.id)}
              ></DeleteChannel>
            </Channel>
          );
        })}
      </ChannelsList>

      <PanelForm onSubmit={newChannelHandleSubmit(addChannel)}>
        <label>
          Название канала*
          <PanelInput type="text" {...newChannelInput("channelName")} />
        </label>
        <PanelButton submit="true">Добавить</PanelButton>
        <Error>
          {newChannelErrors?.channelName && (
            <p>{newChannelErrors?.channelName?.message || "Error"}</p>
          )}
        </Error>
      </PanelForm>

      <label>Текущие пользователи чата "{chatData?.data.chatName}"</label>
      <UsersList>
        {chatUsers?.map((user, i) => {
          return (
            <User
              onClick={(e) => {
                e.preventDefault();
                openProfile(e, user.id);
              }}
              key={i}
            >
              {user?.isOnline ? <OnlineStatus /> : <OfflineStatus />}
              <UserAvatar>
                <img src={avatar} alt="avatar" />
              </UserAvatar>
              <UserName>{user?.username}</UserName>
              {user?.id !== userId && (
                <DeleteUser
                  data-isdelete={true}
                  onClick={() => deleteUser(user.id)}
                ></DeleteUser>
              )}
            </User>
          );
        })}
      </UsersList>
      <label>
        Добавить пользователя в чат
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
                onClick={(e) => {
                  e.preventDefault();
                  openProfile(e, user.id);
                }}
                key={i}
              >
                {user.isOnline ? <OnlineStatus /> : <OfflineStatus />}
                <UserAvatar>
                  <img src={avatar} alt="avatar" />
                </UserAvatar>
                <UserName>{user.username}</UserName>
                {chatUsers?.find((item) => item.id === user.id) ? (
                  <div></div>
                ) : (
                  <AddUser
                    data-isdelete={true}
                    onClick={() => addUser(user.id)}
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

const ChannelsList = styled(UsersList)`
  a {
    color: #000;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Channel = styled(User)`
  color: #000;
  font-size: 1.25rem;
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

const ChannelName = styled(UserName)`
  font-size: 1.5rem;
`;

const DeleteUser = styled(CloseButton)`
  margin-left: auto;
`;

const DeleteChannel = styled(DeleteUser)``;

const AddUser = styled(DeleteUser)`
  transform: rotate(45deg);
  &::before,
  &::after {
    background: #70cc16;
  }
`;
