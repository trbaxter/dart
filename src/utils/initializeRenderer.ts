import { RefObject } from "react";
import { WebGLRenderer } from "three";

/**
 * Initializes and configures a WebGLRenderer.
 *
 * @param containerRef - Ref to the container DOM element for the renderer.
 * @param options - Optional renderer settings (e.g., antialias, logarithmicDepthBuffer).
 * @returns The configured WebGLRenderer instance.
 */
export function initializeRenderer(
    containerRef: RefObject<HTMLDivElement | null>,
    options: { antialias?: boolean; logarithmicDepthBuffer?: boolean } = {}
): WebGLRenderer {
    if (!containerRef.current) {
        throw new Error("Container ref is null. Cannot initialize WebGLRenderer.");
    }

    // Check if a canvas already exists in the container
    const existingCanvas = containerRef.current.querySelector("canvas");
    if (existingCanvas) {
        console.warn("A canvas already exists in the container. Reusing the existing canvas.");
        return new WebGLRenderer({
            antialias: options.antialias ?? true,
            logarithmicDepthBuffer: options.logarithmicDepthBuffer ?? false,
            canvas: existingCanvas as HTMLCanvasElement, // Reuse the existing canvas
        });
    }

    // Create a new renderer and append its canvas
    const renderer = new WebGLRenderer({
        antialias: options.antialias ?? true,
        logarithmicDepthBuffer: options.logarithmicDepthBuffer ?? false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerRef.current.appendChild(renderer.domElement);

    return renderer;
}
