import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import ChatComment from "./ChatComment";
import { useMenuContext } from "../providers/MenuModalProvider";
import { useQuery } from "react-query";

import avatar from "../assets/images/user-avatar.jpg";
import { useCallback } from "react";
import ChatData from "./ChatData";
import { ChannelService } from "../app/services/channel.service";

const MainChat = () => {
  const { userId } = useLocation().state || { userId: 3 };
  const { data } = useQuery(["get messages"], ChannelService.getDataBase);
  const { closeMenu } = useMenuContext();
  const MainStyle = styled.main`
    flex: 1 1 auto;
    padding: 18.5px 25px 72px;
    overflow-y: auto;
    position: relative;
	 
  `;
  //   const { chatId } = useLocation().state || { chatId: 0 };
  const { channelId } = useLocation().state || { channelId: 1 };
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(
      data?.data.comments.filter((comment) => comment.channelId === channelId)
    );
  }, [channelId, data]);

  const renderMessages = useCallback(() => {
    return comments?.map((object, i, arr) => {
      return (
        <div key={i}>
          {(!arr[i - 1] ||
            arr[i - 1].messageDate[0] < object.messageDate[0] ||
            arr[i - 1].messageDate[1] < object.messageDate[1]) && (
            <ChatData data={object.messageDate.join("/")} />
          )}
          <ChatComment
            userId={object.userId}
            userAvatar={avatar}
            username={object.username}
            commentTime={object.messageTime}
            commentMessage={object.body}
            idComment={object.id}
          />
        </div>
      );
    });
  }, [comments]);

  return <MainStyle onClick={closeMenu}>{renderMessages()}</MainStyle>;
};

export default MainChat;
