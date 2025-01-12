import { FC, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const Earth: FC = () => {
    const earthRef = useRef<Mesh>(null);

    const [colorMap, normalMap, specularMap] = useLoader(TextureLoader, [
        'src/assets/textures/earth/day_map/8k.jpg',
        'src/assets/textures/earth/night_map/8k.jpg',
        'src/assets/textures/earth/specular_map/8k.jpg',
    ]);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[1, 64, 64]} />

            <meshPhongMaterial
                map={colorMap}            // Base color
                normalMap={normalMap}     // Surface bumps and details
                specularMap={specularMap} // Simulated water reflections
                shininess={10}            // Adjust shininess for realism
            />
        </mesh>
    );
};

export default Earth;
