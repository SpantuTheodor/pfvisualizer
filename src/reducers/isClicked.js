const clickReducer = (state = false, action) => {
  switch (action.type) {
    case "Mouse_Click":
      return !state;
    default:
      return state;
  }
};

export default clickReducer;
