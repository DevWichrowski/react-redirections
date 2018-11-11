import React, { Component } from 'react';
import './styles/app/App.css';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Main />
				<Footer />
			</div>
		);
	}
}

export default App;
