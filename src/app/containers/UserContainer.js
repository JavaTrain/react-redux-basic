import React from "react";
import {Main} from '../components/Main';
import {User} from '../components/User';
import { setName } from "../actions/userActions";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'

const UserContainer = (props) => {
    return (
        <div>
            <div className="container">
                <h1>User test</h1>
                <Main changeUsername={() => props.setName("NewName")}/>
                <User username={props.user.data && props.user.data.username}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        math: state.math
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserContainer));