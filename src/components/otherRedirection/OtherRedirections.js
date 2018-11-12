import React from 'react';
import './OtherRedirections.css';

export default function OtherRedirections(props) {
	return (
		<div>
			<div className="page-body">
				<div className="element">
					<p>{props.description}</p>
					<div className="inputs">
						<input type="text" class="form-control" placeholder="Wklej tutaj adres" />
						<input type="text" class="form-control" placeholder="Tutaj pokaże się wygenerowana reguła" />
					</div>
					<button id="result-textarea" className="btn btn-danger">
						Generuj
					</button>
				</div>
			</div>
		</div>
	);
}
