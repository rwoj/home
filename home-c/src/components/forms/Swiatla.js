import React from "react"
import SwiatlaParter from "./SwiatlaParter"
import SwiatlaPietro from "./SwiatlaPietro"
import SwiatlaZewnetrzne from "./SwiatlaZewnetrzne"


const Swiatla = ()=>(
    <div className="block">
        <h4 > Swiatla </h4>
        <SwiatlaParter />    <SwiatlaPietro />
        <SwiatlaZewnetrzne />
    </div>
)

export default Swiatla