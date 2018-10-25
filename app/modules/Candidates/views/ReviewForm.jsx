import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Alert from 'react-s-alert'

import BackButton from 'components/BackButton';
import Loader from 'components/Loader';
import Whiteboard from 'components/ui/Whiteboard';
import AwImageCaption from 'components/ui/AwImageCaption';
import StarRating from 'components/StarRating';
import FC from 'components/Formsy';

import '../less/ReviewForm.less';

class ReviewForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            canSubmit: true,
            submitted: false,
        };

        this.saveRating = this.saveRating.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount () {
        const { match: { params } } = this.props;
        this.props.candidateProfile(params.id);
    }

    componentWillReceiveProps (nextProps) {
        const { submitReviewError, submitReviewSuccess } = this.props;
        const submitReviewErrorNew = nextProps.submitReviewError;
        const submitReviewSuccessNew = nextProps.submitReviewSuccess;

        if (!submitReviewError && submitReviewErrorNew) {
            Alert.error(submitReviewErrorNew);
            return false;
        }

        if (!submitReviewSuccess && submitReviewSuccessNew) {
            Alert.success('Här kan du ändra dina kontoinställningar');
            this.props.goBack();
        }
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    onSubmit(model) {
        const { match: { params }, location } = this.props;

        if (location.state && location.state.jobId) {
            this.props.createReviewForJob(model, location.state.jobId, params.id);
        } else {
            this.props.createReview(model, params.id);
        }
    }

    saveRating(value) {
        this.setState({rating:value});
    }

    render() {
        const { isFetching, candidate } = this.props;

        if (isFetching || candidate === undefined) {
            return (
                <Loader />
            );
        }

        return (
            <div>
                <div className="center-content-section"><BackButton /></div>
                <Whiteboard.Stubs noTopPadding={true}>
                    <h1 className="whiteboard-title">Ge ETT OMDÖME</h1>
                    <AwImageCaption image={candidate.profilePic} title={`${candidate.firstName} ${candidate.lastName}`} subTitle={`${candidate.address}`} />
                </Whiteboard.Stubs>
                <div className="review-form-wrap">
                    <Formsy
                        className="form review-form"
                        onValidSubmit={this.onSubmit}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton} >
                        <label>Klicka på antal stjärnor du vill ge i betyg</label>
                        <StarRating rate={true} ratingValue={this.state.rating} saveValue={this.saveRating} />
                        <FC.Input required
                            name="rating"
                            type="hidden"
                            value={this.state.rating ? this.state.rating : ''}
                        />
                        <FC.Textarea required
                            placeholder={`Att ge ett omdöme är ett bra sätt att tacka konsulten för väl utfört jobb, och signalera till andra som vill anställa konsulten i framtiden. Att ge konstruktiv feedback kan likaså hjälpa konsulten i framtiden. `}
                            label={`Skriv ett omdöme`}
                            validations="maxLength:255"
                            name="text">
                        </FC.Textarea>
                        <button type="submit" className="btn btn-primary btn-filled btn-block -btn-submit" disabled={!this.state.canSubmit}>Ge ett omdöme</button>
                    </Formsy>
                </div>
            </div>
        );
    }
}

export default ReviewForm;
