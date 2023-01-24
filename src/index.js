import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import messageStore from "./reducers/chatReducer";
import profileStore from "./reducers/profileReducer";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rootReducers = combineReducers({
  message: messageStore,
  profile: profileStore,
});

const store = configureStore({ reducer: rootReducers });

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
