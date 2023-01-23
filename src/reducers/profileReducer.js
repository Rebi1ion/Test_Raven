const profileState = {
  visible: false,
  profileId: null,
};

const profileReducer = (state = profileState, action) => {
  switch (action.type) {
    case "OPEN_PROFILE":
      return { ...state, visible: true, profileId: action.payload };
    case "CLOSE_PROFILE":
      return { ...state, visible: false };
    default:
      return state;
  }
};

export default profileReducer;
