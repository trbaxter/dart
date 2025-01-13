import { Scene, AmbientLight, DirectionalLight } from "three";

/**
 * Sets up and adds lighting to a Three.js Scene.
 *
 * @param scene - The Scene to which lighting will be added.
 * @param options - Optional parameters for lighting customization.
 */
export function setupLighting(
    scene: Scene,
    options: {
        ambientColor?: number;
        ambientIntensity?: number;
        directionalColor?: number;
        directionalIntensity?: number;
        directionalPosition?: [number, number, number];
    } = {}
): void {
    const ambientLight = new AmbientLight(
        options.ambientColor ?? 0xbbbbbb,
        options.ambientIntensity ?? 0.5
    );
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(
        options.directionalColor ?? 0xffffff,
        options.directionalIntensity ?? 1
    );
    directionalLight.position.set(
        ...(options.directionalPosition ?? [200, 200, 400])
    );
    scene.add(directionalLight);
}
