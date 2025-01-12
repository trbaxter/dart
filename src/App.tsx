import React from 'react';
import { Canvas } from '@react-three/fiber';
import './styles/global.css';

const App: React.FC = () => {
    return (
        <div style={{ height: '100vh', width: '100vw', background: 'black', overflow: 'hidden' }}>
            <Canvas>
                {/* The 3D content will go here */}
            </Canvas>
        </div>
    );
};

export default App;
