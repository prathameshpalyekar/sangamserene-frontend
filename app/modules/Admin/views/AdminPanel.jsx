import React, { Component } from 'react';
import '../less/AdminPanel.less';
import Header from 'modules/Header/views/Header';
import Footer from 'modules/Footer/views/Footer';
import firebase from 'firebase/app';
import firebaseUi from 'firebaseui';
import FirebaseConfig from 'config';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RoomsManager from './RoomsManager';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
        // this.onSuccess = this.onSuccess.bind(this);
        // this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    handleChange(event, value) {
        this.setState({
            value
        })
    }

    componentDidMount() {
        // const { Config, UiConfig } = FirebaseConfig;
        // firebase.initializeApp(Config);
        // firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
        // this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    render() {
        const { value } = this.state;
        return (
            <div className="admin-panel-container">
                <AppBar position="static">
                    <Toolbar className="-admin-panel-header">
                        <Typography variant="title" color="inherit" className="-admin-panel-title">
                            Admin Panel
                        </Typography>
                        <Button variant="extendedFab" className="-admin-panel-sign-out" onClick={this.props.signOut}>Sign Out</Button>
                    </Toolbar>
                </AppBar>
                <div className="-admin-content-container">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <Paper elevation={3}>
                                <div>
                                    <AppBar position="static" className="-admin-panel-board">
                                        <Tabs value={value} onChange={this.handleChange} fullWidth>
                                            <Tab label="Rooms Manager" className="-admin-tab"/>
                                            <Tab label="Item Two" className="-admin-tab"/>
                                            <Tab label="Item Three" className="-admin-tab"/>
                                        </Tabs>
                                    </AppBar>
                                    {value === 0 && <RoomsManager/>}
                                    {value === 1 && <TabContainer>Item Two</TabContainer>}
                                    {value === 2 && <TabContainer>Item Three</TabContainer>}
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

export default withRouter(AdminPanel);
