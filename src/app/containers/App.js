import React from "react";
import {connect} from "react-redux";

import UserContainer from "./UserContainer";
import { Home } from "../components/Home";
import { AdminComponent } from "../components/AdminComponent";
import {Protected} from "../components/Protected";
import { Route } from 'react-router';
import { NavLink, withRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir,
    userIsAuthenticated, userIsNotAuthenticated } from '../auth';
import { logout } from '../actions/userActions';

const getUserName = user => {
    if (user.data) {
        return `Welcome ${user.data.username}`
    }
    return `Guest`
};
// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginForm);
const ProtectedPage = userIsAuthenticatedRedir(Protected);
const Admin = userIsAuthenticatedRedir(userIsAdminRedir(AdminComponent));

// Only show login when the user is not logged in and logout when logged in
// Could have also done this with a single wrapper and `FailureComponent`
const UserName = ({ user }) => (<div>{getUserName(user)}</div>);
const LoginLink = userIsNotAuthenticated(() => <li><NavLink to="/login">Login</NavLink></li>);
const LogoutLink = userIsAuthenticated(({ logout }) => <li><a href="#" onClick={(e) => {e.preventDefault();logout()}}>Logout</a></li>);

function App ({user, logout}) {
    return (
        <div>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                {user.isLoggedIn && <li><NavLink to="/protected">Protected</NavLink></li>}
                {user.data && user.data.isAdmin && <li><NavLink to="/admin">Admin Page</NavLink></li>}
                <li><NavLink to="/user">User</NavLink></li>
                <LoginLink />
                <LogoutLink logout={logout} />
                <h2><UserName user={user} /></h2>
            </ul>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={UserContainer}/>
                <Route path="/login" component={Login}/>
                <Route path="/protected" component={ProtectedPage}/>
                <Route path="/admin" component={Admin}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user,
      math: state.math
  };
};

export default withRouter(connect(mapStateToProps, {logout})(App));
