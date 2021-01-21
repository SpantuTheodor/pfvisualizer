const visualizeReducer = (state = false, action) => {
  switch (action.type) {
    case "Visualize_True":
      return true;
    case "Visualize_False":
      return false;
    default:
      return state;
  }
};

export default visualizeReducer;
