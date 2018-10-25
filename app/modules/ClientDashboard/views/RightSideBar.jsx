import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import cx from 'classnames';

import '../less/RightSideBar.less';
import savedCandidatesIcon from '../images/saved-candidates.png';
import previouslyHiredIcon from '../images/previously-hired.png';
import clientMyReviewsIcon from '../images/client-my-reviews.png';


const menuItems = [
    {
        title: 'SPARADE PROFILER',
        icon: savedCandidatesIcon,
        link: '/dashboard/candidates/saved',
    },
    {
        title: 'TIDIGARE ANLITADE',
        icon: previouslyHiredIcon,
        link: '/dashboard/candidates/hired',
    },
    {
        title: 'MINA OMDÖMEN',
        icon: clientMyReviewsIcon,
        link: '/dashboard/reviews',
    },
];

class RightSideBar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { location } = this.props;

        return (
            <section className="candidates-section right-sidebar">
                {
                    menuItems.map((menu, i) => {
                        const classNames = cx('candidate-option row', {
                            active: location.pathname.match(`^${menu.link}`),
                        });
                        return (
                            <div className={classNames} key={i}>
                                <div className="text-wrapper text-right col-xs-8">
                                    <p>{menu.title}</p>
                                    <Link to={menu.link}>Se alla</Link>
                                </div>
                                <div className="icon-wrapper col-xs-4">
                                    <Link to={menu.link}><img src={menu.icon} alt={menu.title} /></Link>
                                </div>
                            </div>
                        );
                    })
                }
            </section>
        )
    }
}

export default RightSideBar;
