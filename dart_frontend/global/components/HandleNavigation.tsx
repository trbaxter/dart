import { usePageTransitions } from '../hooks/usePageTransitions';
import { useLocation } from 'react-router-dom';


function Navigation() {
    const handleNavigation = usePageTransitions();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav>
            <button
                onClick={() => !isActive('/') && handleNavigation('/')}
                style={{
                    background: 'none',
                    color: 'white',
                    border: 'none',
                    pointerEvents: isActive('/dart/') ? 'none' : 'auto',
                    cursor: isActive('/dart/') ? 'default' : 'pointer'
                }}
            >
                Homepage
            </button>
            <button
                onClick={() => !isActive('/ai') && handleNavigation('/ai')}
                style={{
                    background: 'none',
                    color: 'white',
                    border: 'none',
                    pointerEvents: isActive('/dart/ai') ? 'none' : 'auto',
                    cursor: isActive('/dart/ai') ? 'default' : 'pointer'
                }}
            >
                DART AI
            </button>
        </nav>
    );
}

export default Navigation;