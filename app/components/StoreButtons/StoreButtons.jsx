import React, { Component } from 'react';
import cx from 'classnames';
import Image from 'react-simple-image';

import './StoreButtons.less';

import AppStoreImage from './images/download-on-the-app-store-badge-svg.png';
import AppStoreImage2x from './images/download-on-the-app-store-badge-svg@2x.png';
import AppStoreImage3x from './images/download-on-the-app-store-badge-svg@3x.png';

import PlayStoreImage from './images/get-it-on-google-play-svg.png';
import PlayStoreImage2x from './images/get-it-on-google-play-svg@2x.png';
import PlayStoreImage3x from './images/get-it-on-google-play-svg@3x.png';

export default class StoreButtons extends Component {

    renderAppStoreImage () {
        return (
            <Image src={AppStoreImage}  srcSet={{
                '1x': AppStoreImage,
                '2x': AppStoreImage2x,
                '3x': AppStoreImage3x,
            }} />
        );
    }

    renderPlayStoreImage () {
        return (
            <Image src={PlayStoreImage}  srcSet={{
                '1x': PlayStoreImage,
                '2x': PlayStoreImage2x,
                '3x': PlayStoreImage3x,
            }} />
        );
    }

    render () {
        const { appStoreUrl, googlePlayUrl } = this.props;

        if (!appStoreUrl || !googlePlayUrl) {
            return null;
        }

        return (
            <div className="store-buttons">
                { appStoreUrl
                    ? <a href={appStoreUrl} target="_blank" title="Download on the app store">
                        {this.renderAppStoreImage()}
                      </a>
                    : null
                }
                { googlePlayUrl
                        ? <a href={googlePlayUrl} target="_blank" title="Get it on Google Play">
                            {this.renderPlayStoreImage()}
                          </a>
                    : null
                }
            </div>
        );
    }
}

