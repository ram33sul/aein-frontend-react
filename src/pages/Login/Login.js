import React, { useCallback, useEffect, useState } from 'react';
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
import { validatePassword } from '../../validations/validations';
function Login() {

    const [ usernameOrEmail, setUsernameOrEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errorMessage, setErrorMessage ] = useState('');

    const [ loginWithOtpPage, setLoginWithOtpPage ] = useState(false);
    const [ forgotPasswordPage, setForgotPasswordPage ] = useState(false);
    const [ verifyOtpPage, setVerifyOtpPage ] = useState(false);
    const [ changePasswordPage, setChangePasswordPage ] = useState(false);
    const [ userData, setUserData ] = useState({});

    const [ mobileInput, setMobileInput ] = useState('');
    const [ otpCode, setOtpCode ] = useState('');

    const [ passwordInput, setPasswordInput ] = useState('');
    const [ confirmPasswordInput, setConfirmPasswordInput ] = useState('');

    const [ buttonLoading, setButtonLoading ] = useState(false);

    const [ timer, setTimer ] = useState(5 * 60);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = () => {
        setErrorMessage('');
        if(usernameOrEmail.length === 0 || password.length === 0){
            return setErrorMessage('All inputs are required');
        }
        setButtonLoading(true);
        axios.post('/user/login', {usernameOrEmail, password}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
        }).catch((error) => {
            dispatch(fetchUserFailure(error.response.data));
            setErrorMessage(error.response.data.message);
        }).finally(() => {
            setButtonLoading(false);
        })
    }

    const handleGoogleLogin = useCallback((response) => {
        axios.post('/user/googleLogin', {googleToken: response.credential}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
        }).catch((error) => {
            dispatch(fetchUserFailure(error.response.data.message));
            setErrorMessage(error.response.data.message);
        })
    },[dispatch])

    const handleSendOtp = () => {
        setErrorMessage('');
        setTimer(5 * 60)
        if(mobileInput.length === 0){
            return setErrorMessage("Mobile is required!")
        }
        setButtonLoading(true);
        axios.post('/user/sendSmsOtp', {mobile: mobileInput}).then((response) => {
            setVerifyOtpPage(response.data.message);
        }).catch((error) =>{
            setErrorMessage(error.response.data.message);
        }).finally(() => {
            setButtonLoading(false);
        });
    }

    const handleVerifyOtp = () => {
        setErrorMessage('');
        if(otpCode.length === 0){
            return setErrorMessage("OTP is required!");
        }
        setButtonLoading(true);
        if(loginWithOtpPage){
            axios.post('/user/verifySmsOtp', {mobile: mobileInput, otpCode}).then((response) => {
                dispatch(fetchUserSuccess(response.data.user));
            }).catch((error) => {
                setErrorMessage(error.response.data.message);
            }).finally(() => {
                setButtonLoading(false);
            })
        } else if(forgotPasswordPage){
            axios.post('/user/verifySmsOtp', {mobile: mobileInput, otpCode, login: false}).then((response) => {
                setUserData(response.data.user);
                setChangePasswordPage(true);
            }).catch((error) => {
                setErrorMessage(error.response.data.message);
            }).finally(() => {
                setButtonLoading(false);
            })
        }
    }

    const handleChangepassword = () => {
        setErrorMessage('');
        if(passwordInput !== confirmPasswordInput){
            setErrorMessage("Passwords doesn't match");
            return;
        }
        if(!validatePassword(passwordInput)) { setErrorMessage('Password is not valid')};
        setButtonLoading(true);
        axios.patch("/user/changePassword", {userId: userData._id, newPassword: passwordInput}).then((response) => {
            dispatch(fetchUserSuccess(response.data.user));
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        }).finally(() => {
            setButtonLoading(false);
        })
    }
    const handleGoBack = () => {
            setForgotPasswordPage(false);
            setLoginWithOtpPage(false);
            setErrorMessage(false);
            setButtonLoading(false);
            setChangePasswordPage(false);
            setVerifyOtpPage(false);
            setMobileInput('');
            setOtpCode('');
            setPasswordInput('');
            setConfirmPasswordInput('');
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
    },[handleGoogleLogin])

    useEffect(() => {
        if(verifyOtpPage){
            const interval = setInterval(() => {
                setTimer(prev =>  prev - 1);
            },1000)
            return () => {
                clearInterval(interval)
            }
        }
    },[verifyOtpPage])

    useEffect(() => {
        if(verifyOtpPage && timer <= 0){
            handleGoBack();
        }
    },[verifyOtpPage, timer])

  return (
    <div className={styles.container}>
        <Logo />
        <span className={styles["error-message"]}>{errorMessage}</span>
        { changePasswordPage ?
        <>
            <Input label='New Password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} type='password'/>
            <Input label='Confirm New Password' value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} type='password'/>
            <Button width='100%' maxWidth='300px' content='Change Password' onClick={handleChangepassword} loading={buttonLoading}/>
            <span className={styles.span} onClick={handleGoBack}>Go back</span>
        </> : verifyOtpPage ? 
        <>
            <span className={styles.span} style={{fontWeight: 'bold'}}>{verifyOtpPage}</span>
            <div className={styles["timeout-resend-button-wrapper"]}>
                <div className={styles["timeout"]}>
                    Timeouts in 0{Math.floor(timer/60)}:{timer%60 < 10 ? `0${timer%60}` : timer%60}
                </div>
                <div className={styles["resend-button"]} onClick={handleSendOtp}>
                    Resend
                </div>
            </div>
            <Input label='OTP code' value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
            <Button width='100%' maxWidth='300px' content='Verify OTP' onClick={handleVerifyOtp} loading={buttonLoading}/>
            <span className={styles.span} onClick={handleGoBack}>Go back</span>
        </> : loginWithOtpPage ? 
        <>
            <Input label='Mobile Number' value={mobileInput} onChange={(e) => setMobileInput(e.target.value)} />
            <Button width='100%' maxWidth='300px' content='Send OTP' onClick={handleSendOtp} loading={buttonLoading}/>
            <span className={styles.span} onClick={handleGoBack}>Go back</span>

        </>  : forgotPasswordPage ?
        <>
            <Input label='Mobile Number' value={mobileInput} onChange={(e) => setMobileInput(e.target.value)} />
            <Button width='100%' maxWidth='300px' content='Send OTP' onClick={handleSendOtp} loading={buttonLoading}/>
            <span className={styles.span} onClick={handleGoBack}>Go back</span>

        </> :
        <>
            <Input label='Username or Email' value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
            <Input label='Password' value={password} onChange={(e) => setPassword(e.target.value)} type='password'/>
            <Button width='100%' maxWidth='300px' content='Login' onClick={handleSubmit} loading={buttonLoading}/>
            <span className={styles.span} onClick={() =>{ setErrorMessage(''); setForgotPasswordPage(true)}}>Forgot Password?</span>
            <Line width='100%' maxWidth='300px' />
            <Button2 width='100%' maxWidth='300px' content='CREATE NEW ACCOUNT' onClick={() => navigate('/signup')}/>
            <Button2 width='100%' maxWidth='300px' content='LOGIN WITH OTP' onClick={() => setLoginWithOtpPage(true)}/>
        </>
        }
        <div style={{display: (verifyOtpPage || loginWithOtpPage || forgotPasswordPage) ? 'none' : ''}} id='google-login-button'></div>   
    </div>
  )
}

export default Login