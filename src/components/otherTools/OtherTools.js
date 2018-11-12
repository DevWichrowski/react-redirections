import React, { Component } from 'react';
import OtherRedirections from '../otherRedirection/OtherRedirections';

export default class OtherTools extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="page-body">
				<h1 className="h1-tools">Other Tools</h1>
				<hr />
				<OtherRedirections description={'Generuj regułe z www na bez www'} />
				<OtherRedirections description={'Generuj regułe z bez www na www'} />
				<OtherRedirections description={'Generuj regułe przekierowująca /index.php na /'} />
			</div>
		);
	}
}
