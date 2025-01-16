import { PerspectiveCamera } from "three";

/*
*
* Configures the Three.js camera for the Earth animation.
* Sets the camera's position, orientation, and projection matrix.
*
*/
const useConfigureCamera = (camera: PerspectiveCamera | undefined) => {
    if (!camera) {
        console.warn("Camera is undefined. Skipping configuration.");
        return;
    }

    /*
    *
    * Sets the camera's position in 3D space.
    *
    */
    const CAMERA_POSITION = { x: 0, y: 0, z: 275 }; // Default camera distance

    camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);

    /*
    *
    * Orient the camera to face the center of the globe.
    *
    */
    camera.lookAt(0, 0, 0);

    /*
    *
    * Update the camera's projection matrix after changes.
    *
    */
    camera.updateProjectionMatrix();
};

export default useConfigureCamera;
