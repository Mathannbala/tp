import { combineReducers } from "redux";
import login from "./login";
import forms from "./forms";
import toasts from "./toasts";
import wind from "./wind";
import solar from "./solar";
import noise from "./noise";
import stl from "./stl";
import stlContainer from "./stlContainer";
import project from "./project";

export default combineReducers({
  login,
  forms,
  toasts,
  wind,
  solar,
  noise,
  stl,
  stlContainer,
  project
});