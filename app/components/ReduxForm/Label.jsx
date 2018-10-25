import React, { Component } from 'react';
import cx from 'classnames';

export default ({ layout, required, htmlFor, children }) => {

    const labelClassNames = cx({
        'control-label': layout !== 'horizontal',
        'col-sm-3': layout === 'horizontal',
    });

    return (
        <label
            className={labelClassNames}
            data-required={required}
            htmlFor={htmlFor}
        >
            {children}
            {required ? <span className="required-symbol"> *</span> : null}
        </label>
    );
};
