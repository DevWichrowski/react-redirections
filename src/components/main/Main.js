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
			errorRight: false,
			separator: '\n',
			urlRootPart: ''
		};
	}

	changeUrlFrom = (event) => {
		this.setState({ urlsFrom: this.parseStringToArray(event.target.value) });
	};

	changeUrlTo = (event) => {
		this.setState({ urlsTo: this.parseStringToArray(event.target.value) });
	};

	setUrlRootPart = (event) => {
		this.setState({ urlRootPart: event.target.value });
	};

	setSeparator = (event) => {
		this.setState({ separator: event.target.value });
		console.log(this.state.separator);
	};

	parseStringToArray = (urlString) => {
		urlString = urlString.replace(/ /g, '%');
		return urlString.split(this.state.separator);
	};

	redirectUrls = (urlsFrom, urlsTo) => {
		let result = '';

		urlsFrom.map((item, index) => {
			item = item.split(this.state.urlRootPart).pop();
			result += `RewriteRule ^${item}$ ${urlsTo[index]} [R=301,L]\n`;
			return true;
		});
		return result;
	};

	generateUrl = () => {
		if (this.state.urlsFrom.length === this.state.urlsTo.length) {
			this.setState({
				result: this.redirectUrls(this.state.urlsFrom, this.state.urlsTo),
				errorLeft: false,
				errorRight: false
			});
			console.log(this.state.urlRootPart);
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
				<div className="summary">
					<button
						className="btn btn-secondary"
						type="button"
						data-toggle="collapse"
						data-target="#collapseExample"
						aria-expanded="false"
						aria-controls="collapseExample"
					>
						Jak to działa?
					</button>
					<div className="collapse" id="collapseExample">
						<div className="card card-body">
							<p>
								Wystarczy że w <strong>lewym</strong> polu tekstowym wkleisz adresy do przekierowania, a
								w <strong>prawym</strong> polu na co mają być przekierowane
							</p>
							<p>W polu poniżej wygenerują się reguły gotowe do wklejenia w plik .htaccess </p>
							<p>
								Możesz także wybrać swój <strong>separator</strong>, domyślnie aplikacja korzysta z
								separatora Enter, lecz możesz zmienić na jaki jest ci potrzebny.
							</p>
							<p>
								{' '}
								Możesz skopiować wygenerowane przekierowania za pomoca przycisku{' '}
								<strong>Kopiuj!</strong>
							</p>
						</div>
					</div>
				</div>

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

				<div>
					<div className="separator-container">
						<label htmlFor="separator" className="label-separator">
							Wybierz separator - domyślnie ustawiony jest <strong>enter</strong>:
						</label>
						<input id="separator" className="chosen-separator" onChange={this.setSeparator} />
						<span id="url-root-part">
							<label htmlFor="separator" className="label-separator">
								Wpisz tutaj początek adresu url<strong />:
							</label>
							<input
								className="url-part"
								onChange={this.setUrlRootPart}
								placeholder="https://przyklad.pl/"
								required={true}
							/>
						</span>
					</div>
					{this.state.urlRootPart !== '' ? (
						<button id="result-textarea" className="center-item btn btn-success" onClick={this.generateUrl}>
							Generuj
						</button>
					) : (
						<button
							id="result-textarea"
							className="center-item btn btn-success"
							onClick={this.generateUrl}
							disabled
						>
							Generuj
						</button>
					)}
				</div>
				<div className="button-container">
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
