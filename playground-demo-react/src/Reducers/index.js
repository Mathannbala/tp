import { combineReducers } from "redux";
import login from "./login";
import forms from "./forms";
import toasts from "./toasts";

export default combineReducers({
    login,
    forms,
    toasts
});