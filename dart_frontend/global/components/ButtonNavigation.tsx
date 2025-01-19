import { pageTransitions } from '../utils/pageTransitions.ts';
import { useLocation } from 'react-router-dom';
import '../assets/css/navigation.css';

function Navigation() {
    const handleNavigation = pageTransitions();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav>
            <button
                onClick={() => !isActive('/') && handleNavigation('/')}
                className={`nav-button ${isActive('/') ? 'active' : ''}`}
            >
                &thinsp;Homepage
            </button>
            <button
                onClick={() => !isActive('/ai') && handleNavigation('/ai')}
                className={`nav-button ${isActive('/ai') ? 'active' : ''}`}
            >
                &thinsp;DART AI
            </button>
        </nav>
    );
}

export default Navigation;
