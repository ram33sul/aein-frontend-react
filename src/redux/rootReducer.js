import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import wsReducer from "./webSocket/wsReducer";

const rootReducer = combineReducers({
    user: userReducer,
    webSocket: wsReducer
})

export default rootReducer;