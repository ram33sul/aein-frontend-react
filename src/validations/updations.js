const updateName = (setName, setNameError) => {
    return (value) => {
        setNameError('');
        const validValue = /^[A-Za-z\s]+$/;
        if((validValue.test(value[value.length-1]) && !(value[value.length-1] === ' ' && value[value.length-2] === ' ')) && value[0] !== ' '){
            return setName(value);
        }
        let id = setTimeout(function() {}, 0);
        while(id--) {
            clearTimeout(id);
        }
        setNameError('Invalid input');
        setTimeout(() => setNameError(''),1000);
    }
}

const updateUsername = (setUsername, setUsernameError) => {
    return (value) => {
        setUsernameError('');
        const validValue = /^[A-Za-z0-9]*$/;
        if(validValue.test(value[value.length-1])){
            return setUsername(value ? value.toLowerCase() : value);
        }
        let id = setTimeout(function() {}, 0);
        while(id--) {
            clearTimeout(id);
        }
        setUsernameError('Invalid input');
        setTimeout(() => setUsernameError(''), 1000);
    }
}

const updateMobile = (setMobile, setMobileError) => {
    return (value) => {
        setMobileError('');
        const validValue = /^[0-9]*$/;
        if(!value || validValue.test(value[value.length-1])){
            return setMobile(value);
        }
        let id = setTimeout(function() {}, 0);
        while(id--) {
            clearTimeout(id);
        }
        setMobileError('Only numbers allowed');
        setTimeout(() => setMobileError(''), 1000);
    }
}

const updatePassword = (setPassword, setPasswordError) => {
    return (value) => {
        setPasswordError('')
        const validValue = /\s/;
        if(!validValue.test(value[value.length-1])){
            return setPassword(value);
        }
        let id = setTimeout(function() {}, 0);
        while(id--) {
            clearTimeout(id);
        }
        setPasswordError('Cannot include spaces');
        setTimeout(() => setPasswordError(''), 1000);
    }
}

const updateEmail = (setEmail, setEmailError) => {
    return (value) => {
        setEmailError('')
        const validValue = /^\W+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(!validValue.test(value)){
            return setEmail(value);
        }
        let id = setTimeout(function() {}, 0);
        while(id--) {
            clearTimeout(id);
        }
        setEmailError('Invalid input');
        setTimeout(() => setEmailError(''), 1000);
    }
}

const updateConfirmPassword = (setConfirmPassword, setConfirmPasswordError) => {
    return (value) => {
        setConfirmPasswordError('');
        setConfirmPassword(value);
    }
}
export { updateName, updateUsername, updateMobile, updatePassword, updateEmail, updateConfirmPassword };