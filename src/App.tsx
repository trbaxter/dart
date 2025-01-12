import React from 'react';
import { Canvas } from '@react-three/fiber';
import Earth from './components/Earth';
import SpaceBackground from "./components/SpaceBackground";
import { OrbitControls } from "@react-three/drei";
import './styles/global.css';

const App: React.FC = () => {
    return (
        <div style={{ height: '100vh', width: '100vw', background: 'black', overflow: 'hidden' }}>
            <Canvas>
                <ambientLight intensity={1} />
                <pointLight position={[5, 5, 5]} intensity={1}/>

                <SpaceBackground />
                <Earth />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default App;
