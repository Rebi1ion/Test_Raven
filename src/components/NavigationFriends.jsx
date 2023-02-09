import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useMenuContext } from "../providers/MenuModalProvider";

import moreIcon from "../assets/images/list-more-img.svg";
import settingsIcon from "../assets/images/settings-icon.svg";
import treadsIcon from "../assets/images/treads-icon.svg";
import avatar from "../assets/images/user-avatar.jpg";
import OnlineStatus from "./GlobalComponents/OnlineStatus";
import OfflineStatus from "./GlobalComponents/OfflineStatus";
import { useQuery } from "react-query";
import { ChatService } from "../app/services/chat.service";
import { ChannelService } from "../app/services/channel.service";

const NavigationFriends = () => {
  const dispatch = useDispatch();
  const { chatId } = useLocation().state || { chatId: 1 };
  const { userId } = useLocation().state || { userId: 3 };
  const channelId = useLocation().state?.channelId || 1;
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);

  const changeChannel = useCallback(
    (id) => {
      dispatch({
        type: "CHANGE_CHANNEL",
        payload: {
          channelId: id,
        },
      });
    },
    [dispatch]
  );

  const { data: allChannels } = useQuery(
    ["get all channels 2"],
    ChannelService.getAllChannels
  );
  const { data: dataBase } = useQuery(["get db"], ChannelService.getDataBase);

  useEffect(() => {
    if (dataBase?.data) {
      let responseChannels = dataBase?.data.channels;
      let chatsChannels = responseChannels?.filter(
        (channel) =>
          channel.chatId === chatId && channel.users?.includes(userId)
      );

      let chatUsers = dataBase?.data.users
        .filter((user) =>
          dataBase?.data.chats
            .find((chat) => chat.id === chatId)
            .users.includes(user.id)
        )
        .sort((a, b) => {
          return a.username[0]
            .toLowerCase()
            .localeCompare(b.username[0].toLowerCase());
        });

      setChannels(
        chatsChannels.sort((a, b) => {
          return a.channelName[0]
            .toLowerCase()
            .localeCompare(b.channelName[0].toLowerCase());
        })
      );
      setUsers(chatUsers);
    }
  }, [chatId, userId, allChannels, dataBase]);

  const { data: chatData } = useQuery(["get chat data"], () =>
    ChatService.getChatById(chatId)
  );

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(chatData?.data.adminUser === userId);
  }, [userId, chatData?.data]);

  const arrow = useRef(null);
  const sectionsList = useRef(null);

  const [activeList, setActiveList] = useState(true);

  const toggleList = useCallback(() => {
    arrow.current.style.transform = `rotate(${activeList ? "0" : "-180"}deg)`;
    sectionsList.current.style.transform = `scaleY(${activeList ? "0" : "1"})`;
    setActiveList(!activeList);
  }, [activeList]);

  const getFirstUserChannel = useCallback(
    (user) => {
      return (
        allChannels?.data
          .filter(
            (channel) =>
              channel.chatId === chatId && channel.users.includes(user.id)
          )
          ?.sort((a, b) => {
            return a?.channelName[0]
              .toLowerCase()
              .localeCompare(b?.channelName[0].toLowerCase());
          })[0] || -1
      );
    },
    [allChannels?.data, chatId]
  );

  const { closeMenu } = useMenuContext();
  return (
    <NavFriendsStyle onClick={closeMenu}>
      <NavHeader>
        <ListButon onClick={toggleList}>
          <h2>Nomad List</h2>
          <Arrow ref={arrow}>
            <img src={moreIcon} alt="moreIcon" />
          </Arrow>
        </ListButon>
        {isAdmin && (
          <Link
            to="/admin-chat-panel"
            state={{ userId: userId, chatId: chatId, channelId: channelId }}
          >
            <SettingsButton>
              <img src={settingsIcon} alt="settingsIcon" />
            </SettingsButton>
          </Link>
        )}
      </NavHeader>

      <SectionsWrapper ref={sectionsList}>
        <AllTreads>
          <img src={treadsIcon} alt="treads" />
          <h3>All treads</h3>
        </AllTreads>

        <section>
          <SectionTitle>
            <h3>CHANNELS</h3>
            <span>{channels.length}</span>
          </SectionTitle>
          <ChannelList>
            {channels.map((channel, i) => {
              return (
                <li
                  key={i}
                  onClick={() =>
                    dispatch({ type: "RELOAD_PAGE", payload: true })
                  }
                >
                  {channel.id === channelId ? (
                    <ChannelListButtonActive disabled={true}>
                      #{channel.channelName}
                    </ChannelListButtonActive>
                  ) : (
                    <Link
                      to="/"
                      state={{
                        chatId: chatId,
                        channelId: channel.id,
                        userId: userId,
                      }}
                    >
                      <ChannelListButton
                        onClick={() => changeChannel(channel.id)}
                      >
                        #{channel.channelName}
                      </ChannelListButton>
                    </Link>
                  )}
                </li>
              );
            })}
          </ChannelList>
        </section>

        <section>
          <FriendSectionTitle>
            <h3>CHAT USERS</h3>
            <span>{users.length}</span>
          </FriendSectionTitle>

          <FriendsList>
            {users.map((user, i) => {
              return (
                <li
                  key={i}
                  onClick={() =>
                    dispatch({ type: "RELOAD_PAGE", payload: true })
                  }
                >
                  <Link
                    to={"/"}
                    state={{
                      chatId: chatId,
                      userId: user.id,
                      channelId: getFirstUserChannel(user).id,
                    }}
                  >
                    <FriendsListButton>
                      {user.isOnline ? (
                        <OnlineStatus></OnlineStatus>
                      ) : (
                        <OfflineStatus></OfflineStatus>
                      )}

                      <FriendsAvatar>
                        <img src={avatar} alt="avatar" />
                      </FriendsAvatar>
                      <h3>{user.username}</h3>
                    </FriendsListButton>
                  </Link>
                </li>
              );
            })}
          </FriendsList>
        </section>
      </SectionsWrapper>
    </NavFriendsStyle>
  );
};

