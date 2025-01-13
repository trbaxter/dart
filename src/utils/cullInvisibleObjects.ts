import { Frustum, Matrix4, Camera, Object3D } from "three";

/**
 * Filters visible objects within the camera's view frustum.
 *
 * @param camera - The PerspectiveCamera instance.
 * @param object - The parent Object3D containing child objects to check.
 */
export function cullInvisibleObjects(camera: Camera, object: Object3D): void {
    const frustum = new Frustum();
    const cameraViewProjectionMatrix = new Matrix4();

    // Calculate the camera's view projection matrix
    cameraViewProjectionMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

    // Iterate over the object's children and test visibility
    object.children.forEach((child) => {
        const geometry = (child as any).geometry;

        // Ensure the object's geometry has a bounding sphere
        if (geometry && !geometry.boundingSphere) {
            geometry.computeBoundingSphere();
        }

        // Set visibility based on intersection with the frustum
        child.visible = geometry && frustum.intersectsObject(child);
    });
}
