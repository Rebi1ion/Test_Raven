import React from "react";
import { css } from "@emotion/react";
// import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import ChatComment from "./ChatComment";

import avatar from "../assets/images/user-avatar.jpg";
// import ChatData from "./ChatData";

const MainChat = () => {
  const MainStyle = css`
    flex: 1 1 auto;
    padding: 18.5px 25px;
    overflow-y: auto;
  `;

  const messages = useSelector((state) => state);
  let messageArray = [];

  const showMessages = (messagesObj) => {
    for (let idMessage in messagesObj) {
      messageArray.push(
        <ChatComment
          userAvatar={avatar}
          username={messagesObj[idMessage].username}
          commentTime={messagesObj[idMessage].messageTime}
          commentMessage={messagesObj[idMessage].messageText}
          idComment={idMessage}
          key={idMessage}
        />
      );
    }
  };
  showMessages(messages);

  return (
    <main css={MainStyle}>
      {messageArray}

      {/* <ChatComment
        userAvatar={avatar}
        username={"Jeshua Stout"}
        commentTime={"6:38 PM"}
        commentMessage={"@pierrhack I did for 6 days in Iceland"}
      />
      <ChatData data="Monday, October 22nd" />
      <ChatComment
        userAvatar={avatar}
        username={"Harold Adams"}
        commentTime={"5:02 PM"}
        commentMessage={
          "Which country to visit next? This is a photo with my friends - celebrating in Bali"
        }
      />
      <ChatData data="Yesterday" />
      <ChatComment
        userAvatar={avatar}
        username={"Aada Laine"}
        commentTime={"11:54 AM"}
        commentMessage={
          "@har_adams wow it’s amazing, I want to buy a van and travelling next year"
        }
      />
      <ChatData data="Today" />
      <ChatComment
        userAvatar={avatar}
        username={"Nala Hester"}
        commentTime={"11:54 AM"}
        commentMessage={
          "Working from a van in Australia isn’t feasible if you need internet. It may have improved over the last years but I spent some time in a camper van around Tasmania and internet was a real problem (and Tasmania is tiny compared to the rest of the country)."
        }
      />
      <ChatComment
        userAvatar={avatar}
        username={"Ramon Bateman"}
        commentTime={"11:59 AM"}
        commentMessage={
          "@aa_da What's the reason for the van? Saving money or just like to get outside? If you've got a stable source of income you could always do some short term Airbnbs + buy a truck/topper, build a platform in the back. That way you can always convert it back to a truck and sleep in an apartment if you want."
        }
      /> */}
    </main>
  );
};

export default MainChat;
