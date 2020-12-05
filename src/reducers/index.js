import { combineReducers } from "redux";
import clickReducer from "./isClicked";
import eraseReducer from "./isErasing";
import draggingStartReducer from "./isDraggingStart";
import draggingFinishReducer from "./isDraggingFinish";

const allReducers = combineReducers({
  isClicked: clickReducer,
  isErasing: eraseReducer,
  isDraggingStart: draggingStartReducer,
  isDraggingFinish: draggingFinishReducer,
});

export default allReducers;
