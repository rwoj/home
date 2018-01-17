import React from 'react';
import {Route} from 'react-router-dom'
import HomePage from "./components/pages/HomePage"
import TopNavigation from "./components/TopNavigation"
import Register from "./components/pages/Register"
import Ustawienia from "./components/pages/Ustawienia"

const App = () => {
    return (<div>
      <TopNavigation />
      <Route  path="/" exact component={HomePage} />
      <Route  path="/rejestr" exact component={Register}  />
      <Route  path="/ustawienia" exact component={Ustawienia}  />
    </div>
  )
}

export default App;
