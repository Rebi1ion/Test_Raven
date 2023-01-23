import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../assets/images/user-avatar.jpg";
import facebookImg from "../assets/images/facebook-icon.svg";
import twitterImg from "../assets/images/twitter-icon.svg";
import instagramImg from "../assets/images/instagram-icon.svg";
import loseProfileImg from "../assets/images/close-profile-icon.svg";

import { OnlineStatus } from "./GlobalElements";

const Profile = (prop) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const closeProfile = () => {
    dispatch({
      type: "CLOSE_PROFILE",
    });
  };

  if (!profile.visible) return null;

  return (
    <Style>
      <Image>
        <img src={avatar} alt="avatar" />
      </Image>
      <Content>
        <Name>
          <h2>Joshua</h2>
          <OnlineStatus></OnlineStatus>
        </Name>
        <Description>UI Designer</Description>

        <Links>
          <a href="https://facebook.com">
            <img src={facebookImg} alt="" />
          </a>
          <a href="https://twitter.com">
            <img src={twitterImg} alt="" />
          </a>
          <a href="https://instagram.com">
            <img src={instagramImg} alt="" />
          </a>
        </Links>
        <div style={{ display: "flex", marginBottom: "14px" }}>
          <ButtonProfile>Message</ButtonProfile>
          <MoreButton>▼</MoreButton>
        </div>
        <ProfileInfo>
          <li>
            Username
            <p>@amilia_lu</p>
          </li>
          <li>
            Email
            <p>a-luna@gmail.com</p>
          </li>
          <li>
            Skype
            <p>amiluna</p>
          </li>
        </ProfileInfo>
      </Content>
      <CloseProfileButton onClick={closeProfile}>
        <img src={loseProfileImg} alt="close-profile" />
      </CloseProfileButton>
    </Style>
  );
};

const Style = styled.nav`
  background: #efefef;
  opacity: 0.8;
  height: 100%;
  width: 200px;
  position: relative;
`;

const Image = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Content = styled.section`
  padding: 14px 20px;
`;

const Name = styled.div`
  margin-bottom: 3px;
  font-weight: 700;
  line-height: 1.1875em;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  h2 {
    margin-right: 5px;
  }
`;

const Description = styled.h3`
  line-height: 1.66em;
  color: #5f6164;
  margin-bottom: 19px;
`;

const Links = styled.div`
  display: flex;
  margin-bottom: 19px;
  a {
    width: 22px;
    height: 22px;
    background: #e8e8eb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right: 7px;
    }
    &:hover {
      background: #bbbbbb;
    }
  }
`;

const ButtonProfile = styled.button`
  background: #3577ef;
  color: #fff;
  border-radius: 7px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2.5px;
  width: 133px;
  &:hover {
    background: #2450a0;
  }
`;

const MoreButton = styled(ButtonProfile)`
  width: 25px;
  font-size: 0.7rem;
`;

const ProfileInfo = styled.ul`
  margin-bottom: 15px;
  li {
    color: #5f6164;
    line-height: 1.66em;
    font-size: 0.875rem;
    &:not(:last-child) {
      margin-bottom: 11px;
    }

    p {
      font-weight: 700;
      font-size: 1rem;
      color: #000;
    }
  }
`;

const CloseProfileButton = styled.button`
  position: absolute;
  bottom: 18px;
  right: 12px;
  padding: 10px;
  img {
    width: 15px;
    height: 20px;
  }
`;

export default Profile;
