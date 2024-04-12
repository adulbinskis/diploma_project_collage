import './MapPage.css'
import Map from './Map'
import React, {FC, useEffect} from "react";

const MapPage: FC=()=>{

    return(
        <div className="map-container">
            <h1 className={'map-title'}> Kur mūs atrast? </h1>
            <p className={'map-text'}>Brīvības iela 48-20, Balvi, Balvu novads, LV-4501, Latvija</p>
            {/* <div> */}
                <Map/>
            {/* </div> */}
         
        </div>
    )
}

export default MapPage

