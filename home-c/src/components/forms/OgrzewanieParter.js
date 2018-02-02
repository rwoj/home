import React from "react"
// import {Link} from 'react-router-dom'

class OgrzewanieParter extends React.Component{
    state={
        tempNastawy: [],
    }

    render(){
        const {tempNastawy} = this.state
        const {currentTemp} = this.props
        // console.log(lokale)
        // const lokaleList = lokale.map(x=><li key={x.id}>{x.id} {x.nazwaLokalu}</li>)
        const currentTempList=currentTemp.map(x=>
            <li key={x.id}>{x.id}: {x.nazwa} {x.ogrzewanie} {x.temp} </li>)

        return (
            <ul>
                <h4>ogrzewanie parter</h4>
                {currentTempList}
            </ul>
        )
    }
}

export default OgrzewanieParter