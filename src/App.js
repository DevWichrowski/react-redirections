import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/app/App.scss';
import MainRedirections from './components/MainRedirections/MainRedirections';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RulesContainer from './components/Rules/RulesContainer/RulesContainer';
import CombinedRules from "./components/Rules/CombinedRules/CombinedRules";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
			<>
				<Header />
				<div>
					<Route exact path="/" component={MainRedirections} />
					<Route exact path="/narzedzia" component={CombinedRules} />
					<Route path="/inne" component={RulesContainer} />
				</div>
				<Footer />
			</>
			</BrowserRouter>
		);
	}
}

export default App;
