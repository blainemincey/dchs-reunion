import React, {Component} from 'react';
import {Button, Form, Input, Radio, Checkbox} from 'formik-semantic-ui';
import {withRouter} from 'react-router-dom';
import {Label, Message} from "semantic-ui-react";

const mdbStitchWebhook = process.env.REACT_APP_MONGODB_STITCH_POST_WEBHOOK;

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
    }

    state = {
        errors: null,
        badMobileNumber: false

    };

    static defaultProps = {
        person: {
            emailAddress: '',
            firstName: '',
            lastName: '',
            guest: false,
            preferredName: '',
            mobileNumber: ''
        }
    };

    async postRegistration(registrationData) {
        console.log("New Registration: " + JSON.stringify(registrationData));

        await fetch(mdbStitchWebhook, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(registrationData)
        })
            .then(response => {
                if(response.ok) {
                    console.log("Response ok!");
                    console.log(response.json());
                    console.log("Successful registration!");
                    const {history} = this.props;
                    history.push('/success');

                    return true;
                } else {
                    console.log("Response Error!");
                    console.log("Error with saving registration.");
                    console.log("Email: " + this.props.person.emailAddress);
                    console.log("Name: " + this.props.person.firstName + ' ' + this.props.person.lastName);

                    const {history} = this.props;
                    history.push('/error');
                    return false;
                };
            })
            .catch(function (ex) {
                console.log('Error on post registration', ex);
                return false;
            })
    }

    cancel() {
        console.log("reset registration form");

        const {history} = this.props;
        history.push('/');
    };

    _handleSubmit = (values, formikApi) => {
        console.log("Submit/Validate registration form.");
        let errors = null;

        this.setState({
            errors: errors,
            badMobileNumber: false
        });

        if (!values.preferredName ||
            !values.mobileNumber ||
            !values.address ||
            !values.city ||
            !values.state ||
            !values.postalCode ||
            !values.radio) {

            console.log("Required errors.");
            errors = {required: "Please enter a value."};

            this.setState({
                errors: errors
            });
        }

        if(values.guest === true) {
            if(!values.guestName) {
                console.log("Bringing a guest without guest name.");
                errors = {required: "Please enter a value."};

                this.setState({
                    errors: errors
                });
            }
        }

        if(values.mobileNumber) {
            var phoneno = /^\d{10}$/;
            if(values.mobileNumber.match(phoneno)){
                console.log("Proper phone number.");
            }
            else {
                errors = {badMobileNumber: "Please enter non-formatted mobile numbers only."};
                this.setState({
                    errors: errors,
                    badMobileNumber: true
                });
            }
        }

        console.log(errors);

        if (errors) {
            formikApi.setSubmitting(false);
        } else {
            console.log("Submitting registration.");
            console.log(values);
            formikApi.setSubmitting(true);
            this.postRegistration(values);
            formikApi.setSubmitting(false);
        }
    };

    render() {

        const {errors, badMobileNumber} = this.state;

        let requiredError = '';
        if (errors !== null && errors.required) {
            requiredError = <div className="ui error message">
                <i className="close icon"></i>
                <div className="header">
                    Please enter a value for the following required fields:
                </div>
                <ul className="list">
                    <li>Preferred Name</li>
                    <li>Mobile Number (only digits please!)</li>
                    <li>Address, City, State, and Postal Code</li>
                    <li>Name of guest (if you are bringing one)</li>
                    <li>Venue preference</li>
                </ul>
            </div>;
        }

        let badMobileNumberError = '';
        if(badMobileNumber) {
            badMobileNumberError = <Label basic color='red' pointing>
                Please enter numbers only for mobile numbers!
            </Label>;
        }

        let msgHdr = 'Registration Profile: ' + this.props.person.firstName + ' ' + this.props.person.lastName;

        return (
            <div>
                <Message
                    attached
                    header={msgHdr}
                    content='Please complete the form below or update your existing information.'
                />
                {requiredError}
                <Form   className='attached fluid segment'
                        initialValues={this.props.person}
                        onSubmit={this._handleSubmit}
                        onReset={this.cancel}
                >
                    <Form.Group widths="2">
                        <Form.Field required><label>Preferred Name</label><Input name="preferredName"/></Form.Field>
                        <Input label="Maiden Name" name="maidenName"/>
                    </Form.Group>
                    <Form.Field required><label>Mobile Number</label><Input name="mobileNumber"/></Form.Field>
                    {badMobileNumberError}
                    <Form.Field required><label>Address</label><Input name="address"/></Form.Field>
                    <Form.Group widths="3">
                        <Form.Field required><label>City</label><Input name="city"/></Form.Field>
                        <Form.Field required><label>State</label><Input name="state"/></Form.Field>
                        <Form.Field required><label>Postal Code</label><Input name="postalCode"/></Form.Field>
                    </Form.Group>
                    <Input label="Country" name="country"/>
                    <Form.Group widths="3">
                        <Checkbox inline label="Bringing a guest?" name="guest"/>
                        <Input label="Guest Name" name="guestName"/>
                    </Form.Group>
                    <Form.Group grouped>
                        <Form.Field required>
                        <label>Venue Preference</label>
                        <Radio label='Close to or in Douglasville' name='radio' value="Douglasville"/>
                        <Radio label='Close to or in Atlanta' name='radio' value="Atlanta"/>
                        <Radio label='I will drive any distance to be with classmates as long as it is in GA!'
                               name='radio'
                               value="Anywhere"/>
                        </Form.Field>
                    </Form.Group>

                    <Button.Submit>Submit</Button.Submit>
                    <Button.Reset>Cancel</Button.Reset>
                </Form>
            </div>
        );
    }
}

export default withRouter(RegistrationForm);