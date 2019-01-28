import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/app/App.scss';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import OtherTools from './components/OtherTools/OtherTools';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
			<>
				<Header />
				<div>
					<Route exact path="/" component={Main} />
					<Route path="/inne" component={OtherTools} />
				</div>
				<Footer />
			</>
			</BrowserRouter>
		);
	}
}

export default App;
