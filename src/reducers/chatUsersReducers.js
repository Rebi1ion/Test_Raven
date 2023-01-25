import chatUsersState from "../states/chatUsersState";

const chatUsersReducer = (state = chatUsersState, action) => {
  switch (action.type) {
    case "CHANGE_CHANNEL":
      return state.map((item, i) => {
        return { ...item, selected: action.payload.channelId === i };
      });

    default:
      return state;
  }
};

export default chatUsersReducer;
