import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class MenuItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { icon, callback, badgeValue, active } = this.props.item;
        return (
                <li>
                    <a onClick={callback} className={active ? 'active' : ''}>
                        <ReactSVG path={icon} />
                        {
                            badgeValue
                            ?
                            <div className="badge">{badgeValue}</div>
                            :
                            null
                        }
                    </a>
                </li>
        );
    }
}

export default MenuItem;
