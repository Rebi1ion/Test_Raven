import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { useMenuContext } from "../providers/MenuModalProvider";
import { useQuery, useMutation } from "react-query";
import { UserService } from "../app/services/user.service";
import { ChannelService } from "../app/services/channel.service";

export default function MenuModal() {
  const { active, closeMenu } = useMenuContext();
  const { chatId } = useLocation().state || { chatId: 1 };
  const { userId } = useLocation().state || { userId: 3 };
  const channelId = useLocation().state?.channelId || 1;

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

  const { data: channelData } = useQuery(["get admin user"], () =>
    UserService.getChannelData(channelId)
  );

  const { data: allChannels } = useQuery(
    ["get all channels 3"],
    ChannelService.getAllChannels
  );

  const { mutate: mutateLeaveChannel } = useMutation(
    ["leave channel"],
    (usersList) => UserService.leaveChannel({ channelId, usersList })
  );

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(channelData?.data.adminUsers.includes(userId));
  }, [userId, channelData]);

  const leaveChannel = useCallback(() => {
    mutateLeaveChannel(channelData?.data.users.filter((id) => id !== userId));
    window.location.reload();
  }, [channelData?.data.users, mutateLeaveChannel, userId]);

  const getFirstUserChannel = useCallback(
    (user) => {
      return (
        allChannels?.data
          .filter(
            (channel) =>
              channel.chatId === chatId &&
              channel.users.includes(user) &&
              channel.id !== channelId
          )
          ?.sort((a, b) => {
            return a?.channelName[0]
              .toLowerCase()
              .localeCompare(b?.channelName[0].toLowerCase());
          })[0] || -1
      );
    },
    [allChannels?.data, chatId, channelId]
  );

  if (!active) return null;

  return (
    <ModalWrapper onClick={closeMenu}>
      <MenuList>
        {isAdmin && (
          <li>
            <Link
              to={"/admin-panel"}
              state={{ channelId: channelId, userId: userId, chatId: chatId }}
            >
              Настройки канала
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li onClick={leaveChannel}>
            <Link
              to={"/"}
              state={{
                channelId: getFirstUserChannel(userId).id,
                userId: userId,
                chatId: chatId,
              }}
              style={{ color: "#e60b00" }}
            >
              Покинуть канал
            </Link>
          </li>
        )}
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
    }
  }
`;
