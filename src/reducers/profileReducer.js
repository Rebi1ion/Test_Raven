const profileState = {
  visible: false,
  id: null,
};

const profileReducer = (state = profileState, action) => {
  switch (action.type) {
    case "OPEN_PROFILE":
      return { ...state, visible: true, id: action.payload.id };
    case "CLOSE_PROFILE":
      return { ...state, visible: false };
    default:
      return state;
  }
};

export default profileReducer;
