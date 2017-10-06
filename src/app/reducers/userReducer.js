import * as constants from '../constants'

const initialState = {
    data: null,
    isLoading: false,
    isAdmin: false,
    isLoggedIn: false
};

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SET_NAME_FULFILLED":
            state = {
                ...state,
                data: {...state, username: payload}
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: payload
            };
            break;
        case constants.USER_LOGGING_IN:
            state = {
                ...state,
                isLoading: true
            };
            break;
        case constants.USER_LOGGED_IN:
            state = {...state, data: payload, isLoading: false, isLoggedIn: true};
            break;
        case constants.USER_LOGGED_OUT:
            state = initialState;
            break;
    }
    return state;
};

export default userReducer;