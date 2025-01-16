import { Mesh, MeshPhongMaterial } from "three";

/*
*
* Cleans up the cloud layer mesh to release resources.
* Ensures the mesh and its materials are properly disposed of.
*
*/
const cleanupCloudLayerMesh = (mesh: Mesh | null): void => {
    if (mesh) {
        // Dispose of the geometry to free GPU resources
        mesh.geometry.dispose();

        // Dispose of the material if it is a MeshPhongMaterial
        if (mesh.material instanceof MeshPhongMaterial) {
            mesh.material.dispose();
        }
    }
};

export default cleanupCloudLayerMesh;
