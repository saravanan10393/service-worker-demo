import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'

import { AllStories } from './newslist/news.list';
import { Siderbar } from './sidebar/sidebar';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div className="container">
          <div className="header">Hacker News Apps (OFF Line Demo)</div>
          <div className="wrap">
            <Siderbar />
            <AllStories />
          </div>
          <div className="footer">Footer</div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
