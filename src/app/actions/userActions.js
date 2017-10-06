import * as constants from '../constants'

export function setName(name) {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch({
    //             type: "SET_NAME",
    //             payload: name
    //         });
    //     }, 2000);
    // }
    return {
        type: "SET_NAME",
        payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(name);
            }, 2000);
        })
    };
}

export function setAge(age) {
    return {
        type: "SET_AGE",
        payload: age
    };
}

export const login = data => dispatch => {
    dispatch({
        type: constants.USER_LOGGING_IN
    });
    // Wait 1 seconds before "logging in"
    setTimeout(() => {
        dispatch({
            type: constants.USER_LOGGED_IN,
            payload: data
        })
    }, 1000)
}

export function logout() {
    console.log('logoutAction');
    return {
        type: constants.USER_LOGGED_OUT
    }
}