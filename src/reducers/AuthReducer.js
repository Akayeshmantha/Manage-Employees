import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_BADLYFORMAT_EMAIL,
    LOGIN_USER_WEAK_PASSWORD } 
    from '../actions/types' ;

const INITIAL_STATE = { 
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED: 
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload, loading: false };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_WEAK_PASSWORD:
            return { ...state, error: 'Please Enter a strong password.', help: 'with at least 6 charactrers', password: '', loading: false };
        case LOGIN_USER_BADLYFORMAT_EMAIL:
            return { ...state, error: 'Please Enter a valid email.', help:'test@test.com', password: '', loading: false };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', password: '', loading: false };
        default: 
            return state;
    }
};
