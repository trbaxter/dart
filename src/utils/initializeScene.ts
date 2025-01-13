import { Scene, Color } from "three";

/**
 * Initializes and configures a Three.js Scene.
 *
 * @returns The configured Scene instance.
 */
export function initializeScene(): Scene {
    const scene = new Scene();

    // Set background color
    scene.background = new Color(0x000000);

    return scene;
}
