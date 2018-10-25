import React, { Component } from 'react';
import cx from 'classnames';
import ReactSVG from 'react-svg';
import TagManager from 'react-gtm-module';

import ServiceIcons from '../constants/service_icons.js';
import Config from '../../../config';

class Service extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick (e) {
        const { onSelect, service } = this.props;

        onSelect && onSelect(service);

        const gtmArgs = {
            dataLayer: {
                event: 'category_click',
                label: service.name
            },
            dataLayerName: 'PageEvents'
        }
        TagManager.dataLayer(gtmArgs);

        return false;
    }

    render () {
        const { service, isSelected } = this.props;

        const iconPath = ServiceIcons.getServiceImage(service.systemName);

        const classNames = cx('', {
            active: isSelected,
        });

        return (
            <li className={classNames} onClick={this.onClick}>
                <div className="service">
                    <div className="-icon-cont">
                        { iconPath ? <ReactSVG path={iconPath} /> : null }
                    </div>
                    <span className="-name">{service.name}</span>
                    <span className="-price">{service.customPricing ? 'fr. ' : ''}{service.clientPrice} kr/h</span>
                </div>
            </li>
        );
    }

};

export default Service;
