import {MutableRefObject, RefObject, useEffect, useRef} from "react";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { initializeRenderer } from "../utils/initializeRenderer";
import { initializeScene } from "../utils/initializeScene";
import { initializeCamera } from "../utils/initializeCamera";
import { setupLighting } from "../utils/setupLighting";
import { resizeHandler } from "../utils/resizeHandler";
import { cleanupRenderer } from "../utils/cleanupRenderer";

interface UseThreeSceneProps {
    containerRef: RefObject<HTMLDivElement>;
    onAnimate?: (time: number, deltaTime: number) => void;
    onCameraSetup?: (camera: PerspectiveCamera) => void;
}

export function useThreeScene({ containerRef, onAnimate, onCameraSetup }: UseThreeSceneProps) {
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = initializeRenderer(containerRef);
        rendererRef.current = renderer;

        const scene = initializeScene();
        sceneRef.current = scene;

        const camera = initializeCamera(scene);
        if (onCameraSetup) {
            onCameraSetup(camera);
        }
        cameraRef.current = camera;

        setupLighting(scene);

        // Start the animation loop
        startAnimationLoop({
            renderer,
            scene,
            camera,
            onAnimate,
            animationFrameIdRef,
        });

        const handleResize = () => resizeHandler(renderer, camera);
        window.addEventListener("resize", handleResize);

        // Cleanup logic
        return () => {
            stopAnimationLoop(animationFrameIdRef); // Stop the animation loop
            cleanupRenderer(renderer, containerRef); // Dispose of the renderer
            window.removeEventListener("resize", handleResize);
        };
    }, [containerRef, onAnimate, onCameraSetup]);

    // HMR Cleanup
    if (import.meta.hot) {
        import.meta.hot.dispose(() => {
            console.log("Cleaning up animation loop on HMR...");
            stopAnimationLoop(animationFrameIdRef); // Stop any ongoing animation loop
        });
    }

    return {
        rendererRef,
        sceneRef,
        cameraRef,
    };
}

function startAnimationLoop({
                                renderer,
                                scene,
                                camera,
                                onAnimate,
                                animationFrameIdRef,
                            }: {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    onAnimate?: (time: number, deltaTime: number) => void;
    animationFrameIdRef: MutableRefObject<number | null>;
}) {
    let previousTime = performance.now();

    const animate = (currentTime: number) => {
        const deltaTime = currentTime - previousTime;
        previousTime = currentTime;

        onAnimate?.(currentTime, deltaTime);

        renderer.render(scene, camera);

        animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Cancel any previous animation loop before starting a new one
    if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
    }

    animationFrameIdRef.current = requestAnimationFrame(animate);
}

function stopAnimationLoop(animationFrameIdRef: MutableRefObject<number | null>) {
    if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
    }
}
