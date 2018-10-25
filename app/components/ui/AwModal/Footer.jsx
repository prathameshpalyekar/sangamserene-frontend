import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="aw-modal-footer modal-footer">
                {this.props.children}
            </div>
        );
    }
}
