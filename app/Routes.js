import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Intercom, { IntercomAPI } from 'react-intercom';
import { isMobile } from "react-device-detect";
import cx from 'classnames';
import TagManager from 'react-gtm-module';

import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import CookieDisclaimer from 'components/CookieDisclaimer';
import Loader from 'components/Loader';

import LoginContainer from 'modules/Auth/containers/LoginContainer.jsx';
import Home from 'modules/Home/views/Home.jsx';
import AboutUs from 'modules/AboutUs/views/AboutUs.jsx';
import RoomsRates from 'modules/Rooms&Rates/views/Rooms&Rates.jsx';
import Restaurants from 'modules/Restaurants/views/Restaurants.jsx';
import SightSeeing from 'modules/SightSeeing/views/SightSeeing.jsx';
import Gallery from 'modules/Gallery/views/Gallery.jsx';
import Directions from 'modules/Directions/views/Directions.jsx';
import Booking from 'modules/Booking/views/Booking.jsx';
import Terms from 'modules/Terms/views/Terms.jsx';
import Admin from 'modules/Admin/views/Admin.jsx';
import BookingPanel from 'modules/BookingPanel/views/BookingPanel.jsx';
import PostBooking from 'modules/PostBooking/views/PostBooking.jsx';
import PreBooking from 'modules/PreBooking/views/PreBooking.jsx';

import SignUpContainer from 'modules/Auth/containers/SignUpContainer.jsx';
import ForgotPasswordContainer from 'modules/Auth/containers/ForgotPasswordContainer.jsx';

import DashboardContainer from 'modules/ClientDashboard/containers/DashboardContainer.jsx';

import MenuBar from 'modules/Common/containers/Menu/MenuContainer.jsx';
import UserInfo from 'modules/ClientDashboard/containers/UserInfoContainer.jsx';

import MobileView from 'components/MobileView';

import { verifyLogin } from './modules/Auth/actions/login.js';
import { logout } from './modules/Auth/actions/logout.js';
import Config from './config.js';

import SocketConnect from 'components/Socket/connect';

// import firebase from "firebase";

// const config = {
//     apiKey: "AIzaSyCiwvs6pLVSRbT2S9Sahb6cRVXZkWJq7AQ",
//     authDomain: "sangamserene-india.firebaseapp.com",
//     databaseURL: "https://sangamserene-india.firebaseio.com",
//     projectId: "sangamserene-india",
//     storageBucket: "sangamserene-india.appspot.com",
//     messagingSenderId: "248823128879"
// };

const tagManagerArgs = {
    gtmId: Config.GTM_ID
}

class Routes extends Component {

    constructor (props) {
        super(props);

        this.state = {
            initialized: false,
        };
    }

    componentDidMount() {
        // firebase.initializeApp(config);
    }

    render () {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={(props) => (<Home isMobile={isMobile}/>)}/>
                    <Route exact path="/about" render={(props) => (<AboutUs isMobile={isMobile}/>)}/>
                    <Route exact path="/rooms" render={(props) => (<RoomsRates isMobile={isMobile}/>)}/>
                    <Route path="/restaurant" render={(props) => (<Restaurants isMobile={isMobile}/>)}/>
                    <Route exact path="/activities" render={(props) => (<SightSeeing isMobile={isMobile}/>)}/>
                    <Route exact path="/gallery" render={(props) => (<Gallery isMobile={isMobile}/>)}/>
                    <Route exact path="/contact" render={(props) => (<Directions isMobile={isMobile}/>)}/>
                    <Route path="/booking" render={(props) => (<Booking isMobile={isMobile}/>)}/>
                    <Route path="/terms" render={(props) => (<Terms isMobile={isMobile}/>)}/>
                    <Route path="/admin" render={(props) => (<Admin isMobile={isMobile}/>)}/>
                    <Route path="/confirm-booking" render={(props) => (<BookingPanel isMobile={isMobile}/>)}/>
                    <Route path="/post-booking" render={(props) => (<PostBooking isMobile={isMobile}/>)}/>
                    <Route path="/pre-booking" render={(props) => (<PreBooking isMobile={isMobile}/>)}/>
                </Switch>
            </div>
        );
    }
}

// class Routes extends Component {

//     constructor (props) {
//         super(props);

//         this.state = {
//             initialized: false,
//         };
//     }

//     componentWillMount () {
//         const { verifyLogin } = this.props;
//         verifyLogin();
//     }

//     componentDidMount () {
//         TagManager.initialize(tagManagerArgs);
//     }

//     componentWillReceiveProps (nextProps) {
//         if (nextProps.loggedOut) {
//             // Hard refresh
//             window.location = '/';
//             return false;
//         }
//         if (this.props.isAuthenticated === false && nextProps.isAuthenticated) {
//             SocketConnect();
//         }
//     }

//     renderRoutes () {
//         return (
//             <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route exact path="/join" component={SignUpContainer} />
//                 <Route exact path="/forgot-password" component={ForgotPasswordContainer} />
//                 <Route path="/dashboard" component={DashboardContainer} />
//             </Switch>
//         );
//     }

//     render () {
//         const { user, isVerifyingLogin, isAuthenticated, logout } = this.props;
//         let intercomUser = null;
//         if (user) {
//             intercomUser  = {
//                user_id: user.get('id'),
//                email: user.get('email'),
//                name: `${user.get('firstName')} ${user.get('lastName')}`
//            };
//         } else {
//             IntercomAPI('shutdown');
//         }
//         const contentClassNames = cx('main-cont', {
//             'mobile-view': isMobile
//         });

//         const showUserMenu = user && isAuthenticated && user.size;

//         return (
//             <div className={contentClassNames}>
//                 {
//                     intercomUser ?
//                     <Intercom appID={Config.INTERCOM_APP_ID} {...intercomUser} className="loggedIn"/>
//                     :
//                     <Intercom appID={Config.INTERCOM_APP_ID} className="loggedOut"/>
//                 }
//                 <CookieDisclaimer/>

//                 <GlobalHeader
//                     columnOne={showUserMenu ? <Link to={`/dashboard/jobs/create`} className="btn btn-primary btn-filled btn-block create-job-link">Skapa nytt jobb</Link> : null}
//                     columnTwo={showUserMenu ? <MenuBar /> : null}
//                     columnThree={showUserMenu ? <UserInfo /> : null}
//                 />
//                 {
//                     isMobile ?
//                     <MobileView />
//                     :
//                     this.renderRoutes()
//                 }
//                 <GlobalFooter user={user} logout={logout} />
//             </div>
//         );
//     }
// }

// export default Routes;

const mapStateToProps = state => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isVerifyingLogin: state.getIn(['auth', 'isVerifyingLogin']),
        isLoggedOut: state.getIn(['auth', 'loggedOut']),
        user: state.getIn(['auth', 'user']),
        // isFetching: state.getIn(['auth', 'isFetching']),
        // errorMessage: state.getIn(['auth', 'errorMessage']),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyLogin () {
            dispatch(verifyLogin());
        },
        logout () {
            dispatch(logout());
        },
    };
};

const RoutesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));

export default RoutesContainer;
