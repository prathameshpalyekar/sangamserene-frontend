import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-s-alert'

import StoreButtons from 'components/StoreButtons';
import Loader from 'components/Loader';

import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../constants/index.js';
import LoginForm from '../containers/LoginFormContainer.jsx';
import Config from '../../../config.js';

import LoginBg from '../images/bg-login-new.jpg';

export default class Login extends Component {

    constructor (props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isFetching) {
            const { router } = this.context;
            // Error condition should be before
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                if (nextProps.isAuthenticated) {
              //      router.replace(Config.LANDING_URL);
                }
            }
            this.setState({ submitted: false });
        }
    }

    render () {
        const { isFetching, isAuthenticated, isVerifyingLogin, location } = this.props;

        if (isAuthenticated) {
            const { state } = location;

            return <Redirect to={{
                pathname: state && state.from && state.from.pathname ? state.from.pathname : Config.LANDING_URL,
            }} />
        }

        const styles = {
            backgroundImage: `url(${LoginBg})`
        };

        return (
            <div className="login-page" style={styles}>
                <div className="-overlay"></div>
                <div className="page-content">
                    <div className="content">
                        <div className="login-page-head">
                            <h1>Anlita extrahjälp med kort varsel.</h1>
                            <p>I vår app kan du närsomhelst anlita vår proffsiga personal för extrajobb och -uppgifter.</p>
                        </div>
                        <div className="auth-box">
                            {isFetching || isVerifyingLogin
                                ? <Loader />
                                : <div>
                                    <LoginForm />
                                    <p>eller</p>
                                    <Link to="/join"
                                        className="btn btn-primary btn-block">Skapa ett nytt konto</Link>
                                </div>
                            }
                        </div>
                        <p>Ladda ned appen till mobilen.</p>
                        <StoreButtons appStoreUrl={APP_STORE_URL} googlePlayUrl={GOOGLE_PLAY_URL} />
                    </div>
                </div>
            </div>
        )
    }
}
