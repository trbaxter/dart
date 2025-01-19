import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

/**
 * Creates a cloud layer mesh for the globe.
 *
 * @param radius - The radius of the cloud layer.
 * @param texturePath - The path to the cloud texture image.
 * @returns A promise resolving to a `Mesh` representing the cloud layer.
 */
export const createCloudLayerMesh = (
    radius: number,
    texturePath: string
): Promise<Mesh<SphereGeometry, MeshPhongMaterial>> => {
    const CLOUDS_ALTITUDE = 0.005;

    return new Promise((resolve, reject) => {
        const textureLoader = new TextureLoader();

        textureLoader.load(
            texturePath,
            (cloudsTexture) => {
                try {
                    const cloudsMesh = new Mesh(
                        new SphereGeometry(radius * (1 + CLOUDS_ALTITUDE), 50, 50),
                        new MeshPhongMaterial({ map: cloudsTexture, transparent: true })
                    );
                    resolve(cloudsMesh);
                } catch (error) {
                    reject(new Error(`Error creating mesh: ${error}`));
                }
            },
            (error) => reject(new Error(`Failed to load texture from ${texturePath}: ${error}`))
        );
    });
};
