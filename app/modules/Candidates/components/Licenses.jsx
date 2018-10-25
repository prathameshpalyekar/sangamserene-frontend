import React, { Component } from 'react';

class Licenses extends Component {
    render() {
        const { employeeInfo } = this.props;

        return (
            <div className="candidate-licenses">
                <h3 className="sec-title">Intyg</h3>
                <p className="sec-desc">Körkort: <span>{employeeInfo.drivingLicense ? "Ja" : "Nej"}</span></p>
                <hr className="hr-separator-1" />
            </div>
        )
    }
}

export default Licenses;
