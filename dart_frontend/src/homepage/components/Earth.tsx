import { FC, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import earth_img from '../assets/earth-blue-marble.jpg';
import earth_topology from '../assets/earth-topology.png';
import useCloudLayer from "../hooks/useCloudLayer.ts";
import useGlobeSetup from "../hooks/useGlobeSetup.ts";
import useResizeHandler from "../hooks/useResizeHandler.ts";

const Earth: FC = () => {
    const globeElement = useRef<GlobeMethods | undefined>();
    const CLOUDS_RADIUS = 100;

    useCloudLayer(globeElement.current, CLOUDS_RADIUS);
    useGlobeSetup(globeElement.current);
    useResizeHandler(globeElement.current);

    return (
        <Globe
            ref={globeElement}
            animateIn={false}
            globeImageUrl={earth_img}
            bumpImageUrl={earth_topology}
            backgroundColor="#000000"
            showAtmosphere={true}
            atmosphereAltitude={0.13}
            waitForGlobeReady={true}
        />
    );
};

export default Earth;
