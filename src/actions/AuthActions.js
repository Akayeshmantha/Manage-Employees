import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_BADLYFORMAT_EMAIL,
    LOGIN_USER_WEAK_PASSWORD
    } 
    from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                firebase.auth().currentUser.sendEmailVerification()
                .then(verified => { console.log(user); })
                .catch();
                 loginUserSuccess(dispatch, user);
            })
            .catch((error) => {
                loginUserFails(dispatch, error);
            });
        });
    };
};

const loginUserFails = (dispatch, error) => {
    console.log(error);
    if (error.code === 'auth/invalid-email') {
        dispatch({
        type: LOGIN_USER_BADLYFORMAT_EMAIL
        });
    } else if (error.code === 'auth/weak-password'){
        dispatch({
        type: LOGIN_USER_WEAK_PASSWORD
        });
    } else {
        dispatch({
        type: LOGIN_USER_FAIL
        });
    }
};

const loginUserSuccess = (dispatch, user) => {
    if (user.emailVerified) {
        dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
        });

        Actions.main(); 
    }
}; 
