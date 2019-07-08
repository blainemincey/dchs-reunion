import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import {Button, Divider, Header, Message} from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Home extends Component {
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

        return (
            <div>
                {this.state.authenticated !== null &&
                <div>
                    <Header as="h1">DCHS Class of 1989</Header>
                    <Header as="h2">30 Year Class Reunion Registration</Header>
                    <Divider/>
                    {this.state.authenticated &&
                    <div>
                        <p>Welcome {this.state.userinfo.name}!</p>
                        <Message error>
                            <Message.Header>Reunion Registration Deadline</Message.Header>
                            <p>Friday, August 9, 2019</p>
                        </Message>
                        <h3>Next Steps</h3>
                        <p>
                            Please complete your <a href="/profile">Reunion Registration Profile</a> if you plan on
                            attending the 30-year Class Reunion.  By completing your profile, you are indicating that
                            you do plan on attending.  You can update your information at any time.
                        </p>

                        <p>
                            Once the registration deadline has passed, the Reunion Committee will communicate the final
                            details such as the venue, cost, and other important information to you.
                        </p>
                        <p>
                            Please share the registration site with as many former classmates as you can.  There are a
                            number of us no longer active on Facebook so it is critical that you assist us in sending
                            the information to any old email addresses or mobile phones you have.
                        </p>
                        <p>
                            <b>Thank you!</b>
                        </p>
                    </div>
                    }
                    {!this.state.authenticated &&
                    <div>
                        <Message info>
                            <Message.Header>Reunion Save The Date</Message.Header>
                            <p>Saturday, October 5, 2019</p>
                        </Message>

                        <Message error>
                            <Message.Header>Reunion Registration Deadline</Message.Header>
                            <p>Friday, August 9, 2019</p>
                        </Message>

                        <p>The Reunion Committee is in the process of finalizing the plans for our 30-year reunion.</p>
                        <p>
                            If you are interested in attending, please consider creating a registration profile and
                            sharing your contact information with us.  We need to estimate a headcount in order to be
                            able to provide an accurate cost.  We would like to keep costs around the $40/person range.  However,
                            if we do not receive many registrations, this cost could increase.
                        </p>

                        <p>
                            Click on the Login button at either the top or bottom of this page.  This will open a Sign-In
                            dialog.  If this is your very first time, you will need to click the Sign-up button and enter
                            a valid email address, password, along with your first and last name.  Then, click the Register button.
                        </p>
                        <p>
                            Once this is complete, you will be able to login and complete your registration profile.
                            This information
                            will also enable us to notify you when we have the final details available along with the
                            information
                            required to pay for the event via PayPal.
                        </p>
                        <p>
                            Even if you do not plan on attending, please share the registration site with as many former
                            classmates as you can.  There are a
                            number of us no longer active on Facebook so it is critical that you assist us in sending
                            the information to any old email addresses or mobile phones you have.
                        </p>
                        <p>
                            <b>Thank you!</b>
                        </p>


                        <Button id="login-button" primary onClick={this.login}>Login</Button>
                    </div>
                    }
                </div>
                }
            </div>
        );
    }
});