import React from 'react'
import PropTypes from "prop-types"
import {Route} from 'react-router-dom'

import TopNavigation from "./components/TopNavigation"
import HomePage from "./components/pages/HomePage"
import Register from "./components/pages/Register"
import Ustawienia from "./components/pages/Ustawienia"
// import Konfiguracja from "./components/pages/Konfiguracja"
import Ogrzewanie from "./components/forms/Ogrzewanie"
import Swiatla from './components/forms/Swiatla'
import Czujki from './components/forms/Czujki'

const App = ({location}) => (
    <div>
      <TopNavigation />
      <Route  location={location} path="/" exact component={HomePage} />
      <Route  location={location} path="/rejestr" exact component={Register}  />
      <Route  location={location} path="/ustawienia" exact component={Ustawienia}  />
      {/* <Route  location={location} path="/konfiguracja" exact component={Konfiguracja}  /> */}
      <Route  location={location} path="/ogrzewanie" exact component={Ogrzewanie}  />
      <Route  location={location} path="/swiatla" exact component={Swiatla}  />
      <Route  location={location} path="/czujki" exact component={Czujki}  />
    </div>
)

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
}

export default App;
