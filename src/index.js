import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

let defaultState = {
  0: {
    userId: 1,
    username: "Jeshua Stout",
    messageTime: "6:38 PM",
    messageText: "@pierrhack I did for 6 days in Iceland",
  },
  1: {
    userId: 2,
    username: "Harold Adams",
    messageTime: "5:02 PM",
    messageText:
      "Which country to visit next? This is a photo with my friends - celebrating in Bali",
  },
};

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        [action.payload.key]: {
          userId: 2,
          username: "user",
          messageTime: action.payload.commentTime,
          messageText: action.payload.comment,
        },
      };
    case "EDIT_MESSAGE":
      let copyMessage = structuredClone(state[action.payload.key]);
      copyMessage.messageText = action.payload.comment;
      return { ...state, [action.payload.key]: copyMessage };

    case "DELETE_MESSAGE":
      return Object.values(state).filter(
        (item, index) => index !== action.payload
      );

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
