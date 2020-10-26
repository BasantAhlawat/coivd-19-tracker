import React from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import "./Map.css"
import {showDataOnMap} from "./util.js";

function Map({countries,casesType='cases',center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 />
                 {/* {console.log("mapCountries ---->>>",mapCountries)}; */}
                 {/* Crucial error always check it data is populated or not by this condition */}
                {countries?.length>0 && (showDataOnMap(countries,casesType))}
            </LeafletMap>
            

        </div>
    )
}

export default Map
