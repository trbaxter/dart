import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Configures the controls for the globe animation.
 *
 * @param controls - The OrbitControls instance to configure.
 */
export const configureControls = (controls: OrbitControls | undefined): void => {
    if (!controls) return;

    const AUTO_ROTATE_SPEED = 0.35;
    controls.autoRotate = true;
    controls.autoRotateSpeed = AUTO_ROTATE_SPEED;

    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
};
