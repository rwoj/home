import { ODCZYT_USTAWIEN, ZMIANA_USTAWIEN } from "./types";
import api from "../api";

export const pobraneUstawienia = data => ({
  type: ODCZYT_USTAWIEN,
  data
});

export const wczytajUstawieniaLokale = () => dispatch =>
        api.ustawienia.getUstawieniaLokale().then(ustawienia => dispatch(pobraneUstawienia(ustawienia)))
export const wczytajUstawieniaRejestOpis = () => dispatch =>
        api.ustawienia.getUstawieniaRejestrOpis().then(rejestrOpis => dispatch(pobraneUstawienia(rejestrOpis)))

export const zmienUstawienia = ()=>({cos:2})


// import { userLoggedIn } from "./auth";
//
//
// export const signup = data => dispatch =>
//   api.user.signup(data).then(user => {
//     localStorage.bookwormJWT = user.token;
//     dispatch(userLoggedIn(user));
//   });
//
// export const fetchCurrentUser = () => dispatch =>
//   api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));
