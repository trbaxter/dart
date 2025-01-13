import { FC, useEffect, useRef } from "react";
import { useThreeScene } from "../hooks/useThreeScene";
import { globeSetup } from "../three/globeSetup";
import { Object3D, PerspectiveCamera } from "three";

const Globe: FC<{ isRotating?: boolean }> = ({ isRotating = true }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<Object3D | null>(null);

    const { sceneRef } = useThreeScene({
        containerRef,
        onAnimate: handleAnimate,
        onCameraSetup: (camera: PerspectiveCamera) => {
            camera.position.set(0, 0, 400);
            camera.lookAt(0, 0, 0);
        },
    });

    useEffect(() => {
        if (sceneRef.current && !globeRef.current) {
            globeRef.current = globeSetup(sceneRef.current);
        }

        return () => {
            if (globeRef.current) {
                sceneRef.current?.remove(globeRef.current);
                globeRef.current = null;
            }
        };
    }, [sceneRef]);

    function handleAnimate() {
        if (isRotating && globeRef.current) {
            globeRef.current.rotation.y -= 0.001;
        }
    }

    return (
        <div
            ref={containerRef}
            className="globe-container"
        />
    );
};

export default Globe;
