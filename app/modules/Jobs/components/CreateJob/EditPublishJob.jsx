import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field } from 'redux-form/immutable'
import Alert from 'react-s-alert';

import { Input, TextArea } from 'components/ReduxForm/Fields';

import Whiteboard from 'components/ui/Whiteboard';

class EditPublishJob extends Component {

    constructor(props) {
        super(props);
    }

    // componentWillReceiveProps (nextProps) {
    //     const { isSaving, navigateBack } = this.props;
    //
    //     if (isSaving && !nextProps.isSaving) {
    //         if (nextProps.saveError) {
    //             Alert.error(nextProps.saveError);
    //             return;
    //         }
    //
    //         navigateBack();
    //         return;
    //     }
    // }

    render () {
        const { handleSubmit, services, invalid, submitting } = this.props;

        return (
            <form className="create-job-section create-job-service" onSubmit={handleSubmit}>
                <Whiteboard.Title>Redigera jobb</Whiteboard.Title>
                <p className="text-center">Här nedan skriver du utkastet till den annons du vill publicera för att attrahera rätt  person/er till uppdraget</p>
                <Field name="noOfPersons" component={Input} type="number" label="Hur många vill du anlita för jobbet?" step={1} min={1} parse={(value) => value ? parseInt(value, 10) : value}/>
                <Field name="information" component={TextArea} label="Arbetsuppgifter:" placeholder="Vad ska personen göra, vad är viktigt hos den ni söker och vilka är ni? Informera gärna även om vägbeskrivning, klädsel eller något annat du tror är viktigt att veta. Tänk på att ju mer du skriver, desto mer attraktiv blir annonsen och ju större chans har du att få ansökningar till ditt jobb." rows="6" />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <p className="text-center">
                            <button type="submit" className="btn btn-primary btn-filled btn-block" disabled={invalid || submitting}>Uppdatera</button>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
}

export default EditPublishJob;
