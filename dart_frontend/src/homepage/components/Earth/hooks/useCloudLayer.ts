import { useEffect, useRef, MutableRefObject } from "react";
import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader, Clock } from "three";
import clouds from "../assets/clouds.png";
import { GlobeMethods } from "react-globe.gl";
import cleanupCloudLayerMesh from "../utils/cleanupCloudLayerMesh";

/*
*
* Adds and manages a rotating cloud layer around a globe.
* Centralized to the Earth homepage animation.
*
*/
const useCloudLayer = (earthObject: GlobeMethods | undefined): MutableRefObject<Mesh | null> => {
    /*
    *
    * Reference to the cloud layer mesh object
    * Initialized to `null` and updated when the cloud layer is created
    *
    */
    const cloudsMeshRef = useRef<Mesh | null>(null);

    /*
    *
    * Creates the cloud layer mesh with specified radius and texture.
    * Uses a Promise to handle the texture-loading process asynchronously.
    *
    */
    const createCloudLayerMesh = (
        radius: number,
        texturePath: string
    ): Promise<Mesh<SphereGeometry, MeshPhongMaterial>> => {
        const CLOUDS_ALTITUDE = 0.005; // Slightly above the globe surface

        return new Promise((resolve, reject) => {
            const textureLoader = new TextureLoader();

            textureLoader.load(
                texturePath,
                (texture) => {
                    try {
                        const mesh = new Mesh(
                            new SphereGeometry(radius * (1 + CLOUDS_ALTITUDE), 50, 50),
                            new MeshPhongMaterial({ map: texture, transparent: true })
                        );
                        resolve(mesh);
                    } catch (error) {
                        reject(new Error(`Error creating cloud layer mesh: ${(error as Error).message}`));
                    }
                },
                undefined,
                () => reject(new Error(`Failed to load cloud texture.`))
            );
        });
    };

    /*
    *
    * Animates the cloud layer by continuously rotating it.
    * Uses Three.js `Clock` for precise delta-time calculations.
    *
    */
    const animateCloudLayer = (meshRef: MutableRefObject<Mesh | null>, rotationSpeed: number) => {
        const clock = new Clock();

        const animate = () => {
            const delta = clock.getDelta(); // Time elapsed since the last frame
            if (meshRef.current) {
                meshRef.current.rotation.y += rotationSpeed * delta;
            }
            requestAnimationFrame(animate); // Schedule the next frame
        };

        requestAnimationFrame(animate); // Start the animation loop
    };

    /*
    *
    * Main effect to initialize and manage the cloud layer.
    * Handles creation, animation, and cleanup of the cloud layer.
    *
    */
    useEffect(() => {
        if (!earthObject) return;

        const radius = earthObject.getGlobeRadius?.();
        if (!radius) {
            console.error("Failed to retrieve globe radius.");
            return;
        }

        const CLOUDS_ROTATION_SPEED = -0.0006; // Negative value for clockwise rotation

        createCloudLayerMesh(radius, clouds)
            .then((cloudsMesh) => {
                cloudsMeshRef.current = cloudsMesh;
                earthObject.scene().add(cloudsMesh); // Add to the scene
                animateCloudLayer(cloudsMeshRef, CLOUDS_ROTATION_SPEED); // Start animation
            })
            .catch((error) => console.error("Error creating cloud layer:", error));

        return () => {
            if (cloudsMeshRef.current) {
                earthObject.scene().remove(cloudsMeshRef.current); // Remove from the scene
                cleanupCloudLayerMesh(cloudsMeshRef.current); // Call the external cleanup function
                cloudsMeshRef.current = null;
            }
        };
    }, [earthObject]);

    return cloudsMeshRef;
};

export default useCloudLayer;
