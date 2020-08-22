import {AsyncStorage} from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

export const logout = ()=>{
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {type: LOGOUT}
}
export const authenticate = (userId, token, expirtyTime) =>{
    return dispatch =>{
        dispatch(setLogoutTimer(expirtyTime));
        dispatch({type:AUTHENTICATE, userId: userId, token: token});
    }
   
}
export const signup = (email, password) =>{

    return async dispatch =>{

      const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsYruOel0FD1PENcU49u40-Amz91tkvYU',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok){

            const errorResponse = await response.json();
            const errorId = errorResponse.error.message;
            let message = 'Something Went Wrong';

            if(errorId === 'EMAIL_EXISTS'){
                message = 'This Email already exists'
            }
            throw new Error(message)
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn *1000)))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn * 1000));
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);

    }
};

export const login = (email, password) =>{

    return async dispatch =>{

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsYruOel0FD1PENcU49u40-Amz91tkvYU',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok){
            const errorRessponse = await response.json();
            const errorId = errorRessponse.error.message;
            let message = 'Something Went Wrong!';

            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'Email counld not be found!';
            }else if(errorId ==='INVALID_PASSWORD'){
                message = 'This password is not valid';
            }
            throw new Error(message)
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.userId, resData.idToken, parseInt(resData.expiresIn *1000)))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }

}
const clearLogoutTimer = ()=>{
    if(timer){
        clearTimeout(timer);
    }
}
const setLogoutTimer = expirationTime =>{

    return dispatch =>{
        timer = setTimeout(() =>{
            dispatch(logout());
        },expirationTime/1000)  // changes the logout timer 
    }
}

const saveDataToStorage = (token, userId, expirationDate) =>{
    AsyncStorage.setItem('userData',
    JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()

    })
    )
}