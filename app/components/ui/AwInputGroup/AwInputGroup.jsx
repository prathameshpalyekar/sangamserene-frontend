import React, { Component } from 'react';
import cx from 'classnames'

import './AwInputGroup.less';
import FC from 'components/Formsy';

export default class AwInputGroup extends Component {

    constructor (props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        const hasErrors = {};
        this.props.inputProps.forEach(props => {
            hasErrors[props.name] = false;
        })
        this.state = {
            hasErrors: hasErrors
        };
    }

    handleError(name) {
        return (error) => {
            const hasErrors = this.state.hasErrors;
            if (hasErrors[name] !== error) {
                hasErrors[name] = error
                this.setState({
                    hasErrors
                });
            }
        }
    }

    renderTitle() {
        const { title } = this.props;

        if (!title) {
            return null;
        }
        const hasErrors = Object.keys(this.state.hasErrors).some(key => {
            return this.state.hasErrors[key]
        })
        const classnames = cx(
            'control-label', {
                'text-danger': hasErrors
            }
        );
        return (
            <label className={classnames}>{title}</label>
        );
    }

    render() {
        const { title } = this.props;
        const { inputProps } = this.props;

        const inputs = inputProps.map((props, index) => {
            return (
                <FC.Input
                    key={'in'+index}
                    onError={this.handleError(props.name)}
                    {...props }
                />
            )
        });
        return (
            <div className='aw-inputgroup'>
            {this.renderTitle()}
            {inputs}
            </div>
        );
    }
}
