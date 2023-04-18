import About from './About';
import './App.css';
import Home from './Home';
import NavBar from './Nav';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Signup />} ></Route>
        <Route exact path='/signin' element={<Signin />} ></Route>
        <Route exact path='/home' element={<Home />} ></Route>
        <Route exact path='/about' element={<About />} ></Route>
      </Routes>
    </div>
  );
}

export default App;
