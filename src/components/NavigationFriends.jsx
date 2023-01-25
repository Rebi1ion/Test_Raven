import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import moreIcon from "../assets/images/list-more-img.svg";
import settingsIcon from "../assets/images/settings-icon.svg";
import treadsIcon from "../assets/images/treads-icon.svg";
import avatar from "../assets/images/user-avatar.jpg";
import { checkOnline } from "./GlobalElements";

const NavigationFriends = () => {
  const allChats = useSelector((state) => state.chatUsers);
  const dispatch = useDispatch();
  console.log(allChats);
  const changeChannel = (id) => {
    console.log(id);
    dispatch({
      type: "CHANGE_CHANNEL",
      payload: {
        channelId: id,
      },
    });
  };

  return (
    <NavFriendsStyle>
      <NavHeader>
        <ListButon>
          <h2>Nomad List</h2>
          <span>
            <img src={moreIcon} alt="moreIcon" />
          </span>
        </ListButon>
        <SettingsButton>
          <img src={settingsIcon} alt="settingsIcon" />
        </SettingsButton>
      </NavHeader>

      <AllTreads>
        <img src={treadsIcon} alt="treads" />
        <h3>All treads</h3>
      </AllTreads>

      <section>
        <SectionTitle>
          <h3>CHANNELS</h3>
          <span>{allChats.length}</span>
        </SectionTitle>
        <ChannelList>
          {allChats.map((channel, i) => {
            return (
              <li key={i}>
                {channel.selected ? (
                  <ChannelListButtonActive>
                    {channel.chatName}
                  </ChannelListButtonActive>
                ) : (
                  <Link to="/" state={{ chatId: i }}>
                    <ChannelListButton onClick={() => changeChannel(i)}>
                      {channel.chatName}
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
          <h3>FRIENDS</h3>
          <span>3</span>
        </FriendSectionTitle>

        <FriendsList>
          <li>
            <OnlineStatus></OnlineStatus>
            <FriendsAvatar>
              <img src={avatar} alt="avatar" />
            </FriendsAvatar>
            <h3>Jeshua Stout</h3>
          </li>
        </FriendsList>
      </section>
    </NavFriendsStyle>
  );
};

const OnlineStatus = checkOnline();

const NavFriendsStyle = styled.nav`
  color: #919191;
  padding: 34px 25px 15px;
  height: 100%;
  width: 261px;
  background: #25272a;
  opacity: 0.75;
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
  span {
    display: flex;
    height: 100%;
    img {
      height: 11px;
      width: 15px;
    }
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
  cursor: auto;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: #fff;
  }
`;

const ChannelListButtonActive = styled(ChannelListButton)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
`;

const FriendsList = styled.button`
  width: 100%;
  background: inherit;
  li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
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
