import React from 'react';

import Row from './Row.jsx';
import Label from '../Label.jsx';

class Numeric extends React.Component {
    // mixins: [Formsy.Mixin], state: {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
    }

    componentDidMount () {
        const { defaultValue, input: { value, onChange } } = this.props;

        console.log(defaultValue, value);
        if (defaultValue && typeof value === 'undefined') {
            console.log('Here', defaultValue);
            onChange(defaultValue || 0);
        }
    }

    componentWillReceiveProps (nextProps) {
        const { defaultValue, input: { value, onChange } } = this.props;

        console.log('This working', defaultValue, value);
        if (nextProps.defaultValue !== defaultValue && value !== defaultValue) {
            console.log('Here');
            onChange(defaultValue || 0);
        }
    }

    decrease() {
        const { step, input: { value, onChange } } = this.props;

        onChange(parseInt(value || 0) - (step || 1))
    }

    increase() {
        const { step, input: { value, onChange } } = this.props;

        onChange(parseInt(value || 0) + (step || 1))
    }

    render() {
        const { input: { value, onChange } } = this.props

        console.log(value);
        return(
            <Row>
                <Label {...this.props}>{this.props.label}</Label>
                <div>
                    <input
                        type='number'
                        min={this.props.min}
                        max={this.props.max}
                        className='form-control'
                        value={value}
                        required={this.props.required}
                        readOnly
                        onChange= {onChange}
                        name={this.props.name}/>
                        <div className="input-group-btn">
                            <button
                                className="btn btn-success btn-number"
                                type="button"
                                onClick={this.decrease}>
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>
                            <button
                                className="btn btn-success btn-number"
                                type="button"
                                onClick={this.increase}>
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>
                </div>
            </Row>
        )
    }
}
export default Numeric;
