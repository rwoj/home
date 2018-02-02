import React from "react"
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {wyjsciaSelector, wyTempSelector} from '../../reducers/register'
import {konfigTempSelector} 
        from '../../reducers/ustawienia'
import OgrzewanieParter from "./OgrzewanieParter"
import OgrzewaniePietro from "./OgrzewaniePietro"
import OgrzewanieHarmonogram from "./OgrzewanieHarmonogram"

class Ogrzewanie extends React.Component{
    state={
        poziom: this.props.location.state,
    }

    zmienPoziom= (poz) =>
        this.setState({poziom: poz})

    render (){
        const {poziom} = this.state
        const {konfigTemp, wyTemp, wyjscia} = this.props
        // console.log('temp', temp)
        const currentTemp={
            parter:[],
            pietro:[],
            calyDom:[]
        }
  
        konfigTemp.map(x=>{
            const temp = x.idTempWy>0? wyTemp.find(y=>y.id===x.idTempWy):{value: ''}
            const tempValue = temp?temp.value:''
            const ogrzew = x.idGrzanie>0? wyjscia.find(y=>y.id===x.idGrzanie):{value: ''}
            const ogrzewValue = ogrzew?ogrzew.value:''
            if (x.poziom==='parter'){
                currentTemp.parter.push({...x, temp: tempValue , ogrzewanie : ogrzewValue })
            } else if (x.poziom==='pietro') {
                currentTemp.pietro.push({...x, temp: tempValue, ogrzewanie : ogrzewValue })
            } else{
                currentTemp.calyDom.push({...x, temp: tempValue, ogrzewanie : ogrzewValue })
            }
        })
        
        // console.log("fin",finLokale)

        return (
            <div className='strona-glowna'>              
                {poziom === 'parter' && 
                    <OgrzewanieParter currentTemp={currentTemp.parter} />}
                {poziom === 'pietro' && 
                    <OgrzewaniePietro currentTemp={currentTemp.pietro} />}
                {poziom === 'calyDom' && 
                    <OgrzewanieHarmonogram currentTemp={currentTemp.parter} />}
                <button onClick = {()=>this.zmienPoziom('parter')}> Parter </button>
                <button onClick = {()=>this.zmienPoziom('pietro')}> Piętro </button>
                <button onClick = {()=>this.zmienPoziom('calyDom')}> Harmonogram </button>
            </div>
        )
    }
}

Ogrzewanie.propTypes = {
    wyTemp: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    wyjscia: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    location: PropTypes.shape({
        state: PropTypes.string.isRequired,
    }).isRequired,
    konfigTemp: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
  
  function mapStateToProps (state){
    return {
      wyTemp: wyTempSelector(state),
      wyjscia: wyjsciaSelector(state),
      konfigTemp: konfigTempSelector(state), 
    }
  }

export default connect(mapStateToProps)(Ogrzewanie)

//, tempRejestrOpisSelector, tempNastRejestrOpisSelector, lokaleSelector
      // const finLokale={
        //     parter:[],
        //     pietro:[],
        //     calyDom:[]
        // }
        // const finWyTemp={
        //     parter:[],
        //     pietro:[],
        //     calyDom:[]
        // }
        // const finTemp={
        //     parter:[],
        //     pietro:[],
        //     calyDom:[]
        // }
        // const finTempNast={
        //     parter:[],
        //     pietro:[],
        //     calyDom:[]
        // }

            // temp: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    // tempNast: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    // lokale: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

    //   temp: tempRejestrOpisSelector(state), 
    //   tempNast: tempNastRejestrOpisSelector(state),
    //   lokale: lokaleSelector(state)