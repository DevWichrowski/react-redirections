import React, { Component } from 'react';
import './OtherTools.css';

export default class OtherTools extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div className="page-body">
				<h1 className="h1-tools">Other Tools</h1>
				<hr />
				<div className="element">
        <p>lorem ipsum</p>
					<div className="inputs">
          <input type="text" class="form-control"/>
          <input type="text" class="form-control"/>
					</div>
					<button id="result-textarea" className="btn btn-danger">
					Generuj
				</button>
				</div>
				<div className="element">
        <p>lorem ipsum</p>
					<div className="inputs">
          <input type="text" class="form-control"/>
          <input type="text" class="form-control"/>
					</div>
					<button id="result-textarea" className="btn btn-danger">
					Generuj
				</button>
				</div>
				<div className="element">
        <p>lorem ipsum</p>
					<div className="inputs">
          <input type="text" class="form-control"/>
          <input type="text" class="form-control"/>
					</div>
          <button id="result-textarea" className="btn btn-danger">
					Generuj
				</button>
				</div>
			</div>
		);
	}
}
