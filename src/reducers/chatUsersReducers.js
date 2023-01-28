import chatUsersState from "../states/chatUsersState";

const chatUsersReducer = (state = chatUsersState, action) => {
  switch (action.type) {
    case "CHANGE_CHANNEL":
      return state.map((item, i) => {
        return { ...item, selected: action.payload.channelId === i };
      });
    case "TOGGLE_FAVORITE":
      return state.map((item, i) => {
        return action.payload.channelId === i
          ? { ...item, isFavorite: action.payload.isFavorite }
          : item;
      });
    case "ADD_CHANNEL":
      return [...state, action.payload];

    case "EDIT_CHANNELNAME":
      return state.map((item, i) => {
        return action.payload.channelId === i
          ? { ...item, chatName: action.payload.editedName }
          : item;
      });
    case "DELETE_USER":
      return state.map((item, i) => {
        return i === action.payload.channelId
          ? {
              ...item,
              users: item.users.filter(
                (item) => item.userId !== action.payload.userId
              ),
            }
          : item;
      });
    case "ADD_USER":
      return state.map((item, i) => {
        return i === action.payload.channelId
          ? { ...item, users: [...item.users, action.payload.user] }
          : item;
      });

    default:
      return state;
  }
};

export default chatUsersReducer;
