import { RefObject } from "react";
import { WebGLRenderer } from "three";

/**
 * Initializes and configures a WebGLRenderer.
 *
 * @param containerRef - Ref to the container DOM element for the renderer.
 * @returns The configured WebGLRenderer instance.
 */
export function initializeRenderer(containerRef: RefObject<HTMLDivElement>): WebGLRenderer {
    const renderer = new WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


    if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
    }

    return renderer;
}
