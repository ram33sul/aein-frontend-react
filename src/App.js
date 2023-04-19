import { useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFailure, fetchUserLogout, fetchUserRequest, fetchUserSuccess } from './redux/user/userActions';
import axios from 'axios';
import Testing from './components/Testing';

function App() {
  const state = useSelector((state) => state);
  const user = state.user.user
  const userLoading = state.user.loading;
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("aein-app-theme"));
    if(theme === 'dark'){
      document.documentElement.style.setProperty('--background-color','black');
      document.documentElement.style.setProperty('--foreground-color','white');
    }

    let logoutTimeOut;
    dispatch(fetchUserRequest());
    axios.get('/user/verifyUser').then((response) => {
      dispatch(fetchUserSuccess(response.data.userData));
      const expiresAt = response.data.expiresAt;
      const currentTime = new Date().getTime();
      logoutTimeOut = setTimeout(() => {
        dispatch(fetchUserLogout());
      },expiresAt - currentTime - 5000)
    }).catch((error) => {
      dispatch(fetchUserFailure(error))
    })
    return (() => {
      clearTimeout(logoutTimeOut);
    })
  },[dispatch])
  return (
      <div className='container'>
        {userLoading ? '' :
        <Routes>
          <Route path='login' element={ user.username ? <Navigate to='/' /> : <Login />} />
          <Route path='signup' element={ user.username ? <Navigate to='/' /> : <Signup />} />
          <Route path='*' element={user.username ? <Home /> : <Navigate to='/login' />} />
        </Routes>
        }
      </div>
  );
}

export default App;
