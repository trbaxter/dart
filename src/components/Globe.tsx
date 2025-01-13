import {FC, useEffect, useRef} from "react";
import {useThreeScene} from "../hooks/useThreeScene";
import {globeSetup} from "../three/globeSetup";
import {Object3D} from "three";
import {cullInvisibleObjects} from "../utils/cullInvisibleObjects.ts";

const Globe: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<Object3D | null>(null);

    const { sceneRef, cameraRef } = useThreeScene({
        containerRef,
        onAnimate: handleAnimate,
    });

    useEffect(() => {
        if (sceneRef.current) {
            globeRef.current = globeSetup(sceneRef.current); // Store the globe instance
        }

        if (cameraRef.current) {
            cameraRef.current.position.set(0, 0, 400);
            cameraRef.current.lookAt(0, 0, 0);
        }
    }, [sceneRef, cameraRef]);

    function handleAnimate() {
        if (cameraRef.current && globeRef.current) {
            cullInvisibleObjects(cameraRef.current, globeRef.current);
        }

        if (globeRef.current) {

            globeRef.current.rotation.y -= 0.001;
        }
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        />
    );
};

export default Globe;
