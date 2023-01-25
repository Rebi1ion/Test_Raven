import users from "./userState.js";

let chatUsersState = [
  {
    chatName: "#general",
    users: [users[1], users[2], users[3]],
	 selected: true,
  },
  {
    chatName: "#test",
    users: [users[3], users[4]],
	 selected: false,
  },
];

export default chatUsersState;
