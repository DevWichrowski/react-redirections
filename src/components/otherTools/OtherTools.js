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
			toHttps: '',
			resultToHttps: '',
			noIndexPhp: '',
			resultNoIndexPhp: ''
		};
	}

	saveNonWWW = (event) => {
		this.setState({ nonWWW: event.target.value });
		console.log('NonWWW: ' + this.state.nonWWW);
	};

	saveToWWW = (event) => {
		this.setState({ toWWW: event.target.value });
		console.log('toWWW: ' + this.state.toWWW);
	};

	saveToHttps = (event) => {
		this.setState({ toHttps: event.target.value });
		console.log('ToHttps: ' + this.state.toHttps);
	};

	createNonWWWRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
		result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,L]`;
		return result;
	};

	createToWWWRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
		result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,NC]`;
		return result;
	};

	createToHttpsRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{SERVER_PORT} 80\n`;
		result += `RewriteRule ^(.*)$ https://${urlToRedirect}`;
		return result;
	};

	generateNonWWWRedirection = () => {
		this.setState({ resultNonWWW: this.createNonWWWRedirection(this.state.nonWWW) });
	};

	generateToWWWRedirection = () => {
		this.setState({ resultToWWW: this.createToWWWRedirection(this.state.toWWW) });
	};

	generateToHttpsRedirection = () => {
		this.setState({ resultToHttps: this.createToHttpsRedirection(this.state.toHttps) });
	};

	render() {
		return (
			<div className="page-body">
				<h1 className="h1-tools">Inne reguły przekierowań</h1>
				<hr />
				<OtherRedirections
					description={'Generuj regułe z www na bez www - proszę podać adres bez www i http/https'}
					saveUrl={this.saveNonWWW}
					generateRedirection={this.generateNonWWWRedirection}
					resultRedirection={this.state.resultNonWWW}
				/>
				<OtherRedirections
					description={'Generuj regułe z bez www na www - proszę podać adres bez www i http/https'}
					saveUrl={this.saveToWWW}
					generateRedirection={this.generateToWWWRedirection}
					resultRedirection={this.state.resultToWWW}
				/>
				<OtherRedirections
					description={'Generuj regułe przekierowania na https - proszę podać adres bez www i http/https'}
					saveUrl={this.saveToHttps}
					generateRedirection={this.generateToHttpsRedirection}
					resultRedirection={this.state.resultToHttps}
				/>
			</div>
		);
	}
}
