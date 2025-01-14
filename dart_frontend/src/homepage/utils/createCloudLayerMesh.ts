import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

const createCloudLayerMesh = (globeRadius: number, texturePath: string): Promise<Mesh> => {
    const CLOUDS_ALTITUDE = 0.004;
    return new Promise((resolve, reject) => {
        const textureLoader = new TextureLoader();
        textureLoader.load(
            texturePath,
            (cloudsTexture) => {
                const cloudsMesh = new Mesh(
                    new SphereGeometry(globeRadius * (1 + CLOUDS_ALTITUDE), 50, 50),
                    new MeshPhongMaterial({ map: cloudsTexture, transparent: true })
                );
                resolve(cloudsMesh);
            },
            undefined, // onProgress
            (error) => reject(error)
        );
    });
};

export default createCloudLayerMesh;
