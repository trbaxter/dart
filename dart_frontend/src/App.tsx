import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navigation from '../global/components/HandleNavigation';
import { useEffect } from "react";
import { BrainAnimation } from "./aipage/BrainAnimation";
import Homepage from "./homepage/Homepage";

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
            <div id = "overlay" className = "visible"></div>
            <Navigation/>
            <Routes>
                <Route path = "/" element = { <Homepage /> } />
                <Route path = "/ai" element = { <BrainAnimation />} />
            </Routes>
        </>
    )
}

export default App;