import { createSelector } from "reselect";

export default function ustawienia(state={}, action={}) {
  switch (action.type) {
    case 'ODCZYT_USTAWIEN':
      return {...state, ...action.data};
    default:
      return state;
  }
}

const lokaleHashSelector = state => !state.ustawienia.lokale? [] : state.ustawienia.lokale;

export const lokaleSelector = createSelector(lokaleHashSelector, hash =>
  hash
)

const rejestrOpisHashSelector = state => !state.ustawienia.rejestrOpis? [] : state.ustawienia.rejestrOpis;

export const rejestrOpisSelector = createSelector(rejestrOpisHashSelector, hash =>
  Object.values(hash)
);