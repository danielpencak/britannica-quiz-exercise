/* eslint-disable no-unused-vars, no-undef */
import React, { Component } from 'react';
import quiz from '../../util/quiz';

class App extends Component {
  componentDidMount() {
    document.title = quiz.browserTitle;
  }

  render() {
    return (
      <div className="App">
        hello
      </div>
    );
  }
}

export default App;
