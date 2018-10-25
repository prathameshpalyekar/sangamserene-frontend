import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Whiteboard from 'components/ui/Whiteboard';

import SingleJobContainer from '../../containers/SingleJobContainer.jsx';

class Preview extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount () {
        const { job: { serviceId, type }, redirectToServiceSelection } = this.props;

        if (!serviceId || !type) {
            redirectToServiceSelection();
        }
    }

    render () {
        const { job } = this.props;

        return (
            <div>
                <Whiteboard.Title>Granska Jobb</Whiteboard.Title>
                <SingleJobContainer job={job} />
            </div>
        );
    }
}

export default Preview;
