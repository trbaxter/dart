import { FC, useEffect, useRef, useState } from 'react';
import Globe, {GlobeMethods} from 'react-globe.gl';
import earth_img from './assets/earth-blue-marble.jpg';
import earth_topology from './assets/earth-topology.png'
import useCloudLayer from "./hooks/useCloudLayer.ts";
import useResizeHandler from "./hooks/useResizeHandler.ts";

const Earth: FC = () => {

    // Assigns reference to the Globe instance
    const earthElement = useRef<GlobeMethods | undefined>();

    // State to trigger updates
    const [earthObject, setEarthObject] = useState<GlobeMethods | undefined>();

    // Sets the Earth globe object once ref is initialized
    useEffect(() => {
        if (earthElement.current) {
            setEarthObject(earthElement.current);
        }
    }, []);

    useCloudLayer(earthObject); // Adds cloud layer functionality
    useResizeHandler(earthObject); // Handles responsive resizing in the browser

    return (
        <div style = {{ position: 'relative', width: '100%', height: '100vh' }}>
            <Globe
                ref = { earthElement }
                animateIn = { false }
                globeImageUrl = { earth_img }
                bumpImageUrl = { earth_topology }
                backgroundColor = "#000000"
                showAtmosphere = { true }
                atmosphereAltitude = { 0.13 }
                waitForGlobeReady = { true }
            />
            <div
                style = {{
                    position: 'absolute',
                    top: '44.5%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    textAlign: 'center',
                    zIndex: 10,
                }}
            >
                <h1 style = {{
                    fontFamily: 'Playfair Display',
                    fontSize: '12rem',
                    fontWeight: 'bold'}}
                >
                    Solventum
                </h1>
                <h3 style = {{
                    fontFamily: "Barlow",
                    display: "inline-block",
                    fontSize: '1.25rem',
                    letterSpacing: '0.5em',
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    backgroundColor: '#083931',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                    lineHeight: 1,
                    whiteSpace: "normal",
                    userSelect: "none",
                    padding: '0.45em',
                    textIndent: '0.5em',
                    position: 'relative',
                    top: '-6.32em' }}
                >
                    Data & Analytics Resource Center
                </h3>
            </div>
        </div>
    );
};


export default Earth;