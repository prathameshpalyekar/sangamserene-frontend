import React, { Component } from 'react';
import moment from 'moment';

class Studies extends Component {
    render() {
        const { employeeInfo } = this.props;

        return (
            <div className="candidate-studies">
                <h3 className="sec-title">Studieinriktning</h3>
                <p className="sec-desc">{employeeInfo.courseDescription}</p>
                <hr />
                <h3 className="sec-title">Kursstart</h3>
                <p className="sec-desc">{moment(employeeInfo.courseStartDate).format('MMM Do, YYYY')}</p>
                <hr className="hr-separator-1" />
            </div>
        );
    }
}

export default Studies;
