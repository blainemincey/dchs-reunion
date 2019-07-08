import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Security, SecureRoute, ImplicitCallback} from '@okta/okta-react';
import {Container} from 'semantic-ui-react';
import './App.css';

import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Profile from './Profile';
import Success from './Success';
import Error from './Error';
import Help from './Help';

function onAuthRequired({history}) {
    history.push('/login');
}

// Okta Config
const ISSUER = process.env.REACT_APP_ISSUER;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const BASE_URL = process.env.REACT_APP_BASE_URL;


class App extends Component {

    render() {

        return (
            <div>
                <Security   issuer={ISSUER}
                            client_id={CLIENT_ID}
                            redirect_uri={window.location.origin + '/implicit/callback'}
                            onAuthRequired={onAuthRequired} >
                    <Navbar/>
                    <Container text style={{marginTop: '5em'}}>
                        <Route path="/" exact component={Home}/>
                        <Route path="/implicit/callback" component={ImplicitCallback}/>
                        <Route path='/login' render={() => <Login baseUrl={BASE_URL}/>}/>
                        <Route path='/help' component={Help}/>
                        <SecureRoute path="/profile" component={Profile}/>
                        <SecureRoute path="/success" component={Success}/>
                        <SecureRoute path="/error" component={Error}/>
                    </Container>
                </Security>
            </div>
        );
    }
}

export default withRouter(App);