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
import { fetchUserSuccess } from '../../redux/user/userActions';

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
        if(!name){
            setNameError('Name is required!');
        }
        if(!username){
            setUsernameError('Username is required!');
        }
        if(!email){
            setEmailError('Email is required!');
        }
        if(!mobile){
            setMobileError('Mobile is required!');
        }
        if(!password){
            setPasswordError('Password is required!');
        }
        if(!confirmPassword){
            setConfirmPasswordError('Confirm password is required!');
        }
        if(!name || !username || !email || !mobile || !password || !confirmPassword){
            return;
        }
        let errorFlag = 0;
        if(!validateName(name)) {errorFlag = 1; setNameError('Name is not valid') };
        if(!validateUsername(username)) {errorFlag = 1; setUsernameError('Username is not valid')};
        if(!validateEmail(email)) {errorFlag = 1; setEmailError('Email is not valid')};
        if(!validateMobile(mobile)) {errorFlag = 1; setMobileError('Mobile is not valid')};
        if(!validatePassword(password)) {errorFlag = 1; setPasswordError('Make password stronger!')};
        if(password !== confirmPassword){
            setConfirmPasswordError("Passwords doesn't match");
            return;
        }
        if(errorFlag){
            return;
        }
        axios.post('/user/signup', {name, username, email, mobile, password}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
        }).catch((error) => {
            error.response.data.forEach((error) => {
                if(error.field === 'name') { setNameError(error.message)};
                if(error.field === 'username') { setUsernameError(error.message)};
                if(error.field === 'email') { setEmailError(error.message)};
                if(error.field === 'mobile') { setMobileError(error.message)};
                if(error.field === 'password') { setPasswordError(error.message)};
            })
        })
    }

    
  return (
    <div className={styles.container}>
        <Logo />
        <Input label='Name' onChange={(e) => updateName(setName, setNameError)(e.target.value)} value={name} error={nameError} />
        <Input label='Username' onChange={(e) => updateUsername(setUsername, setUsernameError)(e.target.value)} value={username} error={usernameError} />
        <Input label='Email' onChange={(e) => updateEmail(setEmail, setEmailError)(e.target.value)} value={email} error={emailError} />
        <Input label='Mobile' onChange={(e) => updateMobile(setMobile, setMobileError)(e.target.value)} value={mobile} error={mobileError} />
        <Input label='Password' type='password' onChange={(e) => updatePassword(setPassword, setPasswordError)(e.target.value)} value={password} error={passwordError}/>
        <Input label='Confirm Password' type='password' onChange={(e) => updateConfirmPassword(setConfirmPassword, setConfirmPasswordError)(e.target.value)} value={confirmPassword} error={confirmPasswordError} />
        <Button width='100%' maxWidth='300px' content='Signup' onClick={handleSubmit} />
        <span className={styles.span} onClick={() => navigate('/login')}>Already have an account?</span>
    </div>
  )
}

export default Signup