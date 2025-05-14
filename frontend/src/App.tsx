import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories/Categories.tsx';
import Home from './components/Home.tsx';
import './App.css';

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

export default App;
