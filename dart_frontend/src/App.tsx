import './App.css'
import {Route, Routes} from 'react-router-dom';
import Navigation from './components/HandleNavigation.tsx';
import Earth from "./homepage/components/Earth/Earth.tsx";
import {useEffect} from "react";

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
                <Route path="/" element={<Earth/>}/>
            </Routes>
        </>
    )
}

export default App;