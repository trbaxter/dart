import { useEffect } from 'react';
import { WebGLRenderer, PerspectiveCamera } from 'three';

const useResizeHandler = (globeObj: any) => {
    useEffect(() => {
        if (!globeObj) return;

        const renderer: WebGLRenderer = globeObj.renderer();
        const camera: PerspectiveCamera = globeObj.camera();

        const onResize = () => {

            // Update camera aspect ratio & projection matrix
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            // Update renderer size
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Update controls to ensure smooth animations
            const controls = globeObj.controls?.();
            if (controls) { controls.update(); }
        };

        // Attach resize event listener
        window.addEventListener('resize', onResize);

        // Initial resize
        onResize();

        // Cleanup on unmount
        return () => { window.removeEventListener('resize', onResize); };
    }, [globeObj]);
};

export default useResizeHandler;