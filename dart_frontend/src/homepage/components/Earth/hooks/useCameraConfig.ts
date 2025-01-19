import { PerspectiveCamera } from 'three';

/**
 * Configures the camera for the globe animation.
 *
 * @param camera - The PerspectiveCamera instance to configure.
 */
export const configureCamera = (camera: PerspectiveCamera | undefined) => {
    if (!camera) return;

    camera.position.set(0, 0, 275);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
};
