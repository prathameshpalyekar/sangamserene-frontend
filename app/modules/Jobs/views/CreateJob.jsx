import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { matchPath } from 'react-router'
import Alert from 'react-s-alert';
import TagManager from 'react-gtm-module';
import Immutable from 'immutable';
import moment from 'moment';

import BackButton from 'components/BackButton';
import Loader from 'components/Loader';
import Config from '../../../config';

import ServicePickerContainer from '../containers/CreateJobServicePickerContainer.jsx';
import JobTypeAndTimingsContainer from '../containers/CreateJobTypeAndTimingsContainer.jsx';
import DetailsFormContainer from '../containers/CreateJobDetailsFormContainer.jsx';
import PreviewContainer from '../containers/CreateJobPreviewContainer.jsx';
import EditPublishJobContainer from '../containers/EditPublishJobContainer.jsx';
import CopyJobContainer from '../containers/CopyJobContainer.jsx';

import JobDate from '../components/JobDate.jsx';

import '../less/CreateJob.less';

const gtmCreateJobArgs = {
    dataLayer: {
        event: 'create_new_job',
        label: 'Skapa nytt jobb'
    },
    dataLayerName: 'PageEvents'
}

class CreateJob extends Component {

    constructor(props) {
        super(props);

        props.resetForm();
        this.initializeForm();
    }

    initializeForm (job) {
        const { match: { params }, location } = this.props;

        if (params.id) {
            if (job) {
                this.props.initializeForm(job);
            }
        } else if(params.copyId) {
            if (job) {
                const dates = Immutable.fromJS([]);
                job = job.set('status', 'draft').delete('id').set('dates', dates);
                this.props.initializeForm(job);
            }
        }  else {
            this.props.initializeForm();
        }
    }

    componentWillMount () {
        this.props.fetchJob();

        TagManager.dataLayer(gtmCreateJobArgs);
    }

    componentWillReceiveProps (nextProps) {
        const { isFetching, isSaving, navigateBack, job, copyJob, copyJobIsFetching } = this.props;
        const { location, match: { params } } = nextProps;

        if (copyJobIsFetching && !nextProps.isFetching && nextProps.copyJob) {
            this.initializeForm(nextProps.copyJob);
            return;
        } else if (isFetching && !nextProps.isFetching && nextProps.job) {
            this.initializeForm(nextProps.job);
            return;
        } else if (params.copyId !== this.props.match.params.copyId) {
            this.props.fetchJob(params.copyId);
            return;
        }

        if (isSaving && !nextProps.isSaving) {
            if (nextProps.saveError) {
                Alert.error(nextProps.saveError);
                return;
            }

            navigateBack(nextProps.job.toJS());
            return;
        }
    }

    render() {
        const { isFetching, job, copyJob, fetchError, match: { path, params }, location } = this.props;

        if ( ((params.id) && (isFetching || !job)) || ((params.copyId) && (isFetching || !copyJob)) ) {
            return (
                <Loader />
            );
        }

        const isEditingPublishJob = params.id && job && job.get('status') !== 'draft';
        const isEditingCopyJob = params.copyId && copyJob;

        const showBackButton = isEditingPublishJob || isEditingCopyJob || !matchPath(location.pathname, {
            path,
            exact: true,
            strict: false,
        });

        const jobCopiedFrom = copyJob ? copyJob.toJS() : null;

        return (
            <div>
                { showBackButton ? <div className="center-content-section"><BackButton /></div> : null }
                <div className="create-job">
                    {
                        jobCopiedFrom
                        ?
                        <div className="center-content-section text-center copy-job-text">
                            <p>Detta är en kopia av:</p>
                            <div className="cop-job-service-name">{jobCopiedFrom.service.name},&nbsp;</div>
                            <JobDate job={jobCopiedFrom} hideInfo="true" />
                        </div>
                        :
                        null
                    }
                    <Switch>
                        <Route path={`${path}/preview`} component={PreviewContainer} />
                        <Route path={`${path}/details`} component={DetailsFormContainer} />
                        <Route path={`${path}/timings`} component={JobTypeAndTimingsContainer} />
                        <Route path={`${path}/copy-job`} component={CopyJobContainer} />
                        <Route path={`${path}`} component={isEditingPublishJob ? EditPublishJobContainer : ServicePickerContainer} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default CreateJob;
