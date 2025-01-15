import { useEffect, useRef, useState, MutableRefObject } from 'react';
import {Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader, Material, PerspectiveCamera} from 'three';
import clouds from '../../../assets/clouds.png';
import { GlobeMethods } from "react-globe.gl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Adds and manages a rotating cloud layer around a globe object.
 *
 * @param earthObject - The Earth globe from Earth.tsx or `undefined` if uninitialized.
 * @returns A ref object containing the cloud layer mesh (`Mesh`) or `null` if not yet initialized.
 */
const useCloudLayer = (earthObject: GlobeMethods | undefined): MutableRefObject<Mesh | null> => {

    // Assign reference to Mesh instance with initial null value
    const cloudsMeshRef = useRef<Mesh | null>(null);
    const [globeRadius, setGlobeRadius] = useState<number | null>(null);

    // Private helper: Configure the camera
    const configureCamera = (camera: PerspectiveCamera | undefined) => {

        // Safety check in case of invalid/undefined camera
        if (!camera) return;

        // Set camera position and orientation
        camera.position.set(0, 0, 250);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    };

    // Private helper: Configure the controls
    const configureControls = (controls: OrbitControls | undefined) => {

        // Safety check in case of invalid/undefined orbit controls
        if (!controls) return;

        // Set autorotation and speed
        const AUTO_ROTATE_SPEED = 0.35;
        controls.autoRotate = true;
        controls.autoRotateSpeed = AUTO_ROTATE_SPEED;

        // Disable user interaction
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = false;
    };

    // Private helper: Remove unwanted DOM elements
    const removeUnwantedElements = () => {
        const unwantedSelectors = [
            '.scene-nav-info',
            '.float-tooltip-kap',
            'div[style*="overflow: hidden"]',
        ];

        unwantedSelectors.forEach((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.remove();
            }
        });
    };

    /**
     * Creates a cloud layer mesh for the globe.
     *
     * @param radius - The radius of the cloud layer.
     * @param texturePath - The path to the cloud texture image.
     * @returns A promise resolving to a `Mesh` representing the cloud layer.
     */
    const createCloudLayerMesh = (
        radius: number,
        texturePath: string ):

        // Uses promise to load cloud layer only once texture is ready
        Promise<Mesh<SphereGeometry, MeshPhongMaterial>> => {
        const CLOUDS_ALTITUDE = 0.004;

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

    // Private helper: Animate the cloud layer
    const animateCloudLayer = (
        meshRef: MutableRefObject<Mesh | null>,
        rotationSpeed: number) => {

        // Tracks last timestamp for frame-by-frame animation
        let lastTime = 0;

        const animate = (currentTime: number) => {
            const delta = (currentTime - lastTime) / 1000;  // Convert delta to seconds
            lastTime = currentTime;

            if (meshRef.current) {
                meshRef.current.rotation.y += rotationSpeed * delta;  // Increment the y-rotation of the mesh
            }

            requestAnimationFrame(animate);  // Schedule the next frame

        };

        requestAnimationFrame(animate);  // Start the animation loop
    };

    // Private helper: Cleanup the cloud layer mesh
    const cleanupCloudLayerMesh = (mesh: Mesh | null) => {
        if (mesh) {
            mesh.geometry.dispose();
            if (mesh.material instanceof Material) {
                mesh.material.dispose();
            }
        }
    };

    // Fetch the globe's radius
    useEffect(() => {
        if (!earthObject) return;

        const radius = earthObject.getGlobeRadius?.();
        if (typeof radius === 'number') {
            setGlobeRadius(radius);
        } else {
            console.error('Failed to get globe radius.');
        }
    }, [earthObject]);

    // Initialize and manage the globe and cloud layer
    useEffect(() => {
        if (!earthObject) return;

        // Configure globe controls and camera
        const controls = earthObject.controls?.();
        configureControls(controls);

        const camera = earthObject.camera?.() as PerspectiveCamera;
        configureCamera(camera);

        // Remove unwanted DOM elements
        removeUnwantedElements();

        if (globeRadius === null) return;

        const CLOUDS_ROTATION_SPEED = -0.0006;

        // Initialize the cloud layer
        createCloudLayerMesh(globeRadius, clouds)
            .then((cloudsMesh) => {
                cloudsMeshRef.current = cloudsMesh;
                earthObject.scene().add(cloudsMesh);

                // Start the animation
                animateCloudLayer(cloudsMeshRef, CLOUDS_ROTATION_SPEED);
            })
            .catch((error) => console.error('Error loading cloud texture:', error));

        // Cleanup on component unmount
        return () => {
            removeUnwantedElements();
            if (cloudsMeshRef.current) {
                earthObject.scene().remove(cloudsMeshRef.current);
                cleanupCloudLayerMesh(cloudsMeshRef.current);
                cloudsMeshRef.current = null;
            }
        };
    }, [earthObject, globeRadius]);

    return cloudsMeshRef;
};

export default useCloudLayer;
