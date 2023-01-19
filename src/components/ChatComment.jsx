import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const ChatComment = (prop) => {
  const dispatch = useDispatch();

  const editMessage = () => {
    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        key: +prop.idComment,
        comment: prop.commentMessage,
      },
    });
  };

  const deleteMessage = useCallback(() => {
    dispatch({ type: "DELETE_MESSAGE", payload: +prop.idComment });
  }, [dispatch, prop.idComment]);

  return (
    <CommentBlockStyle>
      <CommentImageStyle>
        <img src={prop.userAvatar} alt="avatar" />
      </CommentImageStyle>
      <div
        css={css`
          max-width: 80%;
          font-size: 0.85rem;
        `}
      >
        <CommentInfoStyle>
          <h2>{prop.username}</h2>
          <h3>{prop.commentTime}</h3>
        </CommentInfoStyle>
        <p>{prop.commentMessage}</p>
      </div>
      <CommentControlStyle>
        <EditButtonStyle onClick={editMessage}>edit</EditButtonStyle>
        <DeleteButtonStyle onClick={deleteMessage}>delete</DeleteButtonStyle>
      </CommentControlStyle>
    </CommentBlockStyle>
  );
};

export default ChatComment;

const CommentBlockStyle = styled.section`
  min-height: 34px;
  max-width: 1000px;
  display: flex;
  margin-bottom: 15px;
  position: relative;
  padding-right: 40px;
`;

const CommentImageStyle = styled.div`
  width: 34px;
  height: 34px;
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-right: 11px;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
`;

const CommentInfoStyle = styled.div`
  display: flex;
  font-size: 0.75rem;
  margin-bottom: 2px;
  h2 {
    margin-right: 8px;
    font-weight: 700;
    line-height: 1.16;
  }
`;

const CommentControlStyle = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  display: flex;
`;

const EditButtonStyle = styled.button`
  font-size: 0.7rem;
  background: inherit;
  margin-right: 10px;
  :hover {
    text-decoration: underline;
  }
`;

const DeleteButtonStyle = styled(EditButtonStyle)`
  color: red;
`;
