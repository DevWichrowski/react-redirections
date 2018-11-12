import React from 'react';
import './OtherRedirections.css';

export default function OtherRedirections(props) {
	return (
		<div>
			<div className="page-body">
				<div className="element">
					<p>{props.description}</p>
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
	);
}
