import React, { Component } from 'react';
import OtherRedirections from '../otherRedirection/OtherRedirections';
import './OtherTools.css';

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
			toHttp: '',
			resultHttp: ''
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

	saveToHttp = (event) => {
		this.setState({ toHttp: event.target.value });
		console.log('ToHttps: ' + this.state.toHttp);
	};

	createNonWWWRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
		result += `RewriteRule ^(.*)$ http://${urlToRedirect}%{REQUEST_URI} [R=301,L]`;
		return result;
	};

	createToWWWRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
		result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,NC]`;
		return result;
	};

	createToHttpsRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTPS} !=on\n`;
		result += `RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
		return result;
	};

	createToHttpRedirection = (urlToRedirect) => {
		let result = `RewriteCond %{HTTPS}=on\n`;
		result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,L]`;
		return result;
	};

	generateNonWWWRedirection = () => {
		if(this.state.nonWWW !== '')
		this.setState({ resultNonWWW: this.createNonWWWRedirection(this.state.nonWWW) });
	};

	generateToWWWRedirection = () => {
		if(this.state.toWWW !== '')
		this.setState({ resultToWWW: this.createToWWWRedirection(this.state.toWWW) });
	};

	generateToHttpsRedirection = () => {
		if(this.state.toHttps !== '')
		this.setState({ resultToHttps: this.createToHttpsRedirection(this.state.toHttps) });
	};

	generateToHttpRedirection = () => {
		if(this.state.toHttp !== '')
		this.setState({ resultToHttp: this.createToHttpsRedirection(this.state.toHttp) });
	};

	render() {
		return (
			<div className="page-body">
				<h1 className="h1-tools">Inne reguły przekierowań</h1>
				<hr />
					<div className="summary-index-php">
						<button
							className="btn btn-danger"
							type="button"
							data-toggle="collapse"
							data-target="#collapseExample"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							Przekierowanie z index.php
						</button>
						<div className="collapse" id="collapseExample">
							<div className="card card-body">
								<p>RewriteCond % {'{THE_REQUEST}'} ^.*/index\.php </p>
								<p>RewriteRule ^(.*)index.php$ /$1 [R=301,L]</p>
							</div>
						</div>
					</div>
				<div className="shadow-box">
					<OtherRedirections
						description={'Generuj regułe z www -> bez www - proszę podać adres bez www i http/https'}
						saveUrl={this.saveNonWWW}
						generateRedirection={this.generateNonWWWRedirection}
						resultRedirection={this.state.resultNonWWW}
					/>
					<OtherRedirections
						description={'Generuj regułe z bez www -> www - proszę podać adres bez www i http/https'}
						saveUrl={this.saveToWWW}
						generateRedirection={this.generateToWWWRedirection}
						resultRedirection={this.state.resultToWWW}
					/>
				</div>
				<div className="shadow-box">
					<OtherRedirections
						description={
							'Generuj regułe przekierowania z http -> https - proszę podać adres bez www i http/https'
						}
						saveUrl={this.saveToHttps}
						generateRedirection={this.generateToHttpsRedirection}
						resultRedirection={this.state.resultToHttps}
					/>
					<OtherRedirections
						description={
							'Generuj regułe przekierowania z https -> http - proszę podać adres bez www i http/https'
						}
						saveUrl={this.saveToHttp}
						generateRedirection={this.generateToHttpRedirection}
						resultRedirection={this.state.resultToHttp}
					/>
				</div>
			</div>
		);
	}
}
