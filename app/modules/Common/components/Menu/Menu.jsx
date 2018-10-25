import React, { Component } from 'react';
import Config from '../../../../config.js'

import MenuItem from './MenuItem.jsx';

import HomeIcon from '../../../../components/Icons/svg/home.svg';
import MessengerIcon from '../../../../components/Icons/svg/messenger.svg';
import NotificationsIcon from '../../../../components/Icons/svg/notification.svg';
import SettingsIcon from '../../../../components/Icons/svg/settings.svg';

import '../../less/Menu.less';

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.subscribeMessagesCount();
        this.props.subscribeNotificationsCount();
    }

    goToPage(url) {
        this.props.goToPage(url);
    }

    render() {
        const { location, unReadMessages, unReadNotifications } = this.props;

        const menuItems = [
            {
                icon: HomeIcon,
                callback: this.goToPage.bind(this,`${Config.LANDING_URL}`),
                active: location.pathname.match(`^${Config.LANDING_URL}`),
            },
            {
                icon: MessengerIcon,
                callback: this.goToPage.bind(this,`/dashboard/chat`),
                badgeValue: unReadMessages,
                active: location.pathname.match(`^/dashboard/chat`),
            },
            {
                icon: NotificationsIcon,
                callback: this.goToPage.bind(this,`/dashboard/notifications`),
                badgeValue: unReadNotifications,
                active: location.pathname.match(`^/dashboard/notifications`),
            },
            {
                icon: SettingsIcon,
                callback: this.goToPage.bind(this,`/dashboard/settings`),
                active: location.pathname.match(`^/dashboard/settings`),
            },
        ];

        return(
            <nav className="top-nav">
                <ul>
                    {menuItems.map((ob, i) => <MenuItem key={i} item={ob} />)}
                </ul>
            </nav>
        );
    }
}

export default Menu;
