import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navigation from '../global/components/HandleNavigation.tsx';
import Earth from "./homepage/components/Earth/Earth.tsx";
import { useEffect } from "react";
import { BrainAnimation } from "./aipage/BrainAnimation.tsx";

function App() {
    useEffect(() => {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 500);
        }
    }, []);


    return (
        <>
            <div id="overlay" className="visible"></div>
            <Navigation/>
            <Routes>
                <Route path="/dart/" element={ <Earth /> } />
                <Route path="/dart/ai" element={ <BrainAnimation />} />
            </Routes>
        </>
    )
}

export default App;