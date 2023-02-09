import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useMenuContext } from "../providers/MenuModalProvider";
import { useDispatch } from "react-redux";

import attach from "../assets/images/attach-icon.svg";
import microphone from "../assets/images/microphone-icon.svg";
import smile from "../assets/images/smile-icon.svg";
import { useMutation, useQueryClient } from "react-query";
import { BASE_URL, ChannelService } from "../app/services/channel.service";
import axios from "axios";

export default function Footer(prop) {
  const { closeMenu } = useMenuContext();
  const editedMessage = useSelector((state) => state.textarea);
  const { chatId } = useLocation().state || { chatId: 0 };
  const { channelId } = useLocation().state || { channelId: 1 };
  const { userId } = useLocation().state || { userId: 3 };
  const queryClient = useQueryClient();
  const footerTextarea = useRef();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.defaults.baseURL = BASE_URL;
    axios.get(`/users/${userId}`).then((resolve) => setUserData(resolve.data));
  }, [userId]);

  const setTime = useCallback(() => {
    let currentDate = new Date();
    let hours = `${currentDate.getHours()}`;
    let minutes = `${currentDate.getMinutes()}`;
    return checkDateLength(hours, minutes).join(":");
  }, []);

  const setDate = useCallback(() => {
    let currentDate = new Date();
    let day = `${currentDate.getDate()}`;
    let month = `${currentDate.getMonth() + 1}`;
    let year = `${currentDate.getFullYear()}`;
    return checkDateLength(day, month, year);
  }, []);

  const { mutate: mutateAdd } = useMutation(
    ["add message"],
    (data) => ChannelService.newMessage(data),
    {
      onSuccess: () => queryClient.refetchQueries(["get messages"]),
    }
  );

  const { mutate: mutateEdit } = useMutation(
    ["edit message"],
    (data) => ChannelService.editMessage(data),
    {
      onSuccess: () =>
        queryClient.refetchQueries(["get messages"], { active: true }),
    }
  );

  const addMessage = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey && event.target.value) {
        let comment = event.target.value;
        if (editedMessage.commentId) {
          mutateEdit({
            id: editedMessage.commentId,
            comment: comment,
          });
          event.target.value = "";
          dispatch({
            type: "TEXTAREA_FORM",
            payload: null,
          });
          return;
        }
        let time = setTime();
        let date = setDate();
        event.target.value = "";
        let postData = {
          userId: userData?.id,
          username: userData?.username,
          channelId: channelId,
          body: comment,
          messageTime: time,
          messageDate: date,
        };

        mutateAdd(postData);
      }
    },
    [
      setTime,
      setDate,
      channelId,
      mutateAdd,
      editedMessage,
      mutateEdit,
      dispatch,
      userData,
    ]
  );

  //   useEffect(() => {
  //     let messageKey;
  //     let stateForEdit = messages[chatId]?.filter((obj, index) => {
  //       if (obj.currentMessageEdit) {
  //         messageKey = index;
  //         return obj.currentMessageEdit;
  //       }
  //       return null;
  //     })[0];
  //     if (stateForEdit) {
  //       let commentTextarea = document.querySelector(".commentTextarea");
  //       commentTextarea.value = stateForEdit.currentMessageEdit;
  //       commentTextarea.messageKey = messageKey;
  //     }
  //   }, [messages, chatId]);

  useEffect(() => {
    let textarea = footerTextarea.current;
    textarea.value = editedMessage.commentBody;
    textarea.focus();
  }, [editedMessage]);

  return (
    <FooterStyle onClick={closeMenu}>
      <FooterButton>
        <img src={attach} alt="attach" />
      </FooterButton>
      <FooterButton>
        <img src={microphone} alt="microphone" />
      </FooterButton>

      <MessageForm onKeyUp={addMessage}>
        <textarea
          ref={footerTextarea}
          type="text"
          placeholder={`Message in ` + prop.chatName}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) e.preventDefault();
          }}
        ></textarea>
      </MessageForm>

      <FooterSmileButton>
        <img src={smile} alt="smile" />
      </FooterSmileButton>
    </FooterStyle>
  );
}

function checkDateLength(...args) {
  return args.map((item) => (item.length === 1 ? `0${item}` : item));
}

const FooterStyle = styled.footer`
  padding: 0 22px;
  height: 72px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: fixed;
  width: calc(100% - 360px);
  background: #fff;
  bottom: 0;
`;

const MessageForm = styled.form`
  margin-right: 20px;
  flex-grow: 1;
  display: flex;
  textarea {
    width: 100%;
    resize: none;
    margin-right: 20px;
    max-height: 40px;
    position: relative;
    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
    &::placeholder {
      transform: translateY(50%);
    }
  }
`;

const FooterButton = styled.button`
  margin-right: 21px;
  background: inherit;
`;

const FooterSmileButton = styled(FooterButton)`
  margin-right: 0;
`;
