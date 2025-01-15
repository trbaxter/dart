import { useEffect, useRef, MutableRefObject } from 'react';
import { Mesh } from 'three';
import createCloudLayerMesh from '../utils/createCloudLayerMesh';
import cleanupCloudLayerMesh from '../utils/cleanupCloudLayerMesh';
import animateCloudLayer from '../utils/animateCloudLayer';
import clouds from '../assets/clouds.png';

const useCloudLayer = (globe: any, globeRadius: number | null): MutableRefObject<Mesh | null> => {
    const cloudsMeshRef = useRef<Mesh | null>(null);

    useEffect(() => {
        if (!globe || globeRadius === null) return;

        const CLOUDS_ROTATION_SPEED = -0.0006;

        // Initialize the cloud layer
        createCloudLayerMesh(globeRadius, clouds)
            .then((cloudsMesh) => {
                cloudsMeshRef.current = cloudsMesh;
                globe.scene().add(cloudsMesh);

                // Start the animation
                animateCloudLayer(cloudsMeshRef, CLOUDS_ROTATION_SPEED);
            })
            .catch((error) => console.error('Error loading cloud texture:', error));

        // Cleanup on unmount
        return () => {
            if (cloudsMeshRef.current) {
                globe.scene().remove(cloudsMeshRef.current);
                cleanupCloudLayerMesh(cloudsMeshRef.current);
                cloudsMeshRef.current = null;
            }
        };
    }, [globe, globeRadius]);

    return cloudsMeshRef;
};

export default useCloudLayer;
