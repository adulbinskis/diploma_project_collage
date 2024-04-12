import React, {FC, useEffect} from "react";
import './Map.css'
import 'ol/ol.css';
import Map from 'ol/Map';
import TileJSON from 'ol/source/TileJSON';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';

import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Style, Icon, Text} from 'ol/style';

import {observer} from "mobx-react-lite";
import {GeoJSON} from "ol/format";


const key = 'CCx0XODgd5HCZA77Rwu5#14.0/52.07931/4.89959'; //https://cloud.maptiler.com/maps/osm-standard/

const MapComponent: FC =()=> {

    useEffect(() => {
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    maxZoom: 14, // visible at zoom levels 14 and below
                    source: new OSM(),
                }),

                new TileLayer({ //zis shits nestraadaaa
                    minZoom: 14, // visible at zoom levels above 14
                    source: new TileJSON({
                        url: 'https://api.maptiler.com/maps/outdoor/tiles.json?key=' + key,
                        tileSize: 512,
                    }),
                }),
                new VectorLayer({
                    source: new VectorSource({
                        url: 'http://localhost:5000/geojson/geojsonbtbi3.geojson',
                        format: new GeoJSON(),
                    }),
                    style: new Style({
                        text: new Text({
                           text: 'Brīvības iela 48',
                            offsetY: -45,
                            scale: 2,
                        }),
                        image: new Icon({
                            src: 'http://localhost:5000/locationImg/PngItem_98313.png',
                            scale: 0.30,
                        }),

                    }),
                }),
            ],

            view: new View({
                center: fromLonLat([27.2592614915893, 57.13111496774774]),
                zoom: 15,
                maxZoom: 18,
                constrainOnlyCenter: true,
            }),
        });

    });

    return(
       <div id="map" className="map"/>
    )
}



export default MapComponent