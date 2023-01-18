import React from "react";
import { css } from "@emotion/react";
import { useDispatch} from "react-redux";

const ChatComment = (prop) => {
  const commentBlockStyle = css`
    min-height: 34px;
    width: 100%;
    display: flex;
    margin-bottom: 11px;
    position: relative;
    padding-right: 40px;
  `;

  const commentImageStyle = css`
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

  const commentInfoStyle = css`
    display: flex;
    font-size: 0.75rem;
    margin-bottom: 2px;
    h2 {
      margin-right: 8px;
      font-weight: 700;
      line-height: 1.16;
    }
  `;

  const commentControlStyle = css`
    position: absolute;
    right: 0;
    top: 10px;
    display: flex;
  `;

  const editButtonStyle = css`
    font-size: 0.7rem;
    background: inherit;
    margin-right: 10px;
    :hover {
      text-decoration: underline;
    }
  `;

  const deleteButtonStyle = css`
    font-size: 0.7rem;
    background: inherit;
    color: red;
    :hover {
      text-decoration: underline;
    }
  `;

  const dispatch = useDispatch();

  const editMessage = () => {
	 let editedMessage = prompt("Редактирование сообщения", prop.commentMessage);

    dispatch({
      type: "EDIT_MESSAGE",
      payload: {
        key: +prop.idComment,
        comment: editedMessage,
      },
    });
  };

  const deleteMessage = () => {
    dispatch({ type: "DELETE_MESSAGE", payload: +prop.idComment });
  };

  return (
    <section css={commentBlockStyle}>
      <div css={commentImageStyle}>
        <img src={prop.userAvatar} alt="avatar" />
      </div>
      <div
        css={css`
          font-size: 0.8125rem;
        `}
      >
        <div css={commentInfoStyle}>
          <h2>{prop.username}</h2>
          <h3>{prop.commentTime}</h3>
        </div>
        <p>{prop.commentMessage}</p>
      </div>
      <div css={commentControlStyle}>
        <button css={editButtonStyle} onClick={editMessage}>
          edit
        </button>
        <button css={deleteButtonStyle} onClick={deleteMessage}>
          delete
        </button>
      </div>
    </section>
  );
};

export default ChatComment;
