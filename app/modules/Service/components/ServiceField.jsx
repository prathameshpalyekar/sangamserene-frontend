import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Service from './Service.jsx';
import '../less/index.less';

class ServiceField extends Component {

    constructor(props) {
        super(props);

        this.renderService = this.renderService.bind(this);
        this.selectService = this.selectService.bind(this);
    }

    selectService(service) {
        const { input: { onChange } } = this.props;

        onChange(service.id);
    }

    renderService (service) {
        const { input: { value } } = this.props;

        return (
            <Service
                service={service}
                isSelected={service.id === value}
                onSelect={this.selectService}
                key={service.id}/>
        );
    }
    render() {
        const { services } = this.props;

        return (
            <ul className="services">
                {(services || []).map(this.renderService)}
            </ul>
        );
    }
}

export default ServiceField;
