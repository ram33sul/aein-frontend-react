import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import Input from '../../components/general/Input/Input';
import Button from '../../components/general/Button/Button';
import Logo from '../../components/general/Logo/Logo';
import Line from '../../components/general/Line/Line';
import Button2 from '../../components/general/Button2/Button2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUserFailure, fetchUserSuccess } from '../../redux/user/userActions';
function Login() {

    const [ usernameOrEmail, setUsernameOrEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errorMessage, setErrorMessage ] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = () => {
        setErrorMessage('');
        if(usernameOrEmail.length === 0 || password.length === 0){
            return setErrorMessage('All inputs are required');
        }
        axios.post('/login', {usernameOrEmail, password}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
        }).catch((error) => {
            dispatch(fetchUserFailure(error.response.data));
            setErrorMessage(error.response.data.message);
        })
    }

    const handleGoogleLogin = (response) => {
        axios.post('/googleLogin', {googleToken: response.credential}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
        }).catch((error) => {
            dispatch(fetchUserFailure(error.response.data.message));
            setErrorMessage(error.response.data.message);
        })
    }

    useEffect(() => {
        setErrorMessage('');

        const google = window.google;
        google?.accounts?.id?.initialize({
            client_id: "701782588563-4p0khl7oj5jujkngdc49bf0jls0kv948.apps.googleusercontent.com",
            callback: handleGoogleLogin
        })

        google?.accounts?.id?.renderButton(
            document.getElementById("google-login-button"),
            {
                theme: "outline",
                size: "large"
            }
        )
    },[])

  return (
    <div className={styles.container}>
        <Logo />
        <span className={styles["error-message"]}>{errorMessage}</span>
        <Input label='Username or Email' value={usernameOrEmail} setValue={setUsernameOrEmail} />
        <Input label='Password' value={password} setValue={setPassword} type='password'/>
        <Button width='100%' maxWidth='300px' content='Login' onClick={handleSubmit}/>
        <span className={styles.span}>Forgot Password?</span>
        <Line width='100%' maxWidth='300px' />
        <Button2 width='100%' maxWidth='300px' content='CREATE NEW ACCOUNT' onClick={() => navigate('/signup')}/>
        <Button2 width='100%' maxWidth='300px' content='LOGIN WITH OTP' />
        <div id='google-login-button' style={{backgroundColor: 'red' }}></div>
    </div>
  )
}

export default Login