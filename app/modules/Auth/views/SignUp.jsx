import React, { Component } from 'react';

import SignUpFormContainer from '../containers/SignUpFormContainer.jsx';

export default class SignUp extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="page-content">
                <div className="content">
                    <h1 className="-title text-center">Skapa företagskonto</h1>
                    <SignUpFormContainer />
                </div>
            </div>
        );
    }
}
