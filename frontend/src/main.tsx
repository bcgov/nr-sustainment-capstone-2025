import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Categories from './Categories.tsx'

let userClick = "";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App userClick={userClick}/>} />
        <Route path="/categories" element={<Categories userClick={userClick}/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
