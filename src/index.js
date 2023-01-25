import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/chatReducer";
import profileReducer from "./reducers/profileReducer";
import chatUsersReducer from "./reducers/chatUsersReducers";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rootReducers = combineReducers({
  message: messageReducer,
  profile: profileReducer,
  chatUsers: chatUsersReducer,
});

const store = configureStore({ reducer: rootReducers });

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
