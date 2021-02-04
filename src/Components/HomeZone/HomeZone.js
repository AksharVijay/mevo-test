import React, {useState, useEffect, useRef} from 'react';
import useSwr from 'swr';
import ReactMapGL, { Marker, Popup, FlyToInterpolator, Layer} from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import './HomeZone.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

const HomeZone = () => {

    const  [viewport, setViewport] = useState({
        latitude: -41.291099,
        longitude: 174.786042,
        width: "100vw",
        height: "100vh",
        zoom: 12
    });

    const [selectedVec, setSelectedVec] = useState(null);

    useEffect(() => {
        const listener = e => {
            if(e.key === "Escape"){
                setSelectedVec(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        }


    }, []);

    const mapRef = useRef();

    const url = "https://api.mevo.co.nz/public/vehicles/all";

    const { data, error } = useSwr(url, fetcher);

    const vec = data && !error ? data.slice(0,2000) : [];

    const paintLayer = {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': {
          type: 'identity',
          property: 'height'
        },
        'fill-extrusion-base': {
          type: 'identity',
          property: 'min_height'
        },
        'fill-extrusion-opacity': 0.6
      };


    return( <div > <ReactMapGL {...viewport} 
    maxZoom = {20} 
    mapStyle = "mapbox://styles/aksharvijay/ckklz7npa1jaw17n4c6t5984x"
    mapboxApiAccessToken ={process.env.REACT_APP_MAPBOX_TOKEN}

    onViewportChange ={newViewport => {
        setViewport({...newViewport});
    }}
    >
        {vec.map(vecs => (
        
        <Marker  latitude={parseFloat(vecs.position.latitude)} longitude={parseFloat(vecs.position.longitude)}>
                <button 
                className="marker-btn"
                onClick = { e => {
                    e.preventDefault();
                    setSelectedVec(vecs);

                    setViewport({
                        ...viewport,
                        transitionInterpolator : new FlyToInterpolator({ speed : 5}),
                        transitionDuration : "auto"
                    })
                }}>
                    <img src="https://assets.mevo.co.nz/vehicles/pin-vehicle-available.png" alt=""/>
                </button>
            </Marker>
        ))}

        { selectedVec ? (
            <Popup 
                latitude={parseFloat(selectedVec.position.latitude)} 
                longitude={parseFloat(selectedVec.position.longitude)}
                onClose = { () =>{
                    setSelectedVec(null);
                }}>
                <div>
                    <p> <strong>Latitude :</strong> {parseFloat(selectedVec.position.latitude)}</p>
                    <p> <strong>Longitude :</strong> {parseFloat(selectedVec.position.longitude)}</p>
                </div>
            </Popup>
        ) : null}

        <Layer
          id="3d-buildings"
          sourceId="composite"
          sourceLayer="building"
          filter={['==', 'extrude', 'true']}
          type="fill-extrusion"
          minZoom={14}
          paint={paintLayer}
        />
     
      

    </ReactMapGL> </div>)
}

export default HomeZone
