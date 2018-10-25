import React, { Component } from 'react';
import cx from 'classnames';

import Row from './Row.jsx';
import Label from '../Label.jsx';

class Input extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { type, meta } = this.props;

        const className = cx('form-control', this.props.className);

        return (
            <Row fieldMeta={meta}>
                {this.props.label ? <Label {...this.props}>{this.props.label}</Label> : null }
                <div>
                    <input 
                        {...this.props}
                        {...this.props.input}
                        className={className} />
                </div>
            </Row>
        );
    }
}

export default Input;
