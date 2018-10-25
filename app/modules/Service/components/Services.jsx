import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Service from './Service.jsx';
import '../less/index.less';

class Services extends Component {

    constructor(props) {
        super(props);

        this.renderService = this.renderService.bind(this);
        this.selectService = this.selectService.bind(this);
    }
    componentDidMount() {
        this.props.fetchServices();
    }

    selectService(service) {
        const { onSelect } = this.props;

        onSelect && onSelect(service);
    }

    renderService (service) {
        const { selectedServiceId } = this.props;

        return (
            <Service
                service={service}
                isSelected={service.id === selectedServiceId}
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

Services.propTypes = {
    onSelect: PropTypes.func,
};

export default Services;
