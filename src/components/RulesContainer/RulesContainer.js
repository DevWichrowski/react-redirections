import React, { Component } from 'react';
import RulesBox from '../RulesBox/RulesBox';
import StaticRedirects from '../StaticRedirects/StaticRedirects';
import './RulesContainer.scss';

export default class RulesContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nonWWW: '',
			resultNonWWW: '',
			toWWW: '',
			resultToWWW: '',
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
				<StaticRedirects
					stateName="toIndexPhp"
					description={'Przekierowanie z index.php na /'}
					firstLine={`RewriteCond %{THE_REQUEST} ^.*/index\\.php`}
					secondLine={`RewriteRule ^(.*)index.php$ /$1 [R=301,L]`}
				/>
				<RulesBox
					stateName="nonWWW"
					info="Adres podać bez http/https"
					description={'Przekierowanie z www -> bez www'}
					saveUrl={(event) => this.saveUrls(event, 'nonWWW')}
					generateRedirection={() => this.generateRedirection('nonWWW')}
					resultRedirection={this.state.resultNonWWW}
				/>
				<RulesBox
					stateName="toWWW"
					info="Adres podać bez http/https"
					description={'Przekierowanie z bez www -> www'}
					saveUrl={(event) => this.saveUrls(event, 'toWWW')}
					generateRedirection={() => this.generateRedirection('toWWW')}
					resultRedirection={this.state.resultToWWW}
				/>
				<StaticRedirects
					stateName="toHttps"
					description={'Przekierowanie z http -> https'}
					firstLine={`RewriteCond %{HTTPS} !=on\n`}
					secondLine={`RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`}
				/>
				<RulesBox
					stateName="toHttp"
					info="Adres podać bez http/https"
					description={'Przekierowanie z https -> http'}
					saveUrl={(event) => this.saveUrls(event, 'toHttp')}
					generateRedirection={() => this.generateRedirection('toHttp')}
					resultRedirection={this.state.resultToHttp}
				/>
			</div>
		);
	}
}
