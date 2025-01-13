import { WebGLRenderer, PerspectiveCamera } from "three";

/**
 * Handles window resize events for a Three.js scene.
 *
 * @param renderer - The WebGLRenderer instance to resize.
 * @param camera - The PerspectiveCamera to update.
 */
export function resizeHandler(renderer: WebGLRenderer, camera: PerspectiveCamera): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
