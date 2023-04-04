const isLoggedIn = () => {
    const userToken = JSON.parse(localStorage.getItem('aein-app-user'));
    if(userToken){
        return true;
    }
    return false;
}

export { isLoggedIn }