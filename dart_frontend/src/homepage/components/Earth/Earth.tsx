import { FC, useEffect, useRef, useState } from 'react';
import Globe, {GlobeMethods} from 'react-globe.gl';
import earth_img from '../../assets/earth-blue-marble.jpg';
import earth_topology from '../../assets/earth-topology.png'
import useCloudLayer from "./hooks/useCloudLayer.ts";
import useResizeHandler from "./hooks/useResizeHandler.ts";

const Earth: FC = () => {

    // Ref to access the Globe instance from react-globe.gl
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
        <Globe
            ref = { earthElement }
            animateIn = { false }
            globeImageUrl = { earth_img }
            bumpImageUrl = { earth_topology }
            backgroundColor = { '#000000' }
            showAtmosphere = { true }
            atmosphereAltitude = { 0.13 }
            waitForGlobeReady = { true }
        />
    );
};

export default Earth;