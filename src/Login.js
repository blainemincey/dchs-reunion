import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { withAuth } from '@okta/okta-react';
import {checkAuthentication} from "./helpers";

export default withAuth(class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.checkAuthentication = checkAuthentication.bind(this);
        this.state = {
            authenticated: null
        };
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    onSuccess(res) {
        if (res.status === 'SUCCESS') {
            this.props.auth.getAccessToken();
            return this.props.auth.redirect({
                sessionToken: res.session.token
            });
        } else {
            // The user can be in another authentication state that requires further action.
            // For more information about these states, see:
            //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
        }
    }

    onError(err) {
        console.log('error logging in', err);
    }

    render() {
        console.log("Render of login page.");
        if (this.state.authenticated === null || this.state.authenticated === false) {
            return (<OktaSignInWidget
                baseUrl={this.props.baseUrl}
                onSuccess={this.onSuccess}
                onError={this.onError}/>);
        }
        else {
            return <Redirect to={{ pathname: '/' }}/>
        }
    }
});