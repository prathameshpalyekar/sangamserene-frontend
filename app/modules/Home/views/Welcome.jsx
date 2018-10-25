import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Button from '@material-ui/core/Button';
import '../less/Welcome.less';
// import Header from 'modules/Header/views/Header';

class Welcome extends Component {
    render() {
        const { shouldFixHeader } = this.props;
        return (
            <div>
                {shouldFixHeader ?
                    <div className="-header-buffer">
                    </div> : null
                }
                <div className="welcome-container">
                    <div className="-content-container">
                        <div className="-header">
                            Welcome
                        </div>
                        <div className="-horizontal-line">
                        </div>
                        <div className="-content">
                            Getaway to the Cool, Calm, Tranquil unperturbed Nature at Sangam
Serene AgroFarm to Rejuvenate your Body, Mind and Soul.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;
