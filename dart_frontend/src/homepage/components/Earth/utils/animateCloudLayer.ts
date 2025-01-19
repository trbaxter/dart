import {MutableRefObject} from 'react';
import {Mesh} from 'three';

/**
 * Animates a Three.js mesh with a rotation animation.
 *
 * @param meshRef - A reference to the mesh to animate.
 * @param rotationSpeed - The speed of the rotation (radians per second).
 */
export const animateCloudLayer = (
  meshRef: MutableRefObject<Mesh | null>,
  rotationSpeed: number
): void => {
  let lastTime = 0;

  const animate = (currentTime: number) => {
    const delta = (currentTime - lastTime) / 1000; // Convert delta to seconds
    lastTime = currentTime;

    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta; // Increment the y-rotation of the mesh
    }

    requestAnimationFrame(animate); // Schedule the next frame
  };

  requestAnimationFrame(animate); // Start the animation loop
};
