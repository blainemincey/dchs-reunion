import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Header, Message, Divider } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Error extends Component {
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
                        error
                        header='Error'
                        content='Yikes! There was a problem in saving your profile.  Please try again.'

                    />
                    <p>There was an issue in saving the profile registered with email: {this.state.userinfo.email}.</p>
                    <p>Please reach out to Blaine Mincey at 678-481-9547 or blaine.mincey@gmail.com.</p>
                </div>;
        }
        else {
            result =
                <div>
                    <Message
                        error
                        header='Error'
                        content='Yikes! There was a problem in saving your profile.  Please login and try again.'

                    />
                </div>;
        }


        return (
            <div>

                <div>
                    <Header as="h1">DCHS Class of 1989</Header>
                    <Header as="h2">30 Year Class Reunion Registration</Header>
                    <Divider/>
                </div>
                {result}
            </div>
        );
    }
});