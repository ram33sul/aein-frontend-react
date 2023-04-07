import React, { useState } from 'react';
import styles from '../Login/Login.module.css';
import Input from '../../components/general/Input/Input';
import Button from '../../components/general/Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail, validateMobile, validateName, validatePassword, validateUsername } from '../../validations/validations';

//validations while entering any character into the input field
import { updateEmail, updateName, updateUsername, updateMobile, updatePassword, updateConfirmPassword } from '../../validations/updations'
import Logo from '../../components/general/Logo/Logo';
import { useDispatch } from 'react-redux';
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess } from '../../redux/user/userActions';

function Signup() {
    
    const navigate = useNavigate();

    //initializing states of input values
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ mobile, setMobile ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    //states for errors in each input fields
    const [ nameError, setNameError ] = useState('');
    const [ usernameError, setUsernameError ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ mobileError, setMobileError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ confirmPasswordError, setConfirmPasswordError ] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if(!validateName(name)) { setNameError('Name is not valid') };
        if(!validateUsername(username)) { setUsernameError('Username is not valid')};
        if(!validateEmail(email)) { setEmailError('Email is not valid')};
        if(!validateMobile(mobile)) { setMobileError('Mobile is not valid')};
        if(!validatePassword(password)) { setPasswordError('Password is not valid')};
        if(password !== confirmPassword){
            setConfirmPasswordError("Password doesn't match");
            return;
        }
        if(nameError || usernameError || emailError || mobileError || passwordError || confirmPasswordError){
            return;
        }
        dispatch(fetchUserRequest())
        axios.post('/signup', {name, username, email, mobile, password}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
            console.log(response.data.user);
        }).catch((error) => {
            console.log(error);
            error.response.data.forEach((error) => {
                if(error.field === 'name') { setNameError(error.message)};
                if(error.field === 'username') { setUsernameError(error.message)};
                if(error.field === 'email') { setEmailError(error.message)};
                if(error.field === 'mobile') { setMobileError(error.message)};
                if(error.field === 'password') { setPasswordError(error.message)};
            })
            dispatch(fetchUserFailure(error.response.data));
        })
    }

    
  return (
    <div className={styles.container}>
        <Logo />
        <Input label='Name' setValue={updateName(setName, setNameError)} value={name} error={nameError} />
        <Input label='Username' setValue={updateUsername(setUsername, setUsernameError)} value={username} error={usernameError} />
        <Input label='Email' setValue={updateEmail(setEmail, setEmailError)} value={email} error={emailError} />
        <Input label='Mobile' setValue={updateMobile(setMobile, setMobileError)} value={mobile} error={mobileError} />
        <Input label='Password' type='password' setValue={updatePassword(setPassword, setPasswordError)} value={password} error={passwordError}/>
        <Input label='Confirm Password' type='password'setValue={updateConfirmPassword(setConfirmPassword, setConfirmPasswordError)} value={confirmPassword} error={confirmPasswordError} />
        <Button width='100%' maxWidth='300px' content='Signup' onClick={handleSubmit} />
        <span className={styles.span} onClick={() => navigate('/login')}>Already have an account?</span>
    </div>
  )
}

export default Signup