import { FC, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const Earth: FC = () => {
    const earthRef = useRef<Mesh>(null);
    const atmosphereRef = useRef<Mesh>(null);

    const [colorMap, normalMap, specularMap] = useLoader(TextureLoader, [
        'src/assets/textures/earth/day_map/8k.jpg',
        'src/assets/textures/earth/night_map/8k.jpg',
        'src/assets/textures/earth/specular_map/8k.jpg',
    ]);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.0002;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += 0.002; // Sync rotation
        }
    });

    return (
        <group>
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]}/>
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    shininess={10}
                />
            </mesh>

            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[1.025, 64, 64]}/>
                <meshBasicMaterial
                    color="lightblue"
                    transparent={true}
                    opacity={0.1}
                />
            </mesh>
        </group>
    );
};

export default Earth;
