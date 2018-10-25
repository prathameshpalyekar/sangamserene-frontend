import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import TagManager from 'react-gtm-module';

import FC from 'components/Formsy';
import AwInputGroup from 'components/ui/AwInputGroup';

import '../less/LoginForm.less';
import Config from '../../../config';

const gtmLoginArgs = {
    dataLayer: {
        event: 'login',
        label: 'Logga in'
    },
    dataLayerName: 'PageEvents'
}

export default class LoginForm extends Component {

    constructor (props) {
        super(props);

        this.state = {
            submitted: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { router } = this.context;
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            router.replace(Config.LANDING_URL);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.submitted && !nextProps.isFetching) {
            const { router } = this.context;
            // Error condition should be before
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                if (nextProps.isAuthenticated) {
                    router.replace(Config.LANDING_URL);
                }
            }
            this.setState({ submitted: false });
        }
    }

    onSubmit(model) {
        const { login } = this.props;

        login(model);

        TagManager.dataLayer(gtmLoginArgs);

        this.setState({ submitted: true });

        return false;
    }

    render () {
        return (
            <Formsy className="form login-form" onValidSubmit={this.onSubmit}>
                <AwInputGroup
                    title="Fyll i dina inloggningsuppgifter" inputProps={[
                        { layout: "elementOnly", name: "email", placeholder: "Epost-adress…", type: "email", required: true, className: "form-control input-lg"},
                        { layout: "elementOnly", name: "password", placeholder: "Lösenord…", type: "password", required: true, className: "form-control input-lg"}
                    ]} />
                <div className="plain-link-wrap">
                    <Link to="/forgot-password" className="plain-link">Glömt ditt lösenord?</Link>
                    {/* <Link to="/dashboard/my-jobs" className="plain-link">...My Jobs Dashboard</Link> */}
                </div>
                <button type="submit" className="btn btn-primary btn-filled btn-block -btn-submit">Logga in</button>
            </Formsy>
        );
    }
}
