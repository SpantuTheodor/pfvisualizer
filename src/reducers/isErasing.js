const eraseReducer = (state = false, action) => {
  switch (action.type) {
    case "Erase":
      return !state;
    default:
      return state;
  }
};

export default eraseReducer;
