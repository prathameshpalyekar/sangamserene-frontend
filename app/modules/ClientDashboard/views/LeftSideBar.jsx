import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import '../less/LeftSideBar.less';

const NAV_ITEMS = [{
    key: 'draft',
    label: 'MINA UTKAST',
}, {
    key: 'open',
    label: 'ÖPPNA JOBB',
}, {
    key: 'confirmed',
    label: 'BEKRÄFTADE JOBB',
}, {
    key: 'completed',
    label: 'SLUTFÖRDA JOBB',
}];

class LeftSideBar extends Component {

    constructor(props) {
        super(props)

        this.renderLink = this.renderLink.bind(this);
    }

    componentWillMount () {
        const { fetchJobs } = this.props;

        fetchJobs('open');
    }

    renderLink (item, index) {
        const { jobCounts } = this.props;
        const path = `/dashboard/jobs/${item.key}`;

        return (
            <li key={index}>
                <NavLink exact to={path} activeClassName="active">
                    {item.label}
                    <span className="-count">{jobCounts[item.key]}</span>
                </NavLink>
            </li>
        );
    }

    render() {
        return (
            <div className="dashboard-sections left-sidebar">
                <ul className="nav nav-pills nav-stacked">
                    {NAV_ITEMS.map(this.renderLink)}
                </ul>
            </div>
        )
    }
}

export default LeftSideBar;
