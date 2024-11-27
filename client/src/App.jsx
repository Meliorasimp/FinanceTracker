
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Register from './pages/register';
import Navbar from './components/Navbar';
import Login from './pages/Loginpage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/analytics' element={<Analytics />}></Route>
      </Routes>
    </div>
  );
}

export default App;

