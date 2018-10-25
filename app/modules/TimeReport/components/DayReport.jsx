import React, { Component } from 'react';
import moment from 'moment';

import '../less/DayReport.less';

class DayReport extends Component {
    render() {
        const { day } = this.props;

        return (
            <div className="day-report">
                {/*<p className="day-date">{moment(day.date).format("ddd, MMM Do, YYYY")}</p>*/}
                {this.props.children}
            </div>
        );
    }
}

export default DayReport;
