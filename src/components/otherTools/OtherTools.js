import React, { Component } from 'react';
import OtherRedirections from '../otherRedirection/OtherRedirections';

export default class OtherTools extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nonWWW: '',
			resultNonWWW: '',
			toWWW: '',
			resultToWWW: '',
			noIndexPhp: '',
			resultNoIndexPhp: ''
		};
	}

	saveNonWWW = (event) => {
		this.setState({ nonWWW: event.target.value });
		console.log('NonWWW: ' + this.state.nonWWW);
	};

	// saveToWWW = (event) => {
	// 	this.setState({ toWWW: event.target.value });
	// 	console.log('toWWW: ' + this.state.toWWW);
	// };

	// saveNoIndexPhp = (event) => {
	// 	this.setState({ noIndexPhp: event.target.value });
	// 	console.log('NoIndexPHP: ' + this.state.noIndexPhp);
	// };

	createNonWWWRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
		result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,L]`;
		return result;
	};

	generateNonWWWRedirection = () => {
		this.setState({ resultNonWWW: this.createNonWWWRedirection(this.state.nonWWW) });
	};

	render() {
		return (
			<div className="page-body">
				<h1 className="h1-tools">Other Tools</h1>
				<hr />
				<OtherRedirections
					description={'Generuj regułe z www na bez www - proszę podać adres bez www i http/https'}
					saveUrl={this.saveNonWWW}
					generateRedirection={this.generateNonWWWRedirection}
					resultRedirection={this.state.resultNonWWW}
				/>
				{/* <OtherRedirections saveUrl={this.saveToWWW} description={'Generuj regułe z bez www na www'} />
				<OtherRedirections saveUrl={this.saveNoIndexPhp} description={'Generuj regułe przekierowująca /index.php na /'} /> */}
			</div>
		);
	}
}
