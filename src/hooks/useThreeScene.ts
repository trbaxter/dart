import { RefObject, useEffect, useRef } from "react";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { initializeRenderer } from "../utils/initializeRenderer.ts";
import { initializeScene } from "../utils/initializeScene.ts";
import { initializeCamera } from "../utils/initializeCamera.ts";
import { setupLighting } from "../utils/setupLighting.ts";
import {resizeHandler} from "../utils/resizeHandler.ts";
import {cleanupRenderer} from "../utils/cleanupRenderer.ts";

interface UseThreeSceneProps {
    containerRef: RefObject<HTMLDivElement>;
    onAnimate?: (time: number, deltaTime: number) => void;
}

export function useThreeScene({containerRef, onAnimate}: UseThreeSceneProps) {
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = initializeRenderer(containerRef);
        rendererRef.current = renderer;

        const scene = initializeScene();
        sceneRef.current = scene;

        const camera = initializeCamera(scene);
        cameraRef.current = camera;

        setupLighting(scene);

        animationIdRef.current = startAnimationLoop({
            renderer,
            scene,
            camera,
            onAnimate,
        });

        const handleResize = () => resizeHandler(renderer, camera);
        window.addEventListener("resize", handleResize);

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            cleanupRenderer(renderer, containerRef);
            window.removeEventListener("resize", handleResize);
        };
    }, [containerRef, onAnimate]);

    return {
        rendererRef,
        sceneRef,
        cameraRef,
    };
}

function startAnimationLoop({renderer,
                             scene,
                             camera,
                             onAnimate,
                            }: {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    onAnimate?: (time: number, deltaTime: number) => void;
}): number {
    let previousTime = performance.now();

    const animate = (currentTime: number) => {
        const deltaTime = currentTime - previousTime;
        previousTime = currentTime;

        onAnimate?.(currentTime, deltaTime);

        // Render the scene
        renderer.render(scene, camera);

        // Request the next frame
        return requestAnimationFrame(animate);
    };

    return requestAnimationFrame(animate);
}
