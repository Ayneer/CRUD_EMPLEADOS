let Auth = {};

Auth.saveToken = (Token) => {
    localStorage.setItem('session', JSON.stringify({Token}));
}

Auth.deleteToken = () => {
    localStorage.removeItem('session');
    localStorage.clear();
}

Auth.getToken = () => {
    if(localStorage.getItem('session')){
        return JSON.parse(localStorage.getItem('session'));
    }else{
        return null;
    }
}

export default Auth;