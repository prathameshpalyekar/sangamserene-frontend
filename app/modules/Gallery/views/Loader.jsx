import React, { Component } from 'react';
import '../less/Loader.less';

export default class Loader extends Component {
	render() {
		return (
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}
}