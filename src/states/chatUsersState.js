import users from "./userState.js";

let chatUsersState = [
  {
    chatName: "general",
    users: [users[1], users[2], users[3]],
    selected: true,
    isFavorite: false,
    isAdmin: false,
    bgColor: "rgb(218, 5, 5)",
  },
  {
    chatName: "tests",
    users: [users[3], users[4]],
    selected: false,
    isFavorite: true,
    isAdmin: true,
    bgColor: "rgb(252, 81, 2)",
  },
];

export default chatUsersState;
