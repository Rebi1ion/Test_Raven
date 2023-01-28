import { chatState } from "../states/chatState";

const chatReducer = (state = chatState, action) => {
  let payloadValue = action.payload;
  let chatId = payloadValue?.chatId;

  switch (action.type) {
    case "ADD_MESSAGE":
      if (!payloadValue.key && payloadValue.key !== 0) {
        return {
          ...state,
          [chatId]: state[chatId].concat({
            userId: 3,
            username: "user",
            messageTime: payloadValue.commentTime,
            messageDate: payloadValue.messageDate,
            messageText: payloadValue.comment,
          }),
        };
      }
      return {
        ...state,
        [chatId]: state[chatId].map((item, index) => {
          if (index === payloadValue.key) {
            let messageClone = structuredClone(item);
            messageClone.messageText = payloadValue.comment;
            messageClone.messageTime = payloadValue.commentTime;
            messageClone.currentMessageEdit = null;
            return messageClone;
          }
          return item;
        }),
      };

    case "EDIT_MESSAGE":
      return {
        ...state,
        [chatId]: state[chatId].map((item, index) => {
          if (index === payloadValue.key) {
            let messageClone = structuredClone(item);
            messageClone.currentMessageEdit = payloadValue.comment;
            return messageClone;
          }
          return item;
        }),
      };

    case "DELETE_MESSAGE":
      return {
        ...state,
        [chatId]: state[chatId].filter(
          (_, index) => index !== payloadValue.commentId
        ),
      };
    case "NEW_CHAT":
      return {
        ...state,
        [chatId]: [],
      };

    default:
      return state;
  }
};

export default chatReducer;
