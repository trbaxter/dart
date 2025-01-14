import { Material, Mesh } from 'three';

const cleanupCloudLayerMesh = (mesh: Mesh | null) => {
    if (mesh) {
        mesh.geometry.dispose();
        if (mesh.material instanceof Material) {
            mesh.material.dispose();
        }
    }
};

export default cleanupCloudLayerMesh;
