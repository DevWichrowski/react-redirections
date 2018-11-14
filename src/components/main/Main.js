import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			urlsFrom: [],
			urlsTo: [],
			result: '',
			copySuccess: '',
			errorLeft: false,
			errorRight: false
		};
	}

	changeUrlFrom = (event) => {
		this.setState({ urlsFrom: this.parseStringToArray(event.target.value) });
	};

	changeUrlTo = (event) => {
		this.setState({ urlsTo: this.parseStringToArray(event.target.value) });
	};

	parseStringToArray = (urlString) => {
		return urlString.split('\n');
	};

	redirectUrls = (urlsFrom, urlsTo) => {
		let result = '';

		urlsFrom.map((item, index) => {
			result += `RewriteRule ^${item}$ ^${urlsTo[index]}$ [R=301,L]\n`
		})
	
		return result;
	};

	generateUrl = () => {
		if (this.state.urlsFrom.length === this.state.urlsTo.length) {
			this.setState({
				result: this.redirectUrls(this.state.urlsFrom, this.state.urlsTo),
				errorLeft: false,
				errorRight: false
			});
		} else if (this.state.urlsFrom.length > this.state.urlsTo.length) {
			this.setState({
				result:
					'Błąd: Nieprawidłowa ilość przekierowań.\n Za mało przekierowań w prawym polu:   > Przekieruj na <',
				errorRight: true,
				errorLeft: false
			});
			return (
				<textarea
					id="left-textarea"
					className="form-control"
					onChange={this.changeUrlFrom}
					style={{ fontSize: '100px' }}
				/>
			);
		} else if (this.state.urlsFrom.length < this.state.urlsTo.length) {
			this.setState({
				result:
					'Błąd: Nieprawidłowa ilość przekierowań.\n Za mało przekierowań w lewym polu:   > Przekieruj z <',
				errorLeft: true,
				errorRight: false
			});
		}
	};

	copyToClipboard = (e) => {
		this.textArea.select();
		document.execCommand('copy');
		// This is just personal preference.
		// I prefer to not show the the whole text area selected.
		e.target.focus();
		this.setState({ copySuccess: 'Skopiowano do schowka!' });
		setTimeout(() => {
			this.setState({ copySuccess: '' });
		}, 2000);
	};

	render() {
		return (
			<div className="wrapper">
				<h1>Rewind 301 redirections</h1>
				<hr />
				<details id="summary-details">
					<summary>Jak tego używać?</summary>
					<p>
						Wystarczy że w <strong>lewym</strong> polu tekstowym wkleisz adresy do przekierowania, a w{' '}
						<strong>prawym</strong> polu na co mają być przekierowane
					</p>
					<p>W polu poniżej wygenerują się reguły gotowe do wklejenia w plik .htaccess </p>
					<p>
						{' '}
						Możesz skopiować wygenerowane przekierowania za pomoca przycisku <strong>Kopiuj!</strong>
					</p>
				</details>
				<div className="redirects">
					<div className="textarea-container">
						<label htmlFor="left-textarea">Przekieruj z:</label>
						<textarea
							id="left-textarea"
							className={this.state.errorLeft ? 'error' : 'form-control'}
							onChange={this.changeUrlFrom}
						/>
					</div>
					<div className="textarea-container">
						<label htmlFor="right-textarea">Przekieruj na:</label>
						<textarea
							id="right-textarea"
							className={this.state.errorRight ? 'error' : 'form-control'}
							onChange={this.changeUrlTo}
						/>
					</div>
				</div>
				<button id="result-textarea" className="center-item btn btn-success" onClick={this.generateUrl}>
					Generuj
				</button>
				<div>
					<label htmlFor="result-textarea">Wygenerowane przekierowania:</label>
					<button type="button" className="btn btn-light push-right" onClick={this.copyToClipboard}>
						Kopiuj
					</button>
					<p className="push-right">{this.state.copySuccess}</p>
					<textarea
						ref={(textarea) => (this.textArea = textarea)}
						className="full-width form-control"
						value={this.state.result}
						readOnly={true}
					/>
				</div>
			</div>
		);
	}
}

export default Main;
