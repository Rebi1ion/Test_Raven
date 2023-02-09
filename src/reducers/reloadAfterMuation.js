const reloadState = false;

const reloadMutationReducer = (state = reloadState, action) => {
  switch (action.type) {
    case "RELOAD_PAGE":
      return action.payload;
    default:
      return state;
  }
};

export default reloadMutationReducer;
