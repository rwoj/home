import { createSelector } from "reselect";
import {ODCZYT_REJESTRU} from "../actions/types"

export default function register(state={}, action={}) {
  switch (action.type) {
    case ODCZYT_REJESTRU:
      return {...state, ...action.dane}
    default:
      return state;
  }
}

export const registerHashSelector = state => state.register;

export const registerSelector = createSelector(registerHashSelector, hash =>
  Object.values(hash)
);
