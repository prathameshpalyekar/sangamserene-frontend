import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Alert from 'react-s-alert';

import FC from 'components/Formsy';
import AwInputGroup from 'components/ui/AwInputGroup'
import Loader from 'components/Loader';
import Whiteboard from 'components/ui/Whiteboard';

import '../less/form.less';
import '../less/passwordChange.less';

class PasswordChangeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: true,
            submitted: false,
            showErrorNote: false,
        };

        this.onValid = this.onValid.bind(this);
        this.onInValid = this.onInValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValid() {
        this.setState({
            canSubmit: true,
            showErrorNote: false,
        });
    }

    onInValid() {
        this.setState({
            canSubmit: false,
            showErrorNote: true,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isFetching) {
            if (nextProps.errorMessage) {
                Alert.error(nextProps.errorMessage);
            } else if (nextProps.updateSuccess) {
                this.refs.form.reset();
                Alert.success('Ditt lösenord är nu uppdaterat');
            }
            this.setState({ submitted: false});
            return false;
        }
    }

    onSubmit(model) {
        this.props.updatePassword(model);
        this.setState({ submitted: true });
        return false;
    }

    render() {
        const { showErrorNote } = this.state;

        return (
            <div className="form-inner-container password-change-form-wrap -sep-bottom">
                <Whiteboard.Stubs noTopPadding={true}>
                    <Whiteboard.SubTitle>Uppdatera Lösenord</Whiteboard.SubTitle>
                    <Formsy className="form passowrd-change-form" onValidSubmit={this.onSubmit} onValid={this.onValid} onInvalid={this.onInValid} ref="form">
                        <FC.Input required
                            label="Skriv in ditt nuvarande lösenord"
                            name="old_password"
                            placeholder="Nuvarande lösenord"
                            type="password"
                            validations="maxLength:15"
                            className="form-control input-lg"/>
                        <AwInputGroup
                            title="Skriv in nytt lösenord *" inputProps={[
                                {
                                    layout: "elementAndError",
                                    name: "password",
                                    placeholder: "Nytt lösenord",
                                    type: "password",
                                    required: true,
                                    className: "form-control input-lg",
                                    validations: "minLength:3,maxLength:15",
                                },
                                {
                                    layout: "elementAndError",
                                    name: "confirm_password",
                                    placeholder: "Bekräfta nytt lösenord",
                                    validations: "mustMatch:password",
                                    type: "password",
                                    required: true,
                                    className: "form-control input-lg",
                                }
                            ]} />
                        {
                            showErrorNote
                            ?
                            <div className="well well-sm well-note text-center">
                                <p>Ditt lösenord måste vara mindre än 15 och mer än 3 karaktärer långt.</p>
                            </div>
                            :
                            null
                        }
                        <div className="text-right">
                            <div className="-submit-wrap">
                                <button type="submit" className="btn btn-primary btn-filled  -btn-submit" disabled={!this.state.canSubmit}>Uppdatera lösenord</button>
                            </div>
                        </div>
                    </Formsy>
                </Whiteboard.Stubs>
            </div>
        );
    }
}

export default PasswordChangeForm;
