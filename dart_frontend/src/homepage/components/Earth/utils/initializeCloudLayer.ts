import { MutableRefObject } from 'react';
import { Mesh, PerspectiveCamera } from 'three';
import { GlobeMethods } from 'react-globe.gl';
import { configureCamera } from './configureCamera';
import { configureControls } from './configureControls';
import { createCloudLayerMesh } from './createCloudLayerMesh';
import { cleanupCloudLayerMesh } from './cleanupCloudLayerMesh';
import { animateCloudLayer } from './animateCloudLayer';

/**
 * Initializes and manages the globe and cloud layer.
 *
 * @param earthObject - The Earth globe object from the parent component.
 * @param globeRadius - The radius of the globe.
 * @param cloudsMeshRef - A ref object containing the cloud layer mesh.
 * @param cloudTexturePath - The path to the cloud texture image.
 */
export const initializeCloudLayer = (
    earthObject: GlobeMethods,
    globeRadius: number,
    cloudsMeshRef: MutableRefObject<Mesh | null>,
    cloudTexturePath: string
): (() => void) => {
    const controls = earthObject.controls?.();
    configureControls(controls);

    const camera = earthObject.camera?.() as PerspectiveCamera;
    configureCamera(camera);

    const CLOUDS_ROTATION_SPEED = -0.0006;

    createCloudLayerMesh(globeRadius, cloudTexturePath)
        .then((cloudsMesh) => {
            cloudsMeshRef.current = cloudsMesh;
            earthObject.scene().add(cloudsMesh);

            animateCloudLayer(cloudsMeshRef, CLOUDS_ROTATION_SPEED);
        })
        .catch((error) => console.error('Error loading cloud texture:', error));

    // Return cleanup function
    return () => {
        if (cloudsMeshRef.current) {
            earthObject.scene().remove(cloudsMeshRef.current);
            cleanupCloudLayerMesh(cloudsMeshRef.current);
            cloudsMeshRef.current = null;
        }
    };
};
