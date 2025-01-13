import { RefObject, useEffect, useRef } from "react";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { initializeRenderer } from "../utils/initializeRenderer";
import { initializeScene } from "../utils/initializeScene";
import { initializeCamera } from "../utils/initializeCamera";
import { setupLighting } from "../utils/setupLighting";
import { resizeHandler } from "../utils/resizeHandler";
import { cleanupRenderer } from "../utils/cleanupRenderer";

interface UseThreeSceneProps {
    containerRef: RefObject<HTMLDivElement | null>;
    onAnimate?: (time: number, deltaTime: number) => void;
    onCameraSetup?: (camera: PerspectiveCamera) => void;
}

export function useThreeScene({ containerRef, onAnimate, onCameraSetup }: UseThreeSceneProps) {
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    let animationFrameId: number | null = null;

    useEffect(() => {
        if (!containerRef.current) {
            console.error("Container ref is null. Renderer initialization skipped.");
            return;
        }

        try {
            const renderer = initializeRenderer(containerRef);
            rendererRef.current = renderer;

            const scene = initializeScene();
            sceneRef.current = scene;

            const camera = initializeCamera(scene);
            onCameraSetup?.(camera);
            cameraRef.current = camera;

            setupLighting(scene);

            const startAnimationLoop = () => {
                let previousTime = performance.now();

                const animate = (currentTime: number) => {
                    const deltaTime = currentTime - previousTime;
                    previousTime = currentTime;

                    onAnimate?.(currentTime, deltaTime);

                    renderer.render(scene, camera);
                    animationFrameId = requestAnimationFrame(animate);
                };

                animationFrameId = requestAnimationFrame(animate);
            };

            startAnimationLoop();

            const handleResize = () => resizeHandler(renderer, camera);
            window.addEventListener("resize", handleResize);

            return () => {
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                }

                cleanupRenderer(renderer, containerRef);
                window.removeEventListener("resize", handleResize);
            };
        } catch (error) {
            console.error("Error in useThreeScene:", error);
        }
    }, [containerRef, onAnimate, onCameraSetup]);

    return {
        rendererRef,
        sceneRef,
        cameraRef,
    };
}
