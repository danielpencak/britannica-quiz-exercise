/* eslint-disable no-unused-vars, no-undef */
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Game from '../Game/Game';
import Header from '../Header/Header';
import Intro from '../Intro/Intro';
import Results from '../Results/Results';
import quiz from '../../util/quiz';

class App extends Component {
  componentDidMount() {
    document.title = quiz.browserTitle;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route render={ ({ location }) => (
          <Switch>
            <Route exact path={ quiz.url } component={ Intro } />
            <Route exact path={ `${quiz.url}/game` } component={ Game } />
            <Route exact path={ `${quiz.url}/results` } component={ Results } />
            <Redirect from="/" to={ quiz.url } />
          </Switch>
        )} />
      </div>
    );
  }
}

export default App;
