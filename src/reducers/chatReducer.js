import { chatState } from "../states/chatState";


const chatReducer = (state = chatState, action) => {
  let payloadValue = action.payload;
  switch (action.type) {
    case "ADD_MESSAGE":
      if (!payloadValue.key && payloadValue.key !== 0) {
        return state.concat({
          userId: state.length + 1,
          username: "user",
          messageTime: payloadValue.commentTime,
			 messageDate: payloadValue.messageDate,
          messageText: payloadValue.comment,
        });
      }
      return state.map((item, index) => {
        if (index === payloadValue.key) {
          let messageClone = structuredClone(item);
          messageClone.messageText = payloadValue.comment;
          messageClone.messageTime = payloadValue.commentTime;
          messageClone.currentMessageEdit = null;
          return messageClone;
        }
        return item;
      });

    case "EDIT_MESSAGE":
      return state.map((item, index) => {
        if (index === payloadValue.key) {
          let messageClone = structuredClone(item);
          messageClone.currentMessageEdit = payloadValue.comment;
          return messageClone;
        }
        return item;
      });

    case "DELETE_MESSAGE":
      return state.filter((_, index) => index !== payloadValue);

    default:
      return state;
  }
};

// const messageStore = configureStore({ reducer: chatReducer });

export default chatReducer;