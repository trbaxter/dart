import { WebGLRenderer, PerspectiveCamera } from "three";

/**
 * Handles window resize events for a Three.js scene.
 *
 * @param renderer - The WebGLRenderer instance to resize.
 * @param camera - The PerspectiveCamera to update.
 */
export function resizeHandler(renderer: WebGLRenderer, camera: PerspectiveCamera): void {
    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Resize the renderer to fit the window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);
}
