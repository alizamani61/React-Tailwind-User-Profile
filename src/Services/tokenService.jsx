import { useState } from 'react';

const useToken = () => {
    const getToken = () => {
        return JSON.parse(localStorage.getItem('token'));
    }
    const [token, setToken] = useState(getToken());
    const [errors, setErrors] = useState(null);

    const saveToken = userToken => {
        if (userToken && userToken.token) {
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken);
        }

        if(userToken && userToken.errors){
            setErrors(userToken.errors);
        }
    };

    const removeToken = () => {
        //Remove user token
        localStorage.setItem('token', null);
        setToken(null);
    };

    return {
        setToken: saveToken,
        removeToken: removeToken,
        token,
        errors
    }
}
export default useToken;