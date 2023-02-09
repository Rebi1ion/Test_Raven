import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/chatReducer";
import profileReducer from "./reducers/profileReducer";
import chatUsersReducer from "./reducers/chatUsersReducers";
import textareaReducer from "./reducers/textareaReducer";
import reloadMutationReducer from "./reducers/reloadAfterMuation";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rootReducers = combineReducers({
  message: messageReducer,
  profile: profileReducer,
  chatUsers: chatUsersReducer,
  textarea: textareaReducer,
  reload: reloadMutationReducer
});

const store = configureStore({ reducer: rootReducers });

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
