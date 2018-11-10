import React, { Component } from 'react';
import './styles/app/App.css';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

class App extends Component {
	render() {
		return (
			<div>
				<Main />
				<Footer />
			</div>
		);
	}
}

export default App;
