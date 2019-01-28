import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/app/App.scss';
import Main from './components/MainRedirections/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RulesContainer from './components/RulesContainer/RulesContainer';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
			<>
				<Header />
				<div>
					<Route exact path="/" component={Main} />
					<Route path="/inne" component={RulesContainer} />
				</div>
				<Footer />
			</>
			</BrowserRouter>
		);
	}
}

export default App;
