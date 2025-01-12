import React from 'react';
import './styles/global.css'; // We'll create a global CSS file later

const App: React.FC = () => {
    return (
        <div style={{ height: '100vh', background: 'black', overflow: 'hidden' }}>
            <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '20%' }}>
                3D Rotating Earth Animation Coming Soon!
            </h1>
        </div>
    );
};

export default App;
