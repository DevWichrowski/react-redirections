import React, {Component} from 'react';
import './RulesBox.scss';


class RulesBox extends Component {
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
									/>
									<button type="button" className="btn btn-light push-right">Kopiuj</button>
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