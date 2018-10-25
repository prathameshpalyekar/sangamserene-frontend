import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loader from 'components/Loader';

import LeftSideBar from '../containers/LeftSideBarContainer.jsx';
import RightSideBar from '../containers/RightSideBarContainer.jsx';
import JobsList from '../../Jobs/containers/JobsListContainer.jsx';
import JobDetailContainer from '../../Jobs/containers/JobDetailContainer.js';
import CreateJobContainer from '../../Jobs/containers/CreateJobContainer.jsx';
import TimeReportContainer from '../../TimeReport/containers/TimeReportContainer.jsx';
import CandidatesList from '../../Candidates/containers/CandidatesListContainer.jsx';

import UserProfile from '../../MyPages/containers/UserProfileContainer.jsx';
import ChatContainer from '../../Chat/containers/ChatContainer.jsx';
import NotificationsContainer from '../../Notifications/containers/NotificationsContainer.jsx';
import ConversationListContainer from '../../Chat/containers/ConversationListContainer.jsx';
import CandidateReviewFormContainer from '../../Candidates/containers/CandidateReviewFormContainer.jsx';
import ReviewsContainer from '../../Reviews/containers/ReviewsContainer.jsx';
import CandidatesContainer from '../../Candidates/containers/CandidatesContainer.jsx';
import Settings from '../../MyPages/views/Settings.jsx';

import Whiteboard from 'components/ui/Whiteboard';

import '../less/Dashboard.less';

class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { isAuthenticated, isVerifyingLogin, location, match: { path, url } } = this.props;

        if (!isAuthenticated && !isVerifyingLogin) {
            return <Redirect to={{
                pathname: '/',
                state: {
                    from: location,
                },
            }} />
        }

        if (location.pathname === path) {
            return <Redirect to={{
                pathname: `${path}/jobs/open`,
            }} />
        }

        return (
            <div className="site-content">
                <div className="container dashboard-container">
                    <div className="row">
                        <div className="custom-col-small">
                            {
                                location.pathname.match('^/dashboard/chat')
                                ?
                                <ConversationListContainer />
                                :
                                <LeftSideBar />
                            }
                        </div>
                        <div className="custom-col-wide center-content">
                        <Whiteboard>
                            {isVerifyingLogin
                                ? <Loader />
                                : <Switch>
                                    <Route path={`${path}/jobs/create`} component={CreateJobContainer} />
                                    <Route path={`${path}/jobs/:type(draft|open|confirmed|completed)`} component={JobsList} />
                                    <Route path={`${path}/jobs/:id`} exact component={JobDetailContainer} />
                                    <Route path={`${path}/jobs/:id/edit`} component={CreateJobContainer} />
                                    <Route path={`${path}/jobs/:copyId/copy`} component={CreateJobContainer} />
                                    <Route path={`${path}/jobs/:id/time-report`} component={TimeReportContainer} />
                                    <Route path={`${path}/job/:id/candidates/:type(matching|applied|offersent|hired)`} component={CandidatesList} />
                                    <Route path={`${path}/user/profile`} component={UserProfile} />
                                    <Route path={`${path}/settings`} component={Settings} />
                                    <Route path={`${path}/chat/broadcast/new`} component={ChatContainer} />
                                    <Route path={`${path}/chat/new`} component={ChatContainer} />
                                    <Route path={`${path}/chat/:id`} component={ChatContainer} />
                                    <Route path={`${path}/chat`} component={ChatContainer} />
                                    <Route path={`${path}/notifications`} component={NotificationsContainer} />
                                    <Route path={`${path}/review/candidate/:id`} component={CandidateReviewFormContainer} />
                                    <Route path={`${path}/reviews`} component={ReviewsContainer} />
                                    <Route path={`${path}/candidates/:type(saved|hired)`} component={CandidatesContainer} />
                                </Switch>
                            }
                        </Whiteboard>
                        </div>
                        <div className="custom-col-small">
                            <RightSideBar />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
