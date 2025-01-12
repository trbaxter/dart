import React from 'react';
import {BackSide, TextureLoader} from 'three';
import { useLoader } from '@react-three/fiber';

const SpaceBackground: React.FC = () => {
    // Load the space texture
    const spaceTexture = useLoader(TextureLoader, 'src/assets/textures/stars/8k_stars.jpg');

    return (
        <mesh>
            {/* Large sphere geometry for the background */}
            <sphereGeometry args={[100, 64, 64]} />

            {/* Inward-facing material */}
            <meshBasicMaterial
                map={spaceTexture}
                side={BackSide} // Render the texture inside the sphere
            />
        </mesh>
    );
};

export default SpaceBackground;
