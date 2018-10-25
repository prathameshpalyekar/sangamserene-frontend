import React, { Component } from 'react';

import StoreButtons from 'components/StoreButtons';

import './MobileView.less';

export default class MobileView extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="-title">Använd appen!</h1>
                <p>Vi ser att du försöker öppna webbversionen av instajobs på en enhet som har för liten skärm. För din bästa användarupplevelse ber vi dig ladda ner vår app.</p>
                <p className="-dark">Ladda ner appen här:</p>
                <StoreButtons appStoreUrl="https://instajobs.app.link/utmana" googlePlayUrl="https://instajobs.app.link/utmana" />
            </div>
        );
    }
}
