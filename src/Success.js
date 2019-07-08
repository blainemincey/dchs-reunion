import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Success extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null, userinfo: null };
        this.checkAuthentication = checkAuthentication.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/');
    }

    render() {

        let result = '';

        if(this.state.authenticated) {
            result =
                <div>
                    <Message
                        success
                        header='Success'
                        content='Your reunion registration was successfully updated!'

                    />
                    <p>Thank you for registering with the email: {this.state.userinfo.email}.</p>
                    <p>Watch your inbox for additional information.  We look forward to seeing you soon!</p>
                </div>;
        }
        else {
            result =
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Saving your registration profile
                            </div>
                            <p>Hold on tight...we are updating your registration profile!</p>
                        </div>
                    </div>;
        }

        return (
            <div>
                {result}
            </div>
        );
    }
});