'use strict';

import Input from './input.js';
import Row from './row.js';
import Checkbox from './checkbox.js';
import Textarea from './textarea.js';
import ImageUpload from './image-upload.js';
import RadioButtonGroup from './radio-btn-group.js';
import { addValidationRule } from 'formsy-react';

addValidationRule('mustMatch', (values, value, otherField) => {
    return value === values[otherField];
});

addValidationRule('mustBeChecked', (values, value) => {
    return value == true;
});

addValidationRule('isPostNbr', (values, value) => {
    if (!value) {
        return true;
    }
    return /^\d{5}$/.test(value);
});

addValidationRule('isVat', (values, value) => {
    //Empty is allowed
    if (!value) {
        return true;
    }
    return /^[a-zA-Z]{2}\d{12}$/.test(value);
});

addValidationRule('isOrgNumber', (values, value) => {
    //Empty is allowed
    if (!value) {
        return true;
    }
    return /^[0-9]{6}[-][0-9]{4}$/.test(value);
});

// import ColorPicker from './color-picker.jsx'
// import FileUpload from './file-upload.jsx'
// import ReactSelect from './react-select.jsx'
// import Rating from './rating.jsx'

module.exports = {
    Input,
    Row,
    Checkbox,
    RadioButtonGroup,
    Textarea,
    ImageUpload,
    // Following component disabled as they are
    // based on older version of React
    // CheckboxGroup: require('./checkbox-group'),
    // Icon: require('./icon'),
    // File: require('./input-file'),
    // RadioGroup: require('./radio-group'),
    // Select: require('./select'),
    // Textarea: require('./textarea'),
    // ComponentMixin: require('./mixins/component'),
    // ParentContextMixin: require('./mixins/parent-context'),
    // DatePicker: require('./DatePicker.jsx'),
    // FileUpload,
    // Rating,
    // ReactSelect,
};
