import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import '../less/UserInfo.less';

class UserInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;

        if (!user) {
            return null;
        }

        const name = `${user.get('firstName')} ${user.get('lastName')}`;

        const companyName = user.getIn(['employerInfo', 'companyName']);

        const profilePic = user.get('profilePic');

        const imageStyle = profilePic ? {
            backgroundImage: `url(${profilePic})`,
        } : {};

        const profilePageLink = '/dashboard/user/profile';

        return(
            <div className="user-info">
                <Link to={profilePageLink}>
                    <div className="user-image-wrap" style={imageStyle}></div>
                </Link>
                <p className="user-name">
                    <Link to={profilePageLink}>
                        {name}
                    </Link>
                </p>
                <p className="user-extra-info">
                    <Link to={profilePageLink}>
                        {companyName}
                    </Link>
                </p>
            </div>
        );
    }
}

export default UserInfo;
