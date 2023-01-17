import React from "react";
import { css } from "@emotion/react";

const ChatComment = (prop) => {
  const commentBlock = css`
    min-height: 34px;
    width: 100%;
    display: flex;
    margin-bottom: 11px;
  `;

  const commentImage = css`
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

  const commentInfo = css`
    display: flex;
    font-size: 0.75rem;
    margin-bottom: 2px;
    h2 {
      margin-right: 8px;
      font-weight: 700;
      line-height: 1.16;
    }
  `;

  return (
    <section css={commentBlock}>
      <div css={commentImage}>
        <img src={prop.userAvatar} alt="avatar" />
      </div>
      <div
        css={css`
          font-size: 0.8125rem;
        `}
      >
        <div css={commentInfo}>
          <h2>{prop.username}</h2>
          <h3>{prop.commentTime}</h3>
        </div>
        <p>{prop.commentMessage}</p>
      </div>
    </section>
  );
};

export default ChatComment;
