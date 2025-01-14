const configureControls = (controls: any, autoRotateSpeed: number) => {
    if (!controls) return;

    controls.autoRotate = true;
    controls.autoRotateSpeed = autoRotateSpeed;

    // Disable camera interaction
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
};

export default configureControls;