const SectionsWrapper = styled.div`
  transform: scaleY(1);
  clip: rect(auto, auto, 0, auto);
  transform-origin: top;
  overflow-y: hidden;
  transition: 0.3s linear;
`;

const NavFriendsStyle = styled.nav`
  color: #919191;
  padding: 34px 25px 15px;
  height: 100vh;
  width: 261px;
  background: rgba(37, 39, 42, 0.75);
  position: fixed;
  margin-left: 75px;
  z-index: 2;
  overflow-y: auto;
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33px;
`;

const ListButon = styled.button`
  display: flex;
  height: 100%;
  align-items: center;
  background: inherit;
  h2 {
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    line-height: 1.2;
    margin-right: 5px;
  }
`;

const Arrow = styled.span`
  display: flex;
  height: 100%;
  transition: 0.3s ease;
  transform: rotate(-180deg);
  img {
    height: 11px;
    width: 15px;
  }
`;

const SettingsButton = styled.button`
  background: inherit;
  img {
    height: 20px;
    width: 20px;
  }
`;

const AllTreads = styled.div`
  display: flex;
  margin-bottom: 31px;

  img {
    margin-right: 12px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const FriendSectionTitle = styled(SectionTitle)`
  margin-bottom: 21.5px;
`;

const ChannelList = styled.ul`
  li {
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 17px;
    }
  }
`;

const ChannelListButton = styled.button`
  width: 100%;
  text-align: left;
  background: inherit;
  color: #b5b5b5;
  font-size: 1.125rem;
  padding: 9px 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: #fff;
  }
`;

const ChannelListButtonActive = styled(ChannelListButton)`
  cursor: auto;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
`;

const FriendsList = styled.ul`
  width: 100%;
  background: inherit;
  li {
    margin-bottom: 10px;

    h3 {
      width: 100%;
      text-align: left;
      font-size: 1.25rem;
      color: #b5b5b5;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

const FriendsListButton = styled.button`
  background: inherit;
  display: flex;
  align-items: center;
`;

const FriendsAvatar = styled.div`
  width: 34px;
  height: 34px;
  position: relative;
  margin: 0 11px 0 6px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default NavigationFriends;
