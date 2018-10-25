import React, { Component } from 'react';

class SendOfferButton extends Component {
    render() {
        return (
            <div className="send-offer-btn-wrap">
                <button className="btn btn-block btn-lg btn-primary btn-filled"
                    onClick={this.props.clickHandler}>
                    Skicka jobberbjudande
                </button>
                <hr className="hr-separator-1" />
            </div>
        );
    }
}

export default SendOfferButton;
