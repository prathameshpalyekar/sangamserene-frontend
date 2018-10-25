import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form/immutable'
import { change } from 'redux-form'
import TagManager from 'react-gtm-module';

import Whiteboard from 'components/ui/Whiteboard';
import { Input, Select, TextArea } from 'components/ReduxForm/Fields';
import Label from 'components/ReduxForm/Label.jsx';

import CityRegionHelper from '../../../Common/helpers/CityRegionHelper.js';
import IconGranska from '../../../../components/Icons/svg/icon-granska.svg';
import Config from '../../../../config';

const gtmArgs = {
    dataLayer: {
        event: 'save_as_draft',
        label: 'Spara som utkast'
    },
    dataLayerName: 'PageEvents'
}

class DetailsForm extends Component {

    constructor(props) {
        super(props);

        this.saveAsDraft = this.saveAsDraft.bind(this);
    }

    componentDidMount () {
        const { formValues: { serviceId, type }, redirectToServiceSelection } = this.props;

        if (!serviceId || !type) {
            redirectToServiceSelection();
        }
    }

    saveAsDraft () {
        const { handleSubmit, onSubmit, dispatch } = this.props;

        TagManager.dataLayer(gtmArgs);

        dispatch(change('create-job', 'status', 'draft'));
        // Handle submit is not availble in mapDispatchsToProps, hence it is here
        handleSubmit(values => {
            return onSubmit(values.set('status', 'draft'), dispatch, this.props, true);
        })();
    }

    getCityOptions() {
        const cities = CityRegionHelper.getCityList();
        const options = [{
            label: 'Välj',
            disabled: true,
            selected: true,
            hidden: true,
        }];
        cities.forEach((city, i) => (
            options.push({
                label: city.name,
                value: city.value,
            })
        ));
        return options;
    }

    calculateHourlySalary (hourlySalary, multiplier) {
        if (!hourlySalary || isNaN(hourlySalary) || !multiplier || isNaN(multiplier)) {
            return false;
        }

        const price = hourlySalary * multiplier;

        return parseFloat(price.toFixed(2));

    }

    render () {
        const {
            selectedService,
            services,
            formValues: { hourlySalary },
            handleSubmit,
            pristine,
            submitting,
            match: { url },
        } = this.props;

        const { customPricing, clientPriceMultiplier } = selectedService || {};

        const previewLink = `${url.substring(0, url.lastIndexOf('/'))}/preview`;

        return (
            <form className="create-job-section create-job-service" onSubmit={handleSubmit}>
                <Whiteboard.Title>Fler Detaljer</Whiteboard.Title>
                { customPricing
                        ?
                        <div>
                            <Label>Timlön</Label>
                            <div className="-timelon-helptext">
                                Vad är den genomsnittliga timlönen för anställda hos dig som utför samma arbete?<br/><a target="_blank" href="https://intercom.help/instajobs/for-foretag-och-kunder/publicering-av-jobb/vad-ar-gfl">Varför frågar vi detta?</a>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Field name="hourlySalary" component={Input} type="number" placeholder="Mellan 125 och 200" min={125} max={200} step={1} />
                                </div>
                                <div className="col-md-6">
                                    <div className="well well-sm well-note text-center -timelon-note">
                                        <p>Timpriset för detta uppdrag är <b>{this.calculateHourlySalary(hourlySalary, clientPriceMultiplier) || '...'} kr/h</b>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
                <div className="row">
                    <div className="col-md-6">
                        <Field name="noOfPersons" component={Input} type="number" label="Hur många vill du anlita för jobbet?" step={1} min={1} parse={(value) => value ? parseInt(value, 10) : value}/>
                        <Field name="address" component={Input} type="text" label="På vilken adress börjar jobbet?" placeholder="Ange adress…" />
                        <Field name="city" component={Select} label="I vilken ort ska jobbet påbörjas/utföras?" options={this.getCityOptions()} />
                    </div>
                    <div className="col-md-6">
                        <Field name="information" component={TextArea} label="Arbetsuppgifter:" placeholder="Vad ska personen göra, vad är viktigt hos den ni söker och vilka är ni? Informera gärna även om vägbeskrivning, klädsel eller något annat du tror är viktigt att veta. Tänk på att ju mer du skriver, desto mer attraktiv blir annonsen och ju större chans har du att få ansökningar till ditt jobb." rows="10" />
                    </div>
                </div>
                <div className="text-right -preview-btn">
                    <Link to={previewLink}>
                        <ReactSVG path={IconGranska} />Förhandsgranska min annons
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p><button type="button" className="btn btn-default btn-filled btn-block" disabled={submitting} onClick={this.saveAsDraft}>Spara som utkast</button></p>
                    </div>
                    <div className="col-md-6">
                        <p><button type="submit" className="btn btn-primary btn-filled btn-block" disabled={submitting}>Spara och publicera</button></p>
                    </div>
                </div>
                <div className="well well-sm well-note text-center">
                    <p>
                        Notera att den eller de du anlitar för jobbet har rätt till rast<br/> och OB under vissa tider. <a target="_blank" href="https://intercom.help/instajobs/for-foretag-och-kunder/fakturering/vad-ar-ob">Läs mer om OB här.</a>
                    </p>
                </div>
            </form>
        );
    }
}

export default DetailsForm;
