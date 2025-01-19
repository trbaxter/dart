import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter
        basename = "/dart/"
        future = {{
            v7_startTransition: true,
            v7_relativeSplatPath: true}}
    >
        <App />
    </BrowserRouter>
)
