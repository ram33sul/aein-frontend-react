import { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess } from './redux/user/userActions';
import axios from 'axios';

function App() {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme);
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color',theme.backgroundColor);
    document.documentElement.style.setProperty('--foreground-color',theme.foregroundColor);

    dispatch(fetchUserRequest());
    axios.get('/verifyUser').then((response) => {
      dispatch(fetchUserSuccess(response.data));
    }).catch((error) => {
      dispatch(fetchUserFailure(error))
    }).finally(() => {
      setLoading(false)
    })
  },[dispatch, theme])
  return (
      <div className='container'>
        {loading ? '' :
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
