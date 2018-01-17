import React from 'react'
import { Container, Row} from 'reactstrap'
import {connect} from 'react-redux'
import LokalForm from '../forms/LokalForm'
import {zmienUstawienia} from '../../actions/ustawienia'

class Ustawienia extends React.Component{
  state={
    lokale: [],
    // rejestry: []
  }

  componentDidMount(){
    // wczytajUstawienia()
  }
  render(){
    const lokaleForm=this.state.lokale.map(lokal=>
    <LokalForm key={lokal.id} lokal={lokal}/>
    )
    return (
      <Container>
        <Row>Wybierz ustawienia: (Id lokalu, Nazwa Lokalu, pietro) </Row>
        {lokaleForm}
      </Container>
    )}
}


export default connect(null, {zmienUstawienia})(Ustawienia)
