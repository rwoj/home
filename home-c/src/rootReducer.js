import { combineReducers } from "redux";
import register from "./reducers/register";
import ustawienia from "./reducers/ustawienia";

export default combineReducers ({
  register,
  ustawienia
});
