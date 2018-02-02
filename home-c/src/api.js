import axios from "axios";

export default {
  ustawienia: {
    getUstawieniaLokale: ()=>
      axios.get("/api/ustawienia/lokale").then(res=>res.data.ustawienia), 
    getUstawieniaKonfiguracja: ()=>
      axios.get("/api/ustawienia/konfiguracja").then(res=>res.data.ustawienia),
    getUstawieniaRejestrOpis: ()=>
      axios.get("/api/ustawienia/rejestrOpis").then(res=>res.data.ustawienia)
  },
  rejestr: {
    wyslijZmiane: (adres, value) => 
      axios.post("/api/rejestr/wy", {adres, value})
        .catch(err=>console.log(err)),
    wyslijZmianeTemp: (adres, value) => 
        axios.post("/api/rejestr/temp", {adres, value})
          .catch(err=>console.log(err))
  }

  
  // user: {
  //   login: credentials =>
  //     axios.post("/api/auth", { credentials }).then(res => res.data.user),
  //   signup: user =>
  //     axios.post("/api/users", { user }).then(res => res.data.user),
  //   confirm: token =>
  //     axios
  //       .post("/api/auth/confirmation", { token })
  //       .then(res => res.data.user),
  //   resetPasswordRequest: email =>
  //     axios.post("/api/auth/reset_password_request", { email }),
  //   validateToken: token => axios.post("/api/auth/validate_token", { token }),
  //   resetPassword: data => axios.post("/api/auth/reset_password", { data }),
  //   fetchCurrentUser: () =>
  //     axios.get("/api/users/current_user").then(res => res.data.user)
  // }
};
