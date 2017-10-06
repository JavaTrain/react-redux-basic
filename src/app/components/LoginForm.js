import React from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import { login } from "../actions/userActions";

let loginAction = (data, f, props) => {
    props.login(data);
};

let LoginForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, username, hasEmailValue} = props;
    return (
        <form onSubmit={handleSubmit(loginAction)}>
            <div>
                <label>Username</label>
                <Field name="username" component="input" type="text"/>
            </div>
            <div>
                <label htmlFor="admin">Are you an admin?</label>
                <Field name="isAdmin" id="admin" component="input" type="checkbox"/>
            </div>
            <div>
                <label htmlFor="hasEmail">Has Email?</label>
                <Field name="hasEmail" id="hasEmail" component="input" type="checkbox"/>
            </div>
            {hasEmailValue &&
                <div>
                    <label>Email</label>
                    <Field name="email" component="input" type="email" placeholder="Email"/>
                </div>
            }
            <div>
                <label>Password</label>
                <Field name="password" component="input" type="password"/>
            </div>

            <button type="submit" disabled={pristine || submitting}>Submit {username}</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </form>
    );
};

LoginForm = reduxForm({
    form: 'login' // a unique name for this form
})(LoginForm);

const selector = formValueSelector('login'); // <-- same as form name
LoginForm = connect(
    state => {
        // can select values individually
        const username = selector(state, 'username');
        const hasEmailValue = selector(state, 'hasEmail');
        const user = state.user;
        // or together as a group
        // const { firstName, lastName } = selector(state, 'firstName', 'lastName')
        return {
            user,
            username,
            hasEmailValue
            // fullName: `${firstName || ''} ${lastName || ''}`
        }
    },
    (dispatch) => {
        return {
            login: (data) => {
                dispatch(login(data));
            }
        };
    }
)(LoginForm);


// Decorate the form component
export default LoginForm;
