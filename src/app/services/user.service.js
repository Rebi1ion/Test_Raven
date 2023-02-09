import axios from "axios";
import { BASE_URL } from "./channel.service";

axios.defaults.baseURL = BASE_URL;

export const UserService = {
  getChannelData(channelId) {
    if (channelId !== -1 && channelId)
      return axios.get(`/channels/${channelId}`);
  },

  changeFavoriteChannel({ channelId, newFavoriteUsers }) {
    return axios.patch(`/channels/${channelId}`, {
      favoriteUsers: newFavoriteUsers,
    });
  },

  getAllUsers() {
    return axios.get("/users");
  },

  editChannelName({ channelId, channelName }) {
    return axios.patch(`/channels/${channelId}`, {
      channelName: channelName,
    });
  },

  editUsersInChannel({ channelId, userList }) {
    return axios.patch(`/channels/${channelId}`, {
      users: userList,
    });
  },

  leaveChannel({ channelId, usersList }) {
    return axios.patch(`/channels/${channelId}`, { users: usersList });
  },

  makeUserAdminOfChannel({ channelId, newAdminsList }) {
    return axios.patch(`/channels/${channelId}`, {
      adminUsers: newAdminsList,
    });
  },
};
