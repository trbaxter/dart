import {RefObject, useEffect} from "react";
import { Object3D, Scene } from "three";
import { globeSetup } from "../three/globeSetup";

/**
 * A custom hook to set up the globe in the Three.js scene.
 *
 * @param sceneRef - Ref to the Three.js scene.
 * @param isRotating - Whether the globe should be rotating.
 */
export const useGlobeSetup = (
    sceneRef: RefObject<Scene | null>,
    isRotating: boolean
) => {
    useEffect(() => {
        if (!sceneRef.current) return; // Safely handle the null case

        const globe: Object3D = globeSetup(sceneRef.current);
        globe.name = "Globe"; // Add a unique identifier to locate the globe

        return () => {
            if (sceneRef.current) {
                sceneRef.current.remove(globe);
            }
        };
    }, [sceneRef, isRotating]);
};
