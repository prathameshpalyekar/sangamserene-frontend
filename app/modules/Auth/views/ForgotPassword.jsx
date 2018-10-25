import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordFormContainer from '../containers/ForgotPasswordFormContainer.jsx';

export default class ForgotPassword extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="page-content">
                <div className="content">
                    <h1 className="-title text-center">Glömt ditt lösenord?</h1>
                    <p className="text-center">Skriv in den mailadress du avnände för att skapa kontot och som är ditt användarnamn, så får du ett mail om hur du skapar ett nytt lösenord.</p>
                    <div className="auth-box">
                    <ForgotPasswordFormContainer />
                    <p>Har du redan ett konto? <Link to="/" className="plain-link">Logga in</Link>
                    </p>
                    </div>
                </div>
            </div>
        );
    }
}
