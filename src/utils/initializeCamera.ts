import { PerspectiveCamera, Scene } from "three";

/**
 * Initializes and configures a PerspectiveCamera.
 *
 * @param scene - The Scene to which the camera will be added.
 * @param fov - Field of view for the camera (default is 40).
 * @param near - Near clipping plane (default is 0.1).
 * @param far - Far clipping plane (default is 3000).
 * @returns The configured PerspectiveCamera instance.
 */
export function initializeCamera(
    scene: Scene,
    fov: number = 40,
    near: number = 5,
    far: number = 1000
): PerspectiveCamera {
    const camera = new PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        near,
        far
    );

    camera.position.set(0, 0, 400);
    scene.add(camera);
    return camera;
}
