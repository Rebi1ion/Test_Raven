import styled from "@emotion/styled";
import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { channelSchema } from "../validation/channelNameValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "react-query";

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
import { UserService } from "../app/services/user.service";
import { ChatService } from "../app/services/chat.service";

export default function ChatPanel() {
  const { chatId } = useLocation().state || { chatId: 0 };
  const { userId } = useLocation().state || { userId: 3 };
  const channelId = useLocation().state?.channelId || 1;
  const [channelUsers, setChannelUsers] = useState([]);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { data: channelData } = useQuery(["get channel data"], () =>
    UserService.getChannelData(channelId)
  );

  const { data: chatData } = useQuery(["get chat data by id"], () =>
    ChatService.getChatById(chatId)
  );

  const { data: allUsers } = useQuery(
    ["get all users"],
    UserService.getAllUsers
  );

  const { mutate: mutateChannelName } = useMutation(
    ["edit channel name"],
    (channelName) => {
      UserService.editChannelName({ channelId, channelName });
    }
  );

  const { mutate: mutateChannelUsers } = useMutation(
    ["edit channel users"],
    (userList) => {
      UserService.editUsersInChannel({ channelId, userList });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries({
          stale: true,
        });
      },
    }
  );

  const { mutate: mutateChannelAdmins } = useMutation(
    ["edit channels admins"],
    (newAdminsList) =>
      UserService.makeUserAdminOfChannel({ channelId, newAdminsList }),
    {
      onSuccess: () => queryClient.refetchQueries({ stale: true }),
    }
  );

  const addAdmin = (idUser) => {
    mutateChannelAdmins(channelData?.data.adminUsers.concat(idUser));
  };

  const deleteAdmin = (idUser) =>
    mutateChannelAdmins(
      channelData?.data.adminUsers.filter((id) => id !== idUser)
    );

  useEffect(() => {
    setChannelUsers(
      channelData?.data.users
        .map((userId) => {
          let [userData] = allUsers?.data.filter(
            (user) => user.id === userId
          ) || [null];
          return userData;
        })
        ?.sort((a, b) => {
          return a?.username[0]
            .toLowerCase()
            .localeCompare(b?.username[0].toLowerCase());
        })
    );
  }, [allUsers?.data, channelData?.data.users]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(channelSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
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
    ({ channelName }) => {
      mutateChannelName(channelName);
      window.location.reload();
    },
    [mutateChannelName]
  );

  const deleteUser = useCallback(
    (userId) => {
      mutateChannelUsers(channelData?.data.users.filter((id) => userId !== id));
    },
    [channelData?.data.users, mutateChannelUsers]
  );

  const addUser = useCallback(
    (userId) => {
      mutateChannelUsers(channelData?.data.users.concat(userId));
    },
    [mutateChannelUsers, channelData?.data.users]
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
          new RegExp(`^${enteredName}`).test(user.username.toLowerCase()) &&
          chatData?.data.users.includes(user.id)
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
      <TitlePanel>Настройки канала</TitlePanel>
      <PanelForm onSubmit={handleSubmit(submitForm)}>
        <label>
          Название канала*
          <PanelInput
            type="text"
            defaultValue={channelData?.data.channelName}
            {...register("channelName")}
          />
        </label>
        <PanelButton submit="true">Подтвердить</PanelButton>
        <Error>
          {errors?.channelName && (
            <p>{errors?.channelName?.message || "Error"}</p>
          )}
        </Error>
      </PanelForm>

      <label>
        Текущие пользователи канала <b>#{channelData?.data.channelName}</b>
      </label>
      <UsersList>
        {channelUsers?.map((user, i) => {
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

              {userId === chatData?.data.adminUser &&
                (channelData?.data.adminUsers.includes(user?.id) &&
                user.id !== chatData?.data.adminUser ? (
                  <Moderator>
                    Модератор
                    <button
                      data-isdelete={true}
                      onClick={() => deleteAdmin(user?.id)}
                    >
                      убрать
                    </button>
                  </Moderator>
                ) : (
                  !channelData?.data.adminUsers.includes(user?.id) && (
                    <Moderator>
                      <button
                        data-isdelete={true}
                        onClick={() => addAdmin(user?.id)}
                        style={{ color: "green" }}
                      >
                        сделать модератором
                      </button>
                    </Moderator>
                  )
                ))}

              {user?.id === chatData?.data.adminUser && <Admin>Админ</Admin>}

              {user?.id !== userId && user?.id !== chatData?.data.adminUser && (
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
                {channelUsers?.find((item) => item.id === user.id) ? (
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

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Admin = styled.span`
  margin-left: auto;
  font-weight: 700;
`;

const Moderator = styled.div`
  margin-left: auto;
  font-weight: 400;
  button {
    color: red;
    margin-left: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
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
