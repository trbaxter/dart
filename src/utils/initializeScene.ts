import { Scene, Color } from "three";

/**
 * Initializes and configures a Three.js Scene.
 *
 * @returns The configured Scene instance.
 */
export function initializeScene(): Scene {
    const scene = new Scene();
    scene.background = new Color(0x000000);

    return scene;
}
