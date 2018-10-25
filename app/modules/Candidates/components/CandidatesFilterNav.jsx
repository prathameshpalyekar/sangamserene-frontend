import React, { Component } from 'react';
import cx from 'classnames';

import '../less/CandidatesFilterNav.less';

const NAV_ITEMS = [{
    key: 'matching',
    label: 'Matchande profiler',
}, {
    key: 'applied',
    label: 'Ansökningar',
}, {
    key: 'offersent',
    label: 'Skickat erbjudande',
}, {
    key: 'hired',
    label: 'Anlitade',
}];


class CandidatesFilterNav extends Component {
    constructor(props) {
        super(props);

        this.renderLink = this.renderLink.bind(this);
    }

    getCandidateCount (item) {
        const { job } = this.props;

        if (item.key == 'matching') {
            return job.matchingCandidates;
        } else if (item.key == 'applied') {
            return job.appliedCandidates;
        } else if (item.key == 'offersent') {
            return job.offerSentCandidates;
        }

        return `${job.hiredCandidates}/${job.noOfPersons}`;
    }

    renderLink (item, index) {
        const { switchTab, tab } = this.props;

        const classNames = cx('', {
            '-clickable': true,
            'active': tab === item.key
        });

        return (
            <li key={index}>
                <a className={classNames} onClick={() => switchTab(item.key)}>
                    {item.label}
                    <span className="-count">{this.getCandidateCount(item)}</span>
                </a>
            </li>
        );
    }

    render() {
        const { job } = this.props;

        return (
            <div className="job-candidates-nav">
                <ul className="nav">
                    {NAV_ITEMS.map(this.renderLink)}
                </ul>
            </div>
        );
    }
}

export default CandidatesFilterNav;
