import {Mesh, MeshPhongMaterial, SphereGeometry, Texture, TextureLoader} from 'three';

/**
 * Utility function to load a texture asynchronously.
 *
 * @param texturePath - The path to the texture image.
 * @returns A promise resolving to the loaded texture.
 */
const loadTexture = async (texturePath: string): Promise<Texture> => {
  return new Promise((resolve, reject) => {
    const textureLoader = new TextureLoader();
    textureLoader.load(
      texturePath,
      (texture) => resolve(texture),
      undefined,
      (error) => reject(new Error(`Failed to load texture from ${texturePath}: ${error}`))
    );
  });
};

/**
 * Creates a cloud layer mesh for the globe.
 *
 * @param radius - The radius of the cloud layer.
 * @param texturePath - The path to the cloud texture image.
 * @returns A `Mesh` representing the cloud layer.
 */
export const createCloudLayerMesh = async (
  radius: number,
  texturePath: string
): Promise<Mesh<SphereGeometry, MeshPhongMaterial>> => {
  const CLOUDS_ALTITUDE = 0.005;

  const cloudsTexture = await loadTexture(texturePath);

  return new Mesh(
    new SphereGeometry(radius * (1 + CLOUDS_ALTITUDE), 50, 50),
    new MeshPhongMaterial({map: cloudsTexture, transparent: true})
  );
};
