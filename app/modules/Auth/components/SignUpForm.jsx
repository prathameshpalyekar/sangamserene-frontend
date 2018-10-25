import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Formsy from 'formsy-react';
import Alert from 'react-s-alert';
import TagManager from 'react-gtm-module';

import FC from 'components/Formsy';
import AwInputGroup from 'components/ui/AwInputGroup'

import Config from '../../../config';

import '../less/SignUpForm.less';

const gtmSignupArgs = {
    dataLayer: {
        event: 'create_account',
        label: 'Skapa konto'
    },
    dataLayerName: 'PageEvents'
}

class SignUpForm extends Component {

    constructor (props) {
        super(props);

        this.state = {
            canSubmit: true,
            submitted: false,
            showErrorModal: false
        };

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    componentWillReceiveProps(nextProps) {
        const { submitted } = this.state;
        const { requested } = this.props;

        if (requested && !nextProps.requested) {
            if (nextProps.failed && nextProps.failedMessage) {
                Alert.error(nextProps.failedMessage);
            }

            this.setState({ submitted: false});
        }
    }


    onSubmit(model) {
        const { signUp } = this.props;

        if (!model.password || model.password.length < 3) {
            return Alert.error('Lösenordet måste vara längre än 3 karaktärer långt.');
        }

        signUp(model);

        TagManager.dataLayer(gtmSignupArgs);

        this.setState({ submitted: true });
        return false;
    }

    closeErrorModal() {
        this.setState({ showErrorModal: false })
    }

    render () {
        const { success } = this.props;

        if (success) {
            return <Redirect to={{
                pathname: Config.LANDING_URL,
            }} />
        }
        return (
            <div>
                <Formsy className="form signup-form" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                    <div className="row">
                        <div className="col-md-6">
                            <AwInputGroup
                                title="Vad heter du?" inputProps={[
                                    { layout: "elementAndError", name: "firstName", placeholder: "Ditt namn", type: "text", required: true, className: "form-control input-lg"},
                                    { layout: "elementAndError", name: "lastName", placeholder: "Efternamn", type: "text", required: true, className: "form-control input-lg"}
                                ]} />
                            <FC.Input required
                                label="Vad heter din organisation eller ditt företag?"
                                name="company"
                                placeholder="Företagsnamn"
                                type="text"
                                validations="maxLength:255"
                                className="form-control input-lg"/>
                        </div>
                        <div className="col-md-6">
                            <FC.Input required
                                name="email"
                                label="Vilken är din mailadress?"
                                placeholder="Din epost"
                                type="email"
                                validations="isEmail"
                                className="form-control input-lg"/>

                            <AwInputGroup title="Skapa ditt lösenord" inputProps={[
                                {
                                    layout: "elementAndError",
                                    name: "password",
                                    placeholder: "Lösenord",
                                    type: "password",
                                    required: true,
                                    className: "form-control input-lg",
                                    validations: "minLength:3",
                                },
                                {
                                    layout: "elementAndError",
                                    name: "confirm_password",
                                    placeholder: "Bekräfta lösenord",
                                    validations: "minLength:3,mustMatch:password",
                                    type: "password",
                                    required: true,
                                    className: "form-control input-lg"
                                }
                            ]} />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="-accept-terms-wrap">
                            <FC.Checkbox required
                                name="acceptTerms"
                                validations="mustBeChecked"
                                errorMessage="Du måste godkänna villkoren"
                                className="form-control input-lg">
                                Jag har läst och godkänner <a href="https://www.instajobs.com/about/privacy-policy" target="_blank">PUL</a> och <a href="https://www.instajobs.com/about/anvandarvillkor" target="_blank">användarvillkoren</a>
                            </FC.Checkbox>
                        </div>
                        <hr className="horizontal-separator visible-xs" />
                        <div className="-submit-wrap">
                            <button type="submit" className="btn btn-primary btn-filled btn-block -btn-submit" disabled={!this.state.canSubmit}>Klart!</button>
                            <p>Har du redan ett konto? <Link to="/">Logga in</Link></p>
                        </div>
                        <hr className="horizontal-separator visible-xs" />
                    </div>
                </Formsy>
            </div>
        );
    }
}

export default SignUpForm;
