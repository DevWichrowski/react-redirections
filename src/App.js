import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/app/App.css';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import OtherTools from './components/otherTools/OtherTools';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<BrowserRouter>
					<div>
						<Route path="/" component={Main} exact />
						<Route path="/narzedzia" component={OtherTools} />
					</div>
				</BrowserRouter>
				<Footer />
			</div>
		);
	}
}

export default App;
