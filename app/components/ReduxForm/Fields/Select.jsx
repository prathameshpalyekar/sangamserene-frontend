import React, { Component } from 'react';
import cx from 'classnames';

import Row from './Row.jsx';
import Label from '../Label.jsx';

class Select extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { meta, options, input: { value } } = this.props;

        const className = cx('form-control', this.props.className);

        return (
            <Row fieldMeta={meta}>
                <Label {...this.props}>{this.props.label}</Label>
                <div>
                    <select 
                        {...this.props}
                        {...this.props.input}
                        className={className}>
                        {options.map((o, index) => {
                            return (
                                <option value={o.value} key={index}>{o.label}</option>
                            );
                        })}
                    </select>
                </div>
            </Row>
        );
    }
}

export default Select;
