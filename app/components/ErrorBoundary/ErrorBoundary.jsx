import React, { Component } from 'react'
import cx from 'classnames'

import "./ErrorBoundary.less";


export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger">
                    <h3>{error.title ? error.title : 'Oops! Sorry!' }</h3>
                    {error.message ?
                        <div>
                            <p>Looks like something went wrong.</p>
                            {/* <p>{ error.message || 'Unknown error occured' }</p> */}
                        </div>
                    : null }
                </div>
            );
        }

        return this.props.children;
    }
}
