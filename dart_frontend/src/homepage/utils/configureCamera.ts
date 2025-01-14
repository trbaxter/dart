const configureCamera = (camera: any) => {
    if (!camera) return;

    // Set camera position
    camera.position.set(0, 0, 250);

    // Orient camera to look at the globe's center
    camera.lookAt(0, 0, 0);

    // Update the projection matrix
    camera.updateProjectionMatrix();
};

export default configureCamera;
