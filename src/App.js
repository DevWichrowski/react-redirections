import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      urlsFrom: [],
      urlsTo: [],
      result: ''
    }
  }

  changeUrlFrom = (event) => {
    this.setState({urlsFrom: this.parseStringToArray(event.target.value)});
  }

  changeUrlTo = (event) => {
    this.setState({urlsTo: this.parseStringToArray(event.target.value)});
  }

  parseStringToArray = (urlString) => {
    return urlString.split('\n');
  }

  redirectUrls = (urlsFrom, urlsTo) => {
    const len = urlsFrom.length;
    let result = '';
    
    for (let i = 0; i < len; i++) {
      result += `RewriteRule ^${urlsFrom[i]}$ ^${urlsTo[i]}$ [R=301,L]\n`;
    }

    return result;
  }

  generateUrl = () => {
    console.log(this.state);
      this.setState({
        result: this.redirectUrls(this.state.urlsFrom, this.state.urlsTo)
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className='redirects'>
          <textarea className='push-left text-box' onChange={this.changeUrlFrom}/>
          <textarea  className='push-right text-box' onChange={this.changeUrlTo}/>
        </div>
        <button className='center-item' onClick = {this.generateUrl}>Generate</button>
        <textarea className='full-width' placeholder='WYNIK' value={this.state.result}/>
      </div>
    );
  }
}

export default App;
