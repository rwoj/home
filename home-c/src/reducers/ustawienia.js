import { createSelector } from "reselect";

export default function ustawienia(state={}, action={}) {
  switch (action.type) {
    case 'ODCZYT_USTAWIEN':
      return {...state, ...action.data};
    default:
      return state;
  }
}

const lokaleHashSelector = state => !state.ustawienia.lokale? [] : state.ustawienia.lokale

export const lokaleSelector = createSelector(lokaleHashSelector, hash =>
  hash
)

const konfigHashSelector = state => !state.ustawienia.konfig? [] : state.ustawienia.konfig
export const konfigSelector = createSelector(konfigHashSelector, hash =>
  hash
)
const konfigTempHashSelector = state => !state.ustawienia.konfigTemp? [] : state.ustawienia.konfigTemp
export const konfigTempSelector = createSelector(konfigTempHashSelector, hash =>
  hash
)

const rejestrOpisHashSelector = state => !state.ustawienia.rejestrOpis? [] : state.ustawienia.rejestrOpis;

export const rejestrOpisSelector = createSelector(rejestrOpisHashSelector, hash =>
  Object.values(hash)
);

// const swiatlaHashSelector = state => !state.ustawienia.rejestrOpis? [] : state.ustawienia.rejestrOpis

export const swiatlaRejestrOpisSelector = createSelector(rejestrOpisHashSelector, hash =>
  hash.filter(x=> x.rodzaj==='swiatlo'&& x.ster_wy==='wy')
)

export const tempRejestrOpisSelector = createSelector(rejestrOpisHashSelector, hash =>
  hash.filter(x=> x.rodzaj==='temp'&& x.ster_wy==='wy')
)
export const tempNastRejestrOpisSelector = createSelector(rejestrOpisHashSelector, hash =>
  hash.filter(x=> x.rodzaj==='temp_nast'&& x.ster_wy==='wy')
)