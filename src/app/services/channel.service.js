import axios from "axios";

export const BASE_URL = "http://localhost:4000/";

axios.defaults.baseURL = BASE_URL;

export const ChannelService = {
  getDataBase() {
    return axios.get("/db");
  },

  getAllChannels(){
	return axios.get("/channels");
  },

  newMessage(data) {
    return axios.post("/comments", data);
  },

  deleteMessage(id) {
    return axios.delete(`/comments/${id}`);
  },

  editMessage(data) {
    return axios.patch(`/comments/${data.id}`, { body: data.comment });
  },
};
