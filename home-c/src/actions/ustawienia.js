import { ODCZYT_USTAWIEN, ZMIANA_USTAWIEN } from "./types";
import api from "../api";

export const pobraneUstawienia = data => ({
  type: ODCZYT_USTAWIEN,
  data
});

const cos = [{
    "id": 1 ,
    "nazwaLokalu":  "WC" ,
    "poziom":  "parter"
  }, {
    "id": 2 ,
    "nazwaLokalu":  "Wiatrołap" ,
    "poziom":  "parter"
    }]
export const wczytajUstawienia = () => dispatch =>
  //  dispatch(pobraneUstawienia({lokale: cos}))
        api.ustawienia.getUstawieniaLokale().then(ustawienia => dispatch(pobraneUstawienia(ustawienia)))
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
