// import Footer from './components/Footer'
import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main/Main';
import LandingPage from './pages/LandingPage/LandingPage';
import Create from './pages/Create/Create';
import './App.css';
import Register from './pages/Register/Register';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/main' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/create' element={<Create />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
