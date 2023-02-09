import axios from "axios";
import { BASE_URL } from "./channel.service";

axios.defaults.baseURL = BASE_URL;

export const ChatService = {
  getAllChats() {
    return axios.get("/chats");
  },

  getChatById(chatId) {
    return axios.get(`/chats/${chatId}`);
  },

  addNewChat(chatData) {
    return axios.post(`/chats`, chatData);
  },

  editChatName({ chatId, chatName }) {
    return axios.patch(`/chats/${chatId}`, { chatName: chatName });
  },

  editUsersInChat({ chatId, newChatUsers }) {
    return axios.patch(`/chats/${chatId}`, { users: newChatUsers });
  },

  addChannel(newChannelData) {
    return axios.post(`/channels`, newChannelData);
  },

  deleteChannel(channelId){
	return axios.delete(`/channels/${channelId}`);
  }
};
