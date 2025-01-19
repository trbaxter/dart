import {useNavigate} from 'react-router-dom';

export function pageTransitions() {
    const navigate = useNavigate();

    // Function to show the overlay
    const showOverlay = () => {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.classList.add('visible');
        }
    };

    // Function to hide the overlay
    const hideOverlay = () => {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.classList.remove('visible');
            overlay.classList.add('hidden');
        }
    };

    // Function to handle page transitions
    return (path: string) => {
        showOverlay(); // Show the overlay for the fade effect

        // Navigate after the fade-out effect
        setTimeout(() => {
            navigate(path);
            hideOverlay(); // Hide the overlay after navigation completes
        }, 1000); // Match the duration of the CSS transition (1 second)
    };
}
