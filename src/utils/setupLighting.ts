import { Scene, AmbientLight, DirectionalLight } from "three";

/**
 * Sets up and adds lighting to a Three.js Scene.
 *
 * @param scene - The Scene to which lighting will be added.
 */
export function setupLighting(scene: Scene): void {
    const ambientLight = new AmbientLight(0xbbbbbb, 0.5);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 200, 400); // Position the light
    scene.add(directionalLight);
}
