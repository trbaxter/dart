import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../assets/css/navigation.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    if (path === activePath) return;

    // Start the fade-to-black transition
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.replace('hidden', 'visible');

    setTimeout(() => {
      setActivePath(path);
    }, 750);

    setTimeout(() => {
      if (overlay) overlay.classList.replace('visible', 'hidden');
      navigate(path);
    }, 1000);
  };

  const isActive = (path: string) => activePath === path;

  return (
    <nav>
      <button
        onClick={() => handleNavigation('/')}
        className={`nav-button ${isActive('/') ? 'active' : ''}`}
      >
        &thinsp;Homepage
      </button>
      <button
        onClick={() => handleNavigation('/ai')}
        className={`nav-button ${isActive('/ai') ? 'active' : ''}`}
      >
        &thinsp;DART AI
      </button>
    </nav>
  );
}

export default Navigation;
