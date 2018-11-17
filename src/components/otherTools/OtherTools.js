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

	saveUrls = (event, url) => {
		this.setState({ [url]: event.target.value });
	};

	createRedirection = (urlToRedirect, redirectionType) => {
		let result = '';
		switch (redirectionType) {
			case 'nonWWW':
				result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
				result += `RewriteRule ^(.*)$ http://${urlToRedirect}%{REQUEST_URI} [R=301,L]`;
				break;
			case 'toWWW':
				result = `RewriteCond %{HTTP_HOST} ^${urlToRedirect}$ [NC]\n`;
				result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,NC]`;
				break;
			case 'toHttps':
				result = `RewriteCond %{HTTPS} !=on\n`;
				result += `RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
				break;
			case 'toHttp':
				result = `RewriteCond %{HTTPS}=on\n`;
				result += `RewriteRule ^(.*)$ http://${urlToRedirect}/$1 [R=301,L]`;
				break;
			default:
				result = 'Unknown url';
				break;
		}
		return result;
	};

	generateRedirection = (url) => {
		if (url === 'nonWWW') {
			if (this.state.nonWWW !== '')
				this.setState({ resultNonWWW: this.createRedirection(this.state.nonWWW, url) });
		} else if (url === 'toWWW') {
			if (this.state.toWWW !== '') this.setState({ resultToWWW: this.createRedirection(this.state.toWWW, url) });
		} else if (url === 'toHttps') {
			if (this.state.toHttps !== '')
				this.setState({ resultToHttps: this.createRedirection(this.state.toHttps, url) });
		} else if (url === 'toHttp') {
			if (this.state.toHttp !== '')
				this.setState({ resultToHttp: this.createRedirection(this.state.toHttp, url) });
		}
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
						saveUrl={(event) => this.saveUrls(event, 'nonWWW')}
						generateRedirection={() => this.generateRedirection('nonWWW')}
						resultRedirection={this.state.resultNonWWW}
					/>
					<OtherRedirections
						description={'Generuj regułe z bez www -> www - proszę podać adres bez www i http/https'}
						saveUrl={(event) => this.saveUrls(event, 'toWWW')}
						generateRedirection={() => this.generateRedirection('toWWW')}
						resultRedirection={this.state.resultToWWW}
					/>
				</div>
				<div className="shadow-box">
					<OtherRedirections
						description={
							'Generuj regułe przekierowania z http -> https - proszę podać adres bez www i http/https'
						}
						saveUrl={(event) => this.saveUrls(event, 'toHttps')}
						generateRedirection={() => this.generateRedirection('toHttps')}
						resultRedirection={this.state.resultToHttps}
					/>
					<OtherRedirections
						description={
							'Generuj regułe przekierowania z https -> http - proszę podać adres bez www i http/https'
						}
						saveUrl={(event) => this.saveUrls(event, 'toHttp')}
						generateRedirection={() => this.generateRedirection('toHttp')}
						resultRedirection={this.state.resultToHttp}
					/>
				</div>
			</div>
		);
	}
}
