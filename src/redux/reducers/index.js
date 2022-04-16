import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import dialogReducer from "./dialogReducer";
import tokenReducer from "./tokenReducer";

const rootReducer = combineReducers({
	dialog: dialogReducer,
	alert: alertReducer,
	token: tokenReducer,
});

export default rootReducer;
