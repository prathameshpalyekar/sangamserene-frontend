import React, { Component } from 'react';

class NoShowButton extends Component {
    render() {
        const clickHandler = this.props.clickHandler;

        return (
            <section className="danger-zone">
                <button
                    className="btn btn-block btn-lg btn-danger btn-filled"
                    onClick={clickHandler}>
                    Dök inte upp
                </button>
            </section>
        );
    }
}

export default NoShowButton;
