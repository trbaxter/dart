import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { Mesh, PerspectiveCamera } from 'three';
import clouds from '../assets/clouds.png';
import { GlobeMethods } from 'react-globe.gl';
import { configureCamera } from '../utils/configureCamera';
import { configureControls } from '../utils/configureControls';
import { createCloudLayerMesh } from '../utils/createCloudLayerMesh';
import { cleanupCloudLayerMesh } from '../utils/cleanupCloudLayerMesh';
import { animateCloudLayer } from '../utils/animateCloudLayer';

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

        const radius = earthObject.getGlobeRadius?.();
        if (typeof radius === 'number') {
            setGlobeRadius(radius);
        } else {
            console.error('Failed to get globe radius.');
        }
    }, [earthObject]);

    // Initialize and manage the globe and cloud layer
    useEffect(() => {
        if (!earthObject) return;

        const controls = earthObject.controls?.();
        configureControls(controls);

        const camera = earthObject.camera?.() as PerspectiveCamera;
        configureCamera(camera);

        if (globeRadius === null) return;

        const CLOUDS_ROTATION_SPEED = -0.0006;

        createCloudLayerMesh(globeRadius, clouds)
            .then((cloudsMesh) => {
                cloudsMeshRef.current = cloudsMesh;
                earthObject.scene().add(cloudsMesh);

                animateCloudLayer(cloudsMeshRef, CLOUDS_ROTATION_SPEED); // Use the modularized animation function
            })
            .catch((error) => console.error('Error loading cloud texture:', error));

        return () => {
            if (cloudsMeshRef.current) {
                earthObject.scene().remove(cloudsMeshRef.current);
                cleanupCloudLayerMesh(cloudsMeshRef.current);
                cloudsMeshRef.current = null;
            }
        };
    }, [earthObject, globeRadius]);

    return cloudsMeshRef;
};

export default useCloudLayer;
