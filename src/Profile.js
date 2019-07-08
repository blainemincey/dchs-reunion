import React, {Component} from 'react';
import {withAuth} from '@okta/okta-react';
import RegistrationForm from './RegistrationForm';
import {checkAuthentication} from './helpers';

const mdbStitchWebhook = process.env.REACT_APP_MONGODB_STITCH_GET_WEBHOOK;

export default withAuth(class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
            authenticated: null,
            registrationData: null
        };

        this.checkAuthentication = checkAuthentication.bind(this);
        this.loadExistingRegistrationData = this.loadExistingRegistrationData.bind(this);
    }

    async loadExistingRegistrationData() {
        console.log("Loading existing data.");
        let url = mdbStitchWebhook + '?email=' + this.state.userinfo.email;
        console.log('webhook url: ' + url);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });

            if(response.ok) {
                console.log('Get reg data response ok!');
                let json = await response.json();
                this.setState({
                    registrationData: json
                } );

                return true;
            } else {
                console.log("Response Error!");
                console.log("Unable to load data for email: " + this.state.userinfo.email);

                return false;
            };
        } catch(e) {
            console.log('Error on post registration', e);
            return false;
        }
    }

    async componentDidMount() {
        await this.checkAuthentication();
        await this.loadExistingRegistrationData();
    }

    async componentDidUpdate() {
        await this.checkAuthentication();
    }


    render() {
        const {authenticated, registrationData} = this.state;
        console.log('Registration data: ' + registrationData);

        return (
            <div>
                {!authenticated && <div className="ui icon message">
                    <i className="notched circle loading icon"></i>
                    <div className="content">
                        <div className="header">
                            Just one second
                        </div>
                        <p>We're fetching your registration profile...</p>
                    </div>
                </div>}
                {registrationData &&
                <div>
                    <RegistrationForm
                        person={{
                            emailAddress: this.state.userinfo.email,
                            firstName: this.state.userinfo.given_name,
                            lastName: this.state.userinfo.family_name,
                            preferredName: registrationData.preferredName,
                            maidenName: registrationData.maidenName,
                            mobileNumber: registrationData.mobileNumber,
                            address: registrationData.address,
                            city: registrationData.city,
                            state: registrationData.state,
                            postalCode: registrationData.postalCode,
                            country: registrationData.country,
                            guest: registrationData.guest,
                            guestName: registrationData.guestName,
                            radio: registrationData.venue
                        }}
                    />
                </div>
                }
            </div>
        );
    };
});