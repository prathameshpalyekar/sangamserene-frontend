import React from 'react';
import Formsy from 'formsy-react';

import Row from './row'
import ComponentMixin from './mixins/component.js'
import StarRating from 'components/StarRating'

export default React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    saveValue: function(value) {
        this.setValue(value)
    },

    renderElement: function() {
        return (
            <StarRating {...this.props} rate={true} saveValue={this.saveValue} getValue={this.getValue}/>
        );
    },

    render: function() {
        return(
            <Row
                {...this.getRowProperties()}
                htmlFor={this.getId()}
            >
                {this.renderElement()}
            </Row>
        )
    }
});
