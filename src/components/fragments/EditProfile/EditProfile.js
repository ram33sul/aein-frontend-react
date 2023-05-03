import React, { useEffect, useState } from 'react';
import styles from './EditProfile.module.css';
import ProfilePicture from '../../general/ProfilePicture/ProfilePicture';
import Input from '../../general/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DisplayMessage from '../../general/DisplayMessage/DisplayMessage';
import { validatePassword, validateName, validateUsername, validateBio } from '../../../validations/validations';
import { updateName, updateUsername, updatePassword, updateConfirmPassword } from '../../../validations/updations';
import { useNavigate } from 'react-router';
import { fetchUserSuccess } from '../../../redux/user/userActions';
import Loading from '../../general/Loading/Loading';

function EditProfile() {

    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const user = state.user.user;
    const navigate = useNavigate();

    const [ profilePic, setProfilePic ] = useState(user?.profilePicUrl);
    const [ name, setName ] = useState(user?.name)
    const [ username, setUsername ] = useState(user?.username);
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ bio, setBio ] = useState(user?.bio);

    const [ changePasswordPage, setChangePasswordPage ] = useState(false);
    const [ displayMessage, setDisplayMessage ] = useState({});
    const [ changePasswordLoading, setChangePasswordLoading ] = useState(false)
    const [ saveChangesLoading, setSaveChangesLoading ] = useState(false);

    const [ nameError, setNameError ] = useState('');
    const [ usernameError, setUsernameError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ confirmPasswordError, setConfirmPasswordError ] = useState('');
    const [ bioError, setBioError ] = useState('');

    const [ profilePicSelected, setProfilePicSelected ] = useState(false);

    const handleSaveChanges = () => {
        if(!name){
            setNameError('Name is required!');
        }
        if(!username){
            setUsernameError('Username is required!');
        }
        if(!name || !username){
            return;
        }
        let errorFlag = 0;
        if(!validateName(name)) {errorFlag = 1; setNameError('Name is not valid!') };
        if(!validateUsername(username)) {errorFlag = 1; setUsernameError('Username is not valid!')};
        if(!validateBio(bio.trim())) {errorFlag = 1; setBioError('limit exceeded(5 lines & 100 letters)')}
        if(errorFlag){
            return;
        }
        setSaveChangesLoading(true)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("bio", bio.trim());
        formData.append("image", profilePicSelected)
        axios.patch('/user/editProfile', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
            dispatch(fetchUserSuccess(response.data))
            setDisplayMessage({message: "Changes saved successfully", color: 'green'});
            setNameError('');
            setUsernameError('');
            setBioError('');
        }).catch((error) => {
            console.log(error.response.data);
            error.response.data.forEach((error) => {
                if(error.field === 'name') { setNameError(error.message)};
                if(error.field === 'username') { setUsernameError(error.message)};
                if(error.field === 'bio') {setBioError(error.message)};
            })
        }).finally(() => {
            setSaveChangesLoading(false);
        })
    };

    const handleCancel = () => {
        navigate(`/profile?username=${user?.username}`)
    }

    const handleChangePasswordSubmit = () => {
        if(!password){
            setPasswordError('Password is required!')
        }
        if(!confirmPassword){
            setConfirmPasswordError('Confirm password is required!')
        }
        if(!password || !confirmPassword){
            return;
        }
        if(!validatePassword(password)) {return setPasswordError('Make password stronger!')};
        if(password !== confirmPassword){
            setConfirmPasswordError("Passwords doesn't match");
            return;
        }
        setChangePasswordLoading(true)
        axios.patch('/changePassword', {
            userId: user?._id,
            newPassword: password
        }).then(() => {
            setChangePasswordPage(false);
            setPassword('');
            setConfirmPassword('');
            setDisplayMessage({message: "Password changes Successfully", color: 'green'});
        }).catch((error) => {
            setPasswordError(error.response.data.message);
        }).finally(() => {
            setChangePasswordLoading(false);
        })
    }

    const handleProfilePicSelected = (e) =>{
        if(e.target.files[0].size > 1000000){
            setDisplayMessage({message: 'Image size limit is 1MB', color: 'red'});
            return;
        }
        setProfilePicSelected(e.target.files[0]);
    }

    useEffect(() => {
        if(profilePicSelected){
            setProfilePic(URL.createObjectURL(profilePicSelected));
        }
    },[profilePicSelected])

  return (
    <div className={styles.container}>
        { displayMessage.message ?
            <DisplayMessage message={displayMessage.message} color={displayMessage.color} onClick={() => setDisplayMessage({})}/> : '' }
        { !changePasswordPage ? <> 
        <ProfilePicture size='100px' borderWidth='0' imageSrc={profilePic}/>
        <div className={styles.button}>
            <label htmlFor='image-upload' className={styles["image-upload-label-box"]}>
                <div className={styles["button-text"]}>
                    CHANGE PROFILE PIC
                </div>
                <input type='file' id='image-upload' onChange={handleProfilePicSelected} style={{display: 'none', width: '100%', height: '100%'}} />
            </label>
        </div>
        <Input label='Name' value={name} onChange={(e) => updateName(setName, setNameError)(e.target.value)} error={nameError}/>
        <Input label='Username' value={username} onChange={(e) => updateUsername(setUsername, setUsernameError)(e.target.value)}  error={usernameError}/>
        <div className={styles["email-and-mobile"]}>
            Email: <strong>{user?.email}</strong>
        </div>
        <div className={styles["email-and-mobile"]}>
            Mobile: <strong>{user?.mobile}</strong>
        </div>
        <div className={styles["bio-wrapper"]}>
            { bioError.length ? 
                <div className={styles["bio-label"]} style={{color: 'red'}}>
                   {bioError}
               </div> :
            <div className={styles["bio-label"]}>
                Bio:
            </div>
            }
            <textarea value={bio} className={styles["bio-textarea"]} placeholder='Enter your bio here...' onChange={(e) =>{setBioError(''); setBio(e.target.value)}} />
        </div>
        <div className={styles.button} onClick={() => setChangePasswordPage(true)}>
            CHANGE PASSWORD
        </div>
        <div className={styles["buttons-container"]}>
            <div className={styles.button} style={{opacity: (name === user?.name && username === user?.username && bio === user?.bio && !profilePicSelected) ? '0.5' : ''}} onClick={(name === user?.name && username === user?.username && bio === user?.bio && !profilePicSelected) ? null : handleSaveChanges}>
                {saveChangesLoading ? <Loading scale='0.6' /> : 
                    <div className={styles["button-text"]}>
                        SAVE
                    </div>
                }
            </div>
            <div className={styles.button} onClick={handleCancel}>
                <div className={styles["button-text"]}>
                    CANCEL
                </div>
            </div>
        </div> </>
        :
            <div className={styles["change-password-page-container"]} >
            <Input label='New Password' type='password' value={password} onChange={(e) => updatePassword(setPassword, setPasswordError)(e.target.value)} error={passwordError} />
            <Input label='Confirm Password' type='password' value={confirmPassword} onChange={(e) => updateConfirmPassword(setConfirmPassword, setConfirmPasswordError)(e.target.value)} error={confirmPasswordError} />
            <div className={styles["buttons-container"]}>
            <div className={styles.button} onClick={changePasswordLoading ? (() => {}) : handleChangePasswordSubmit}>
                {changePasswordLoading ? <Loading scale='0.7' /> : 
                <div className={styles["button-text"]}>
                    SUBMIT
                </div>
                }
            </div>
            <div className={styles.button} onClick={() => setChangePasswordPage(false)}>
                <div className={styles["button-text"]}>
                    CANCEL
                </div>
            </div>
        </div>
        </div>
         }
    </div>  
  )
}

export default EditProfile;