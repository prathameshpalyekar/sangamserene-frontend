import React, { Component } from 'react';

class ShortPresentation extends Component {
    render() {
        const employeeInfo = this.props.employeeInfo;

        return (
            <div className="-presentation">
                <h3 className="sec-title">Kort presentation</h3>
                <p className="sec-desc">
                    {
                        employeeInfo.shortDescription.split('\n').map(function(part, index) {
                            return (<span key={index}>{part}<br/></span>)
                        })
                    }
                </p>
                <hr className="hr-separator-1" />
            </div>
        );
    }
}

export default ShortPresentation;
