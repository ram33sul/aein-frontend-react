import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess } from './redux/user/userActions';
import axios from 'axios';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem('aein-app-mode'));
    if(mode){
      document.documentElement.style.setProperty('--background-color','black');
      document.documentElement.style.setProperty('--foreground-color','white');
    } else {
      document.documentElement.style.setProperty('--background-color','white');
      document.documentElement.style.setProperty('--foreground-color','black');
    }
    dispatch(fetchUserRequest());
    axios.get('/verifyUser').then((response) => {
      dispatch(fetchUserSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUserFailure(error))
    })
  },[dispatch])
  return (
      <div className='container'>
        <Routes>
          <Route path='/login' element={ user.username ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={ user.username ? <Navigate to='/' /> : <Signup />} />
          <Route path='/' element={user.username ? <Home /> : <Navigate to='/login' />} />
        </Routes>
      </div>
  );
}

export default App;
