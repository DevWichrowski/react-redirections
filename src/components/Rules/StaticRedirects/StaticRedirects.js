import React from 'react';

export default function StaticRedirects(props) {
	return (
		<div>
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
						<p>{props.firstLine}</p>
						<p>{props.secondLine}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
