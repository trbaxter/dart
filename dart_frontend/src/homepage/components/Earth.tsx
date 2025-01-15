import { FC, useEffect, useRef, useState } from 'react';
import Globe, {GlobeMethods} from 'react-globe.gl';
import earth_img from '../assets/earth-blue-marble.jpg';
import earth_topology from '../assets/earth-topology.png'
import useCloudLayer from "../hooks/useCloudLayer.ts";
import useGlobeSetup from "../hooks/useGlobeSetup.ts";
import useGlobeRadius from "../hooks/useGlobeRadius.ts";
import useResizeHandler from "../hooks/useResizeHandler.ts";

const Earth: FC = () => {
    const earthElement = useRef<GlobeMethods | undefined>();
    const [globeObj, setglobeObj] = useState<GlobeMethods | undefined>();

    useEffect(() => {
        if (earthElement.current) {
            setglobeObj(earthElement.current);
        }
    }, []);

    const globeRadius = useGlobeRadius(globeObj);

    useCloudLayer(globeObj, globeRadius);
    useGlobeSetup(globeObj);
    useResizeHandler(globeObj);

    return (
        <Globe
            ref = { earthElement }
            animateIn = { false }
            globeImageUrl = { earth_img }
            bumpImageUrl = { earth_topology }
            backgroundColor = { '#000000' }
            showAtmosphere = { true }
            atmosphereAltitude= { 0.13 }
            waitForGlobeReady = { true }
        />
    );
};

export default Earth;