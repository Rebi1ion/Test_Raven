const textareaState = {
  commentId: null,
  commentBody: null,
};

const textareaReducer = (state = textareaState, action) => {
  switch (action.type) {
    case "TEXTAREA_FORM":
      return {
        ...state,
        commentId: action.payload?.commentId || action.payload,
        commentBody: action.payload?.commentBody || action.payload,
      };
    default:
      return state;
  }
};

export default textareaReducer;
