import { Mesh, Material } from 'three';

/**
 * Cleans up a Three.js mesh by disposing of its geometry and material.
 *
 * @param mesh - The mesh to be cleaned up.
 */
export const cleanupCloudLayerMesh = (mesh: Mesh | null): void => {
    if (mesh) {
        // Dispose of the geometry
        mesh.geometry.dispose();

        // Dispose of the material, ensuring it's a valid Three.js material
        if (mesh.material instanceof Material) {
            mesh.material.dispose();
        }
    }
};
