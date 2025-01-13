import { FC, useRef } from "react";
import { useThreeScene } from "../../hooks/useThreeScene.ts";
import { useGlobeSetup } from "../../hooks/useGlobeSetup.ts";
import { Object3D, PerspectiveCamera } from "three";

const Globe: FC<{ isRotating?: boolean }> = ({ isRotating = true }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { sceneRef } = useThreeScene({
        containerRef,
        onAnimate: handleAnimate,
        onCameraSetup: (camera: PerspectiveCamera) => {
            camera.position.set(0, 0, 400);
            camera.lookAt(0, 0, 0);
        },
    });

    useGlobeSetup(sceneRef, isRotating)

    function handleAnimate() {
        if (isRotating && sceneRef.current) {
            const globe = sceneRef.current.children.find((child) => child.name === "Globe") as Object3D;
            if (globe) globe.rotation.y -= 0.001;
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
