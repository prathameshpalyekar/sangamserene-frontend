import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../less/SortOptions.less';

class SortOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortActive: false,
            sort: this.props.sortColumns ? this.props.sortColumns[0] : []
        }

        this.toggleSort = this.toggleSort.bind(this);
        this.sortCandidates = this.sortCandidates.bind(this);
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

    sortCandidates(sortColumn) {
        this.setState({
            sort: sortColumn,
            sortActive: false
        });
        this.props.sortCandidates(sortColumn);
    }

    render() {
        const { sortColumns } = this.props;

        return (
            <div className={`job-candidates-sort-options sort ${this.state.sortActive ? 'active' : ''}`}>
                <p className="-clickable" onClick={this.toggleSort}>
                    <label className="sort-label">Sortera efter:</label>
                    <span className="chosen-sort">{ this.state.sort.label }</span>
                </p>
                <ul className="sort-options">
                    {
                        sortColumns.map((column, index) => {
                            return (
                                <li key={index} className={this.state.sort.value === column.value ? 'active' : ''}>
                                    <a className="-clickable" onClick={this.sortCandidates.bind(this, column)}>{column.label}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }


}

export default SortOptions;
