import React, { Component } from 'react';

import Whiteboard from 'components/ui/Whiteboard';

import PasswordChangeFormContainer from '../containers/PasswordChangeFormContainer.jsx';

import '../less/Settings.less';

class Settings extends Component {

    render() {

        return (
            <div className="settings-wrapper">
                <Whiteboard.Stubs noTopPadding={true} className="-sep-bottom">
                    <Whiteboard.Title>Kontoinställningar</Whiteboard.Title>
                    <div className="center-content-section -large text-center content">
                        <p>
                            Här kan du ändra dina kontoinställningar
                        </p>
                    </div>
                </Whiteboard.Stubs>
                <PasswordChangeFormContainer />
            </div>
        );
    }
}

export default Settings;
