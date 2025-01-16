import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/*
*
* Configures the OrbitControls for the Earth animation.
* Disables user interaction and enables automatic rotation.
*
*/
const useConfigureControls = (controls: OrbitControls | undefined) => {
    if (!controls) {
        console.warn("OrbitControls are undefined. Skipping configuration.");
        return;
    }

    /*
    *
    * Enable automatic rotation for the globe.
    * The rotation speed is adjustable via `autoRotateSpeed`.
    *
    */
    const AUTO_ROTATE_SPEED = 0.35; // Speed of autorotation
    controls.autoRotate = true;
    controls.autoRotateSpeed = AUTO_ROTATE_SPEED;

    /*
    *
    * Disable all user interactions to keep the animation passive.
    * This ensures no zooming, panning, or manual rotation is allowed.
    *
    */
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    /*
    *
    * Ensure the controls update as the scene renders.
    *
    */
    controls.update();
};

export default useConfigureControls;
