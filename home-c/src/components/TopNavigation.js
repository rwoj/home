import React from 'react'
import PropTypes from "prop-types";
import { Nav, NavItem, NavLink } from 'reactstrap';
import {connect} from 'react-redux'
import {wczytajUstawieniaLokale, wczytajUstawieniaRejestOpis} from '../actions/ustawienia'
import {swiatlaRejestrOpisSelector} from '../reducers/ustawienia'

class TopNavigation extends React.Component{
  state = {
    liczbaZapalonychSwiatel: 0,
    // this.policzZapaloneSwiatla(this.props.swiatla, this.props.register)
  }
  componentDidMount(){
    this.props.wczytajUstawieniaLokale()
    this.props.wczytajUstawieniaRejestOpis()
  }
  componentWillReceiveProps(){
    this.setState({liczbaZapalonychSwiatel: this.policzZapaloneSwiatla(this.props.swiatla,this.props.register)})
  }
  
  policzZapaloneSwiatla = (swiatla, register)=> {
    console.log(swiatla, register)
    return swiatla.reduce((nr, swiatlo)=>{
      const regFind = register.find(x=>x.id===swiatlo.adres)
      const value = regFind?regFind.value:0
      console.log(value)
      return nr+value}, 0)
  }

  render(){
    const {liczbaZapalonychSwiatel} = this.state

    return (
      <div>
        <h2>Sterowanie domem</h2>
        <p>Swiatel: {liczbaZapalonychSwiatel} </p>
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
  wczytajUstawieniaRejestOpis: PropTypes.func.isRequired, 
  register: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
  swiatla: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

function mapStateToProps (state){
  return {
    register: Object.values(state.register), 
    swiatla: swiatlaRejestrOpisSelector(state)
  }
}

export default connect(mapStateToProps, 
  {wczytajUstawieniaLokale, wczytajUstawieniaRejestOpis, swiatlaRejestrOpisSelector})
  (TopNavigation)
