import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Formsy from 'formsy-react';
import Alert from 'react-s-alert';

import FC from 'components/Formsy';
import AwInputGroup from 'components/ui/AwInputGroup'
import Loader from 'components/Loader';
import PictureChanger from 'components/PictureChanger';

import '../less/form.less';


class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: true,
            submitted: false
        };

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.pictureChanged = this.pictureChanged.bind(this);
    }

    pictureChanged(file) {
        this.props.updateUserAvatar(this.props.user.get('id'), file);
    }

    enableButton() {
        this.setState({canSubmit: true});
    }

    disableButton() {
        this.setState({canSubmit: false});
    }

    componentWillReceiveProps(nextProps) {
        const { location } = this.props;
        if (this.state.submitted && !nextProps.isFetching) {
            if (nextProps.errorMessage) {
                Alert.error(nextProps.errorMessage);
            } else if (nextProps.updateProfileSuccess) {
                Alert.success('Din profil har uppdaterats');
                if (location.state && location.state.pathname) {
                    this.props.profileUpdated(location.state);
                }
            }
            this.setState({ submitted: false});
            return false;
        }

        const { fetchingAvatarError, fetchingAvatarSuccess } = this.props;
        const fetchingAvatarErrorNew = nextProps.fetchingAvatarError;
        const fetchingAvatarSuccessNew = nextProps.fetchingAvatarSuccess;

        if (!fetchingAvatarError && fetchingAvatarErrorNew) {
            Alert.error(fetchingAvatarErrorNew);
            return false;
        }

        if (!fetchingAvatarSuccess && fetchingAvatarSuccessNew) {
            Alert.success('Din profilbilden är nu ändrad');
        }
    }

    onSubmit(model) {
        const { updateProfile, user } = this.props;

        const userId = user.get('id');

        updateProfile(userId, model);

        this.setState({ submitted: true });
        return false;
    }

    render () {
        const { updateProfileSuccess , user, isFetching, location, isFetchingAvatar } = this.props;

        const billingInfo = user.getIn(['employerInfo', 'billingInfo']);
        const companyName = user.getIn(['employerInfo', 'companyName']);

        const profilePic = user.get('profilePic');

        const pictureChangeText = isFetchingAvatar ? 'Laddar...' : 'Byt bild';

        return (
            <div className="form-container">
                <div className="form-head text-center content">
                    <h1 className="-title">Min profil</h1>
                </div>
                <PictureChanger profilePic={profilePic} type="circular" btnText={pictureChangeText} pictureChanged={this.pictureChanged} />
                <Formsy className="form profile-form" onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                    <div className="form-inner-container">
                        <div className="row">
                            <div className="col-md-6">
                                <AwInputGroup
                                    title="Ditt namn" inputProps={[
                                        {
                                            layout: "elementAndError",
                                            name: "firstName",
                                            value: user.get('firstName'),
                                            placeholder: "Förnamn",
                                            type: "text",
                                            required: true,
                                            className: "form-control input-lg"
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "lastName",
                                            value: user.get('lastName'),
                                            placeholder: "Efternamn",
                                            type: "text",
                                            required: true,
                                            className: "form-control input-lg"
                                        }
                                    ]} />
                                <AwInputGroup
                                    title="Dina kontaktuppgifter" inputProps={[
                                        {
                                            layout: "elementAndError",
                                            name: "email",
                                            value: user.get('email'),
                                            placeholder: "Epost-adress",
                                            type: "email",
                                            required: true,
                                            disabled: true,
                                            validations: "isEmail",
                                            className: "form-control input-lg"
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "phoneNumber",
                                            value: user.get('phoneNumber'),
                                            placeholder: "Telefonnummer",
                                            type: "text",
                                            required: true,
                                            validations:{matchRegexp: /^[0-9+\- ]*$/},
                                            className: "form-control input-lg"
                                        }
                                    ]} />
                            </div>
                            <div className="col-md-6">
                                <FC.Input required
                                    label="Företagsnamn"
                                    name="company"
                                    value={companyName}
                                    placeholder="Företagsnamn"
                                    type="text"
                                    validations="maxLength:255"
                                    className="form-control input-lg"/>

                                <AwInputGroup title="Adress till arbetsplatsen" inputProps={[
                                    {
                                        layout: "elementAndError",
                                        name: "address",
                                        value: user.get('address'),
                                        placeholder: "Adress",
                                        type: "text",
                                        required: true,
                                        validations: "maxLength:40",
                                        className: "form-control input-lg",
                                    },
                                    {
                                        layout: "elementAndError",
                                        name: "zipCode",
                                        value: user.get('zipCode'),
                                        placeholder: "Postnr ex. 12345",
                                        type: "text",
                                        required: true,
                                        validations: "isPostNbr",
                                        className: "form-control input-lg",
                                    },
                                    {
                                        layout: "elementAndError",
                                        name: "place",
                                        value: user.get('place'),
                                        placeholder: "Ort",
                                        type: "text",
                                        required: true,
                                        validations: "maxLength:40",
                                        className: "form-control input-lg"
                                    }
                                ]} />
                            </div>
                        </div>
                    </div>
                    <div className="-hightlight">
                        <div className="form-inner-container">
                            <div className="row">
                                <div className="col-md-6">
                                    <AwInputGroup title="Fakturainformation" inputProps={[
                                        {
                                            layout: "elementAndError",
                                            name: "billingInfoCompanyName",
                                            value: billingInfo.get('companyName'),
                                            placeholder: "Bolagsnamn",
                                            type: "text",
                                            required: true,
                                            validations: "maxLength:255",
                                            className: "form-control input-lg",
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "invoiceEmail",
                                            value: billingInfo.get('invoiceEmail'),
                                            placeholder: "Mail för e-faktura",
                                            type: "email",
                                            validations: "isEmail",
                                            required: true,
                                            className: "form-control input-lg",
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "invoiceAddress",
                                            value: billingInfo.get('invoiceAddress'),
                                            placeholder: "Fakturaadress",
                                            type: "text",
                                            required: true,
                                            className: "form-control input-lg"
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "invoiceZipCode",
                                            value: billingInfo.get('invoiceZipCode'),
                                            placeholder: "Postnr ex. 12345",
                                            type: "text",
                                            required: true,
                                            validations: "isPostNbr",
                                            className: "form-control input-lg"
                                        }
                                    ]} />
                                </div>
                                <div className="col-md-6">
                                    <AwInputGroup title="&nbsp;" inputProps={[
                                        {
                                            layout: "elementAndError",
                                            name: "invoicePlace",
                                            value: billingInfo.get('invoicePlace'),
                                            placeholder: "Ort",
                                            type: "text",
                                            required: true,
                                            className: "form-control input-lg",
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "invoiceVat",
                                            value: billingInfo.get('invoiceVat'),
                                            placeholder: "VAT ex. SE123456789101",
                                            type: "text",
                                            required: true,
                                            validations: "isVat",
                                            className: "form-control input-lg",
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "invoiceRef",
                                            value: billingInfo.get('invoiceRef'),
                                            placeholder: "Referens på faktura",
                                            type: "text",
                                            required: true,
                                            validations: "maxLength:25",
                                            className: "form-control input-lg"
                                        },
                                        {
                                            layout: "elementAndError",
                                            name: "corporateNum",
                                            value: billingInfo.get('corporateNum'),
                                            placeholder: "Organisationsnummer",
                                            type: "text",
                                            required: true,
                                            validations: "isOrgNumber",
                                            className: "form-control input-lg"
                                        }
                                    ]} />
                                    <div className="vat-link-wrap">
                                        <a href="https://intercom.help/instajobs/for-foretag-och-kunder/fakturering/vad-ar-vat" target="_blank" className="vat-link">Läs mer om VAT</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="-submit-wrap">
                            <button type="submit" className="btn btn-primary btn-filled  -btn-submit" disabled={this.state.submitted}>Spara ändringar</button>
                        </div>
                        <hr className="horizontal-separator visible-xs" />
                    </div>
                </Formsy>
            </div>
        );
    }
}

export default UserProfile;
