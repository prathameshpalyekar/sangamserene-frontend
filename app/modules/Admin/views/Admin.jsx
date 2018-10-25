import React, { Component } from 'react';
import '../less/Admin.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import firebase from 'firebase/app';
import firebaseUi from 'firebaseui';
import FirebaseConfig from 'config';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import AdminPanel from './AdminPanel';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onSuccess = this.onSuccess.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    componentDidMount() {
        const { Config, UiConfig } = FirebaseConfig;
        firebase.initializeApp(Config);
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    onAuthStateChanged(user) {
        if (user) {
            const { email } = user;
            const { ADMIN_EMAIL } = FirebaseConfig.Config;
            if (ADMIN_EMAIL !== email) {
                firebase.auth().signOut().then(() => {
                    window.location.reload();
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                this.setState({
                    user
                });
            }
        } else {
            const { UiConfig } = FirebaseConfig;
            UiConfig.signInOptions = [firebase.auth.GoogleAuthProvider.PROVIDER_ID];
            UiConfig.callbacks.signInSuccessWithAuthResult = this.onSuccess;
            this.ui.start('#firebaseui-auth-container', UiConfig);
        }
    }

    onSuccess(authResult, redirectUrl) {
        const { user } = authResult;
        const { email } = user;
        const { ADMIN_EMAIL } = FirebaseConfig.Config;
        this.setState({
            user
        });
        return false;
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { user } = this.state;
        const authContainerClass = cx('', {
            hide: !!user
        });
        const { ADMIN_EMAIL } = FirebaseConfig.Config;
        let isAdmin = false;
        if (user) {
            const { ADMIN_EMAIL } = FirebaseConfig.Config;
            const { email } = user;
            isAdmin = ADMIN_EMAIL === email;
        }

        return (
            <div className="-admin-container">
                <div id="firebaseui-auth-container" className={authContainerClass}>
                    <div className="-loader">Loading ... </div>
                </div>
                {user && isAdmin ? <AdminPanel signOut={this.signOut}/> : null}
            </div>
        )
    }
}

export default withRouter(Admin);
