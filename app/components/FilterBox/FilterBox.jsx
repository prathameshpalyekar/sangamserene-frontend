import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './FilterBox.less';

class FilterBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortActive: false,
            selected: this.props.items ? this.props.items[0] : []
        }

        this.toggleSort = this.toggleSort.bind(this);
        this.hideMe = this.hideMe.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.hideMe);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideMe);
    }

    hideMe (e) {
        const area = this ? ReactDOM.findDOMNode(this) : null;
        if (area && !area.contains(e.target)) {
            this.setState({
                sortActive: false,
            });
        }
        return false;
    }

    toggleSort() {
        this.setState({ sortActive: !this.state.sortActive });
    }

    render() {
        const { items, title, type = 'default', icon = null } = this.props;
        if (items.length === 0) {
            return null;
        }

        return (
            <div className={`filter-options-wrap ${this.state.sortActive ? 'active' : ''} ${type}`}>
                <p className="-clickable" onClick={this.toggleSort}>
                    {
                        icon
                        ?
                        <img src={icon} />
                        :
                        null
                    }
                    {
                        type === 'default'
                        ?
                        <span className="-title">{title}</span>
                        :
                        <label className="">{title}</label>
                    }
                    {
                        type === 'sort'
                        ?
                        <span className="-title">{this.state.selected.title}</span>
                        :
                        null
                    }
                </p>
                <ul className="filter-options">
                    {
                        items.map((item, index) => {
                            return (
                                <li key={index} className={item.value && this.state.selected.value === item.value ? 'active' : ''}>
                                    <a className="-clickable" onClick={item.callback}>{item.title}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default FilterBox;
