import React from 'react'
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from 'reactstrap';
import {connect} from 'react-redux'
import {wczytajUstawieniaLokale, wczytajUstawieniaRejestOpis} from '../actions/ustawienia'


class TopNavigation extends React.Component{
  // state = {
  //   loading: true
  // }
  componentDidMount(){
    this.props.wczytajUstawieniaLokale()
    this.props.wczytajUstawieniaRejestOpis()
  }

  render(){
    return (
      <div>
        <h2>Sterowanie domem</h2>
        <Nav>
          <NavItem>
            <NavLink href='/'>Strona startowa</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/rejestr'>Rejestr</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/ustawienia'>Ustawienia</NavLink>
          </NavItem>
        </Nav>
      </div>
    )
  }
}
TopNavigation.propTypes = {
  wczytajUstawieniaLokale: PropTypes.func.isRequired, 
  wczytajUstawieniaRejestOpis: PropTypes.func.isRequired
}

function mapStateToProps (state){
  return {
    register: Object.values(state.register)
  }
}

export default connect(mapStateToProps, {wczytajUstawieniaLokale, wczytajUstawieniaRejestOpis})(TopNavigation)
