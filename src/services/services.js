export const changeTheme = () => {
    let theme = JSON.parse(localStorage.getItem("aein-app-theme"));
    if(theme === 'dark'){
        document.documentElement.style.setProperty('--background-color','white');
        document.documentElement.style.setProperty('--foreground-color','black');
        localStorage.setItem("aein-app-theme", JSON.stringify("light"));
        theme = 'light';
    } else {
        document.documentElement.style.setProperty('--background-color','black');
        document.documentElement.style.setProperty('--foreground-color','white');
        localStorage.setItem("aein-app-theme", JSON.stringify("dark"));
        theme = 'dark'
    }
    return theme;
}
