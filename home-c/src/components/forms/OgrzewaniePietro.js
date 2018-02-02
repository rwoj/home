import React from "react"

const OgrzewaniePietro = ({currentTemp})=>{

    const currentTempList=currentTemp.map(x=>
        <li key={x.id}>{x.id}: {x.nazwa} {x.ogrzewanie} {x.temp} </li>)

        return (
            <ul>
                <h4>ogrzewanie pietro</h4>
                {currentTempList}
            </ul>
         )
}
export default OgrzewaniePietro