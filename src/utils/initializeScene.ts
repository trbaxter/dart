import { Scene, Color, Fog } from "three";

/**
 * Initializes and configures a Three.js Scene.
 *
 * @returns The configured Scene instance.
 */
export function initializeScene(): Scene {
    const scene = new Scene();

    // Set background color
    scene.background = new Color(0x040d21);

    // Add fog for depth effect
    scene.fog = new Fog(0x535ef3, 200, 2000);

    return scene;
}
