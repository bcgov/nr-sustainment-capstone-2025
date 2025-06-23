import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories/Categories.tsx';
import SoilCoverageCapture from './components/Soil-Coverage-Capture.tsx';
import SoilCoverageCompare from './components/Soil-Coverage-Compare.tsx';
import Home from './components/Home.tsx';
import Login from './components/Login/Login.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import './App.css';
import { useState } from 'react';
import OrganicMatterAnalysisCapture from './components/Organic-Matter-Analysis-Capture.tsx';
import OrganicMatterAnalysisCompare from './components/Organic-Matter-Analysis-Compare.tsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
  }

  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Home handleLogoutClick={handleLogoutClick} />
          </PrivateRoute>} />
        <Route path="/categories" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Categories handleLogoutClick={handleLogoutClick} />
          </PrivateRoute>} />
        <Route path="/soil-coverage-capture" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <SoilCoverageCapture handleLogoutClick={handleLogoutClick} />
          </PrivateRoute>} />
        <Route path="/soil-coverage-compare" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <SoilCoverageCompare handleLogoutClick={handleLogoutClick} />
          </PrivateRoute>} />
        <Route path='/organic-matter-analysis-capture' element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <OrganicMatterAnalysisCapture handleLogoutClick={handleLogoutClick} />
          </PrivateRoute>}/>
        <Route path='/organic-matter-analysis-compare' element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <OrganicMatterAnalysisCompare handleLogoutClick={handleLogoutClick} />
        </PrivateRoute>}/>
      </Routes>
    </Router>
  )
}

export default App;
