import React, { Component } from 'react';

import StoreButtons from 'components/StoreButtons';

import '../less/SignUpComplete.less';

export default class SignUpComplete extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="page-content -mini">
                <div className="content text-center">
                    <h1 className="-title">Tack för din registrering!</h1>
                    <p className="-sub-title">Nu kan du hämta vår mobilapp, logga in och anlita din första instajobbare.</p>
                    <div className="signup-store-buttons">
                        <StoreButtons appStoreUrl="https://itunes.apple.com/se/app/instajobs/id1120661917?mt=8" googlePlayUrl="https://play.google.com/store/apps/details?id=com.instajobs&hl=en" />
                    </div>
                </div>
            </div>
        );
    }
}
