const draggingFinishReducer = (state = false, action) => {
  switch (action.type) {
    case "Dragging_Finish":
      return !state;
    default:
      return state;
  }
};

export default draggingFinishReducer;
