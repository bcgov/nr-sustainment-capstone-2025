import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories.tsx'
import Home from './components/Home.tsx'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  )
}

export default App
