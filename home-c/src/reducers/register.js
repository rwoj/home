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

const wyjsciaHashSelector = state => state.register.wyjscia?state.register.wyjscia:[]

export const wyjsciaSelector = createSelector(wyjsciaHashSelector, hash =>
  hash
)

const wySatelHashSelector = state => state.register.wySatel?state.register.wySatel:[];

export const wySatelSelector = createSelector(wySatelHashSelector, hash =>
  hash
)

const wyTempHashSelector = state => state.register.wyTemp?state.register.wyTemp:[];

export const wyTempSelector = createSelector(wyTempHashSelector, hash =>
  hash
)

