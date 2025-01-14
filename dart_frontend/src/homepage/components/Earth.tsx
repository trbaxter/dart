import { FC, useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import earth_img from '../assets/earth-blue-marble.jpg';
import earth_topology from '../assets/earth-topology.png'
import useCloudLayer from "../hooks/useCloudLayer.ts";
import useGlobeSetup from "../hooks/useGlobeSetup.ts";
import useGlobeRadius from "../hooks/useGlobeRadius.ts";
import useResizeHandler from "../hooks/useResizeHandler.ts";

const Earth: FC = () => {
    const globeElement = useRef<any>(null);
    const [globeObj, setGlobeObj] = useState<any>(null);

    // Set the globe object after the ref is assigned
    useEffect(() => {
        if (globeElement.current) {
            setGlobeObj(globeElement.current);
        }
    }, []);

    const globeRadius = useGlobeRadius(globeObj);

    useCloudLayer(globeObj, globeRadius);
    useGlobeSetup(globeObj);
    useResizeHandler(globeObj);

    return (
        <Globe
            ref = { globeElement }
            animateIn = { false }
            globeImageUrl = { earth_img }
            bumpImageUrl = { earth_topology }
            backgroundColor = { '#000000' }
        />
    );
};

export default Earth;