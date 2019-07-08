import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export default class OktaSignInWidget extends Component {
    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        this.widget = new OktaSignIn({
            baseUrl: this.props.baseUrl,
            features: {
                registration: true,
                rememberMe: false
            },
            helpLinks: {
                help: '/help'
            },
            language: 'en',
            i18n: {
                en: {
                    'primaryauth.title': 'DCHS 30 Year Class Reunion Registration',
                }
            },
            logo: 'https://p19cdn4static.sharpschool.com/UserFiles/Servers/Server_127842/Image/logo.jpg',
        });
        this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
    }

    componentWillUnmount() {
        this.widget.remove();
    }

    render() {
        return <div/>;
    }
};