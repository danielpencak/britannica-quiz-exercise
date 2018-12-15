/* eslint-disable no-unused-vars, no-undef */
import React, { Component } from 'react';
import quiz from '../../util/quiz';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        { quiz.title }
      </div>
    );
  }
}

export default Header;
