import { PerspectiveCamera, Scene } from "three";

/**
 * Initializes and configures a PerspectiveCamera.
 *
 * @param scene - The Scene to which the camera will be added.
 * @param options - Optional parameters for camera configuration.
 * @returns The configured PerspectiveCamera instance.
 */
export function initializeCamera(
    scene: Scene,
    options: {
        fov?: number;
        near?: number;
        far?: number;
        position?: [number, number, number];
    } = {}
): PerspectiveCamera {
    const camera = new PerspectiveCamera(
        options.fov ?? 40,
        window.innerWidth / window.innerHeight,
        options.near ?? 5,
        options.far ?? 1000
    );

    camera.position.set(...(options.position ?? [0, 0, 400]));
    scene.add(camera);

    return camera;
}
