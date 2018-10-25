import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Link } from 'react-router-dom'

import Alert from 'react-s-alert';

import FC from 'components/Formsy';
import AwInputGroup from 'components/ui/AwInputGroup';
import Config from '../../../config';

import '../less/ForgotPasswordForm.less';

export default class LoginForm extends Component {

    constructor (props) {
        super(props);

        this.state = {
            canSubmit: true,
            submitted: false
        };

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.requested) {
            if (nextProps.failedMessage) {
                Alert.error(nextProps.failedMessage);
                this.setState({ submitted: false});
                return false;
            }
            // this.setState({ submitted: false});
        }
    }

    onSubmit(model) {
        const { forgotPassword } = this.props;

        forgotPassword(model);

        this.setState({ submitted: true });
        return false;
    }

    render () {
        const { submitted } = this.state;
        const { success } = this.props;

        return (
            submitted && success ?
            <p>Information om hur du återställer ditt lösenord har skickats till din epostadress</p>
            :
            <Formsy className="form forgot-password-form"
                onValidSubmit={this.onSubmit}
                 onValid={this.enableButton} onInvalid={this.disableButton}>
                    <FC.Input
                        label="Vilken är din mailadress?"
                        name="email"
                        placeholder="Din epost"
                        type="email"
                        validations="isEmail"
                        className="form-control input-lg" />
                <button
                    type="submit"
                    className="btn btn-primary btn-filled btn-block -btn-submit">Skicka lösenord</button>
            </Formsy>
        );
    }
}
