import {FC, useEffect, useRef, useState} from 'react';
import Globe, {GlobeMethods} from 'react-globe.gl';
import earth_img from './assets/earth-blue-marble.jpg';
import earth_topology from './assets/earth-topology.png'
import useCloudLayer from "./hooks/useCloudLayer.ts";
import useResizeHandler from "./hooks/useResizeHandler.ts";

const Earth: FC = () => {
    const earthElement = useRef<GlobeMethods | undefined>();
    const [earthObject, setEarthObject] = useState<GlobeMethods | undefined>();

    useEffect(() => {
        if (earthElement.current) {
            setEarthObject(earthElement.current);
        }
    }, []);

    useCloudLayer(earthObject);
    useResizeHandler(earthObject);


    return (
        <Globe
            ref={earthElement}
            animateIn={false}
            globeImageUrl={earth_img}
            bumpImageUrl={earth_topology}
            backgroundColor="#000000"
            showAtmosphere={true}
            atmosphereAltitude={0.13}
            waitForGlobeReady={true}
        />
    );
}


export default Earth;