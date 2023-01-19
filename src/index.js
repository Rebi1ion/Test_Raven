import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { chatState } from "./states/chatState";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rootReducer = (state = chatState, action) => {
  let payloadValue = action.payload;
  switch (action.type) {
    case "ADD_MESSAGE":
      if (!payloadValue.key && payloadValue.key !== 0) {
        return state.concat({
          userId: 3,
          username: "user",
          messageTime: payloadValue.commentTime,
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
      return state.filter((item, index) => index !== payloadValue);

    default:
      return state;
  }
};

const store = configureStore({ reducer: rootReducer });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
