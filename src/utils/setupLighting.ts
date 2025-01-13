import { Scene, AmbientLight, DirectionalLight } from "three";

/**
 * Sets up and adds lighting to a Three.js Scene.
 *
 * @param scene - The Scene to which lighting will be added.
 */
export function setupLighting(scene: Scene): void {
    // Add ambient light for overall illumination
    const ambientLight = new AmbientLight(0xbbbbbb, 0.3);
    scene.add(ambientLight);

    // Add directional light for focused illumination
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 200, 400); // Position the light
    scene.add(directionalLight);
}
