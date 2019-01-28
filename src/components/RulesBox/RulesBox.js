import React from 'react';
import './RulesBox.scss';

export default function RulesBox(props) {
	return (
		<div>
			<div className="page-body">
				<div className="summary-index-php">
					<button
						className="btn btn-danger"
						type="button"
						data-toggle="collapse"
						data-target={`#${props.stateName}`}
						aria-expanded="false"
						aria-controls={props.stateName}
					>
						{props.description}
					</button>
					<div className="collapse" id={props.stateName}>
					<div className="card card-body">
							<p>{props.info}</p>
						<div className="inputs">
							<textarea
								type="text"
								className="form-control"
								placeholder="Tutaj wklej adres:"
								onChange={props.saveUrl}
							/>
							<textarea
								type="text"
								className="form-control"
								placeholder="Tutaj pokaże się wygenerowana reguła"
								value={props.resultRedirection}
								readOnly={true}
							/>
						</div>
						<button id="result-textarea" className="btn btn-danger" onClick={props.generateRedirection}>
							Generuj
						</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
