import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories/Categories.tsx';
import SoilCoverageCapture from './components/DummyFiles/Soil-Coverage-Capture.tsx';
import SoilCoverageCompare from './components/Soil-Coverage-Compare.tsx';
import Home from './components/Home.tsx';
import './App.css';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/soil-coverage-capture" element={<SoilCoverageCapture />} />
        <Route path="/soil-coverage-compare" element={<SoilCoverageCompare />} />
      </Routes>
    </Router>
  )
}

export default App;
