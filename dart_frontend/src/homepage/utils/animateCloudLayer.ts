import { Mesh } from 'three';
import {MutableRefObject} from "react";

const animateCloudLayer = (meshRef: MutableRefObject<Mesh | null>, rotationSpeed: number) => {
    let lastTime = 0;

    const animate = (currentTime: number) => {
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed * delta;
        }

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};

export default animateCloudLayer;
