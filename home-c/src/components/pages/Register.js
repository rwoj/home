import React from 'react'
import {connect} from 'react-redux'
import {registerSelector} from '../../reducers/register'

class Register extends React.Component{
  render(){
    const {register} = this.props
    // console.log (register, register.length);

    const registerList = register.length===0? <li>loading...</li> :
      register.map( (x)=>(
        <li key={x.id}> adres: {x.id} value: {x.value} </li>
      ))

    return (
      <ul>
        {registerList}
      </ul>
    )
  }
}

function mapStateToProps (state){
  return {
    register: registerSelector(state)
  }
}

export default connect(mapStateToProps)(Register)
