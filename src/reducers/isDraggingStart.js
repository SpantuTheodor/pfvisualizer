const draggingStartReducer = (state = false, action) => {
  switch (action.type) {
    case "Dragging_Start":
      return !state;
    default:
      return state;
  }
};

export default draggingStartReducer;
