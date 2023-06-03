import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import RouteProtecter from './protectedRoute/RouteProtecter';
import LoginProtector from './protectedRoute/LoginProtector';

function App() {



  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <RouteProtecter> <Home /> </RouteProtecter> } />
        <Route path = '/login' element={<LoginProtector><Login /></LoginProtector>  } />
        <Route path='/register' element={<LoginProtector><Register /></LoginProtector>} />
      </Routes>
      
    </div>
  );
}

export default App;
