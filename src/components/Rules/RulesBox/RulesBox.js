import React, {Component} from 'react';
import './RulesBox.scss';


class RulesBox extends Component {
	constructor(props){
		super(props);

		this.state={
			copySuccess: '',
		}
	}

	copyToClipboard = (e) => {
		this.textArea.select();
		document.execCommand('copy');
		// This is just personal preference.
		// I prefer to not show the the whole text area selected.
		e.target.focus();
		this.setState({ copySuccess: 'Skopiowane' });
		setTimeout(() => {
			this.setState({ copySuccess: '' });
		}, 2000);
	};

	render() {
		return (
			<div>
				<div className="page-body">
					<div className="summary-index-php">
						<button
							className="btn btn-danger"
							type="button"
							data-toggle="collapse"
							data-target={`#${this.props.stateName}`}
							aria-expanded="false"
							aria-controls={this.props.stateName}
						>
							{this.props.description}
						</button>
						<div className="collapse" id={this.props.stateName}>
							<div className="card card-body">
								<p>{this.props.info}</p>
								<div className="inputs">
							<textarea
								type="text"
								className="form-control"
								placeholder="Tutaj wklej adres:"
								onChange={this.props.saveUrl}
							/>
									<textarea
										type="text"
										className="form-control"
										placeholder="Tutaj pokaże się wygenerowana reguła"
										value={this.props.resultRedirection}
										readOnly={true}
										ref={(textarea) => (this.textArea = textarea)}
									/>
									<button type="button" className="btn btn-light push-right" onClick={this.copyToClipboard}>{this.state.copySuccess === ''? <span>Kopiuj</span>
										: <span>Skopiowano</span>}</button>
								</div>
								<button id="result-textarea" className="btn btn-danger" onClick={this.props.generateRedirection}>
									Generuj
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RulesBox;