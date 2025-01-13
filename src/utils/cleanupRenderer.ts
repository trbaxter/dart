import { RefObject } from "react";
import { WebGLRenderer } from "three";

/**
 * Cleans up a WebGLRenderer by disposing of it and removing its DOM element.
 *
 * @param renderer - The WebGLRenderer to clean up.
 * @param containerRef - Ref to the container DOM element holding the renderer.
 */
export function cleanupRenderer(
    renderer: WebGLRenderer,
    containerRef: RefObject<HTMLDivElement>
): void {
    try {
        renderer.dispose();

        if (containerRef.current) {
            while (containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
        }
    } catch (error) {
        console.error("Failed to clean up renderer:", error);
    }
}
