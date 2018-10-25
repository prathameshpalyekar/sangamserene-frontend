import React from 'react'
import Select from 'react-select';

import '../less/index.less';

const Dropdown = (props) => {
    return (
        <div className="dropdown-cont">
            <Select
                id={props.id}
                ref={props.customSelect}
                options={props.options}
                clearable={props.clearable}
                />
        </div>
    );
};

export default States;
