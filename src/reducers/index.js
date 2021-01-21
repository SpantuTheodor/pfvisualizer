import { combineReducers } from "redux";
import clickReducer from "./isClicked";
import eraseReducer from "./isErasing";
import draggingStartReducer from "./isDraggingStart";
import draggingFinishReducer from "./isDraggingFinish";
import visualizeReducer from "./isVisualizing";

const allReducers = combineReducers({
  isClicked: clickReducer,
  isErasing: eraseReducer,
  isDraggingStart: draggingStartReducer,
  isDraggingFinish: draggingFinishReducer,
  isVisualizing: visualizeReducer,
});

export default allReducers;
