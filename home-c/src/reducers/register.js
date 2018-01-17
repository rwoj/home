import {ODCZYT_REJESTRU} from "../actions/types"

export default function register(state={}, action={}) {
  switch (action.type) {
    case ODCZYT_REJESTRU:
      return {...state, ...action.dane}
    default:
      return state;
  }
}
