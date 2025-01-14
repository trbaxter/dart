import { useEffect } from 'react';
import configureCamera from '../utils/configureCamera';
import configureControls from '../utils/configureControls';
import removeUnwantedElements from '../utils/removeUnwantedElements';

export const useGlobeSetup = (globeObj: any, autoRotateSpeed = 0.35) => {
    useEffect(() => {
        if (!globeObj) return;

        const controls = globeObj.controls?.();
        configureControls(controls, autoRotateSpeed);

        const camera = globeObj.camera?.();
        configureCamera(camera);

        // Remove unwanted elements
        removeUnwantedElements();

        // Cleanup on component unmount
        return () => {
            removeUnwantedElements();
        };
    }, [globeObj, autoRotateSpeed]);
};

export default useGlobeSetup;
