const exists = (value) => {
    return value !== null && value !== undefined && value !== '';
    // checking whether any given value is not null or undefined
}

export const validateName = (name) => {
    const validValue = /^[A-Za-z\s]+$/;
    return exists(name) && validValue.test(name) && name.length > 2 && name.length < 20;
    // name must not null and not undefined
    // name should only have alphabet letters and spaces
    // name must have a length of above 2 and below 20
}

export const validateUsername = (username) => {
    const validValue = /^[A-Za-z0-9]*$/;
    return exists(username) && validValue.test(username) && username.length < 16 && username.length > 3;
    // username must exist
    // username must be aplhanumeric without spaces
    // username must have a length less than 16
}

export const validateMobile = (mobile) => {
    const validValue = /^[0-9]*$/;
    return exists(mobile) && mobile.length === 10 && validValue.test(mobile);
    // mobile must exist and only be number;
}

export const validatePassword = (password) => {
    const validValue = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return exists(password) && validValue.test(password);
    // password must exist and shouldn't contain spaces
}

export const validateEmail = (email) => {
    const validValue = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return exists(email) && validValue.test(email);
    // email must exist and should be valid
}

export const validateBio = (bio) => {
    return (bio.length < 101 && bio.split(/\r\n|\r|\n/).length < 6);
}

export const validatePost = (chats) => {
    if(!chats || !chats.length){
        return {status: false, message: "Chats are required!"}
    }
    if(chats.length > 6){
        return {status: true, message: "Maximum 6 messages allowed! (unselect messages)"}
    }
    let string = ''
    chats.forEach((message) => {
        string += message.content
    })
    if(string.length > 501){
        return {status: false, message: "Maximum 500 characters allowed! (unselect messages)"}
    }
    return {status: true}
}
