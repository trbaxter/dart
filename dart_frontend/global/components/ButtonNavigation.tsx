import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Use React Router's `useNavigate`
import '../assets/css/navigation.css';

function Navigation() {
    const location = useLocation();
    const navigate = useNavigate(); // React Router's navigation function
    const [activePath, setActivePath] = useState(location.pathname);

    const handleNavigation = (path: string) => {
        if (path === activePath) return;

        // Start the fade-to-black transition
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.classList.replace('hidden', 'visible');

        // Update the active button 750ms after the fade-to-black starts
        setTimeout(() => {
            setActivePath(path); // Update the active navigation button
        }, 750);

        // After 1000ms, navigate to the new page and fade-in
        setTimeout(() => {
            if (overlay) overlay.classList.replace('visible', 'hidden');
            navigate(path); // Navigate to the new page
        }, 1000);
    };

    const isActive = (path: string) => activePath === path;

    return (
        <nav>
            <button
                onClick={() => handleNavigation('/')}
                className={`nav-button ${isActive('/') ? 'active' : ''}`}
            >
                Homepage
            </button>
            <button
                onClick={() => handleNavigation('/ai')}
                className={`nav-button ${isActive('/ai') ? 'active' : ''}`}
            >
                DART AI
            </button>
        </nav>
    );
}

export default Navigation;
