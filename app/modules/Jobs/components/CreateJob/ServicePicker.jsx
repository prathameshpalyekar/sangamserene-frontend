import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Field } from 'redux-form/immutable'

import Whiteboard from 'components/ui/Whiteboard';
import ServiceField from '../../../Service/components/ServiceField.jsx';

class ServicePicker extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchServices();
    }

    render () {
        const { handleSubmit, services, invalid, submitting } = this.props;
        const filteredServices = (services || []).filter(s => !s.archived);

        return (
            <form className="create-job-section create-job-service" onSubmit={handleSubmit}>
                <Whiteboard.Title>Vad behöver du hjälp med?</Whiteboard.Title>
                <Field name="serviceId" component={ServiceField} services={filteredServices} />
                <div className="well well-sm well-note text-center">
                    <p>
                        Hittar du inte en passande kategori för ditt uppdrag. Gå till vårt <a href="https://intercom.help/instajobs/for-foretag-och-kunder" target="_blank">help center</a>.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <p><button type="submit" className="btn btn-primary btn-filled btn-block" disabled={invalid || submitting}>Nästa</button></p>
                        <p>
                            <Link to={`/dashboard/jobs/create/copy-job`} className="btn btn-primary btn-block">Skapa kopia på tidigare jobb</Link>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
}

export default ServicePicker;
