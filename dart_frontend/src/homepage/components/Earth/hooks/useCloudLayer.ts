import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Mesh} from 'three';
import clouds from '../assets/clouds.png';
import {GlobeMethods} from 'react-globe.gl';
import {getGlobeRadius} from '../utils/getGlobeRadius';
import {initializeCloudLayer} from '../utils/initializeCloudLayer';

/**
 * Adds and manages a rotating cloud layer around a globe object.
 *
 * @param earthObject - The Earth globe from Earth.tsx or `undefined` if uninitialized.
 * @returns A ref object containing the cloud layer mesh (`Mesh`) or `null` if not yet initialized.
 */
const useCloudLayer = (earthObject: GlobeMethods | undefined): MutableRefObject<Mesh | null> => {
    const cloudsMeshRef = useRef<Mesh | null>(null);
    const [globeRadius, setGlobeRadius] = useState<number | null>(null);

    // Fetch the globe's radius
    useEffect(() => {
        if (!earthObject) return;

        setGlobeRadius(getGlobeRadius(earthObject!));
    }, [earthObject]);

    // Initialize and manage the globe and cloud layer
    useEffect(() => {
        if (!earthObject || globeRadius === null) return;

        return initializeCloudLayer(
            earthObject,
            globeRadius,
            cloudsMeshRef,
            clouds
        );
    }, [earthObject, globeRadius]);

    return cloudsMeshRef;
};

export default useCloudLayer;
