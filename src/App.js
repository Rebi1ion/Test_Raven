import React from "react";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import emotionReset from "emotion-reset";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuModalProvider from "./providers/MenuModalProvider";
import { QueryClientProvider, QueryClient } from "react-query";

import NavigationChats from "./components/NavigationChats";
import NavigationFriends from "./components/NavigationFriends";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import ChannelPanel from "./components/ChannelPanel";
import ChatPanel from "./components/ChatPanel";
import AddChatPanel from "./components/AddChatPanel";

function App() {
  const { chatId } = useLocation().state || { chatId: 0 };
  const channelId = useLocation().state?.channelId || 1;
  const currentUserId = useLocation().state?.currentUserId || 3;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MenuModalProvider>
        <AppClass>
          <Global styles={minify} />
          <NavigationChats />
          <NavigationFriends />
          <Routes>
            <Route
              path="/"
              element={
                <Chat
                  chatId={chatId}
                  channelId={channelId}
                  userId={currentUserId}
                />
              }
            ></Route>
            <Route path="/admin-panel" element={<ChannelPanel />}></Route>
            <Route path="/admin-chat-panel" element={<ChatPanel />}></Route>
            <Route path="/add-chat-panel" element={<AddChatPanel />}></Route>
          </Routes>
          <Profile />
        </AppClass>
      </MenuModalProvider>
    </QueryClientProvider>
  );
}

const AppClass = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: "Lato", sans-serif;
  display: flex;
  overflow-x: hidden;
`;

const minify = css`
  ${emotionReset}
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  :focus,
  :active {
    outline: none;
  }
  a:focus,
  a:active {
    outline: none;
  }
  nav,
  footer,
  header,
  aside {
    display: block;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  input,
  button,
  textarea {
    font-family: inherit;
  }
  input::-ms-clear {
    display: none;
  }
  button {
    cursor: pointer;
  }
  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  a,
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  ulli {
    list-style: none;
  }
  img {
    vertical-align: top;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: 400;
  }
`;

export default App;
