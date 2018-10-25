import React, { Component } from 'react';

class TakeAwayButton extends Component {
    render() {
        const clickHandler = this.props.clickHandler;

        return (
            <div className="danger-zone">
                <button
                    className="btn btn-block btn-lg btn-danger btn-filled"
                    onClick={clickHandler}>
                    Ta bort från listan
                </button>
            </div>
        );
    }
}

export default TakeAwayButton;
