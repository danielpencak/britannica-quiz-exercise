/* eslint-disable no-unused-vars, no-undef, no-negated-condition, arrow-parens, max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import questions from '../../util/questions';
import quiz from '../../util/quiz';

let gamePreTimer = null;
let gameTimer = null;
const yourAnswers = [];
const checkedAnswers = [];

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamePreTimer: 3,
      gameTimer: 10,
      gameStart: false,
      questions,
      questionIndex: 0
    };

    this.handlePreTimer = this.handlePreTimer.bind(this);
    this.handleGameTimer = this.handleGameTimer.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  handleAnswerClick(event) {
    const correctAnswerCode = Number.parseInt(event.target.attributes.getNamedItem('data-correct-answer').value);
    const selectedAnswerCode = Number.parseInt(event.target.attributes.getNamedItem('data-index').value) + 1;

    yourAnswers.push(selectedAnswerCode);

    if (correctAnswerCode === selectedAnswerCode) {
      checkedAnswers.push(true);
    }
    else {
      checkedAnswers.push(false);
    }

    if (this.state.questionIndex + 1 > this.state.questions.length - 1) {
      this.props.history.push(`${quiz.url}/results`);
    }
    else {
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1
      }));
    }
  }

  handleGameTimer() {
    gameTimer = setInterval(() => {
      this.setState(prevState => ({
        gameTimer: prevState.gameTimer - 1
      }));

      if (this.state.gameTimer === 0) {
        // this.props.history.push(`${quiz.url}/results`);
        clearInterval(gameTimer);
      }
    }, 1000);
  }

  handlePreTimer() {
    gamePreTimer = setInterval(() => {
      this.setState(prevState => ({
        gamePreTimer: prevState.gamePreTimer - 1
      }));

      if (this.state.gamePreTimer === 0) {
        this.setState(prevState => ({
          gameStart: !prevState.gameStart
        }));

        clearInterval(gamePreTimer);
        this.handleGameTimer();
        const question = document.getElementById('question');

        question.innerHTML = this.state.questions[this.state.questionIndex].question;
      }
    }, 1000);
  }

  componentDidMount() {
    this.handlePreTimer();

    if (localStorage.getItem(`Quiz${quiz.id}Results`)) {
      localStorage.removeItem(`Quiz${quiz.id}Results`);
    }

    if (localStorage.getItem(`Quiz${quiz.id}Answers`)) {
      localStorage.removeItem(`Quiz${quiz.id}Answers`);
    }
  }

  componentDidUpdate() {
    if (this.state.gamePreTimer === 0 && this.state.gameStart) {
      const question = document.getElementById('question');

      question.innerHTML = this.state.questions[this.state.questionIndex].question;
    }
  }

  componentWillUnmount() {
    clearInterval(gamePreTimer);
    clearInterval(gameTimer);

    localStorage.setItem(`Quiz${quiz.id}Results`, JSON.stringify(checkedAnswers));
    localStorage.setItem(`Quiz${quiz.id}Answers`, JSON.stringify(yourAnswers));
  }

  render() {
    return (
      <div className="Game">
        {
          !this.state.gameStart
          ? <div>
            <h1>
              The game begins in <span id="gamePreTimer">{this.state.gamePreTimer}</span>
            </h1>
          </div>
          : <div>
            {this.state.gameTimer}
            <p>Level { this.state.questions[this.state.questionIndex].level }</p>
            <p id="question"></p>
            {
              this.state.questions[this.state.questionIndex].type === 'TRUE_FALSE'
              ? this.state.questions[this.state.questionIndex].answers.map((answer, index) => {
                return (<div key={ index } id={ `Answer${index}`} data-index={ index.toString() } data-correct-answer={ (this.state.questions[this.state.questionIndex].correct).toString() } onClick={ event => { this.handleAnswerClick(event); }}>{ answer }</div>);
              })
              : null
            }
          </div>
        }
      </div>
    );
  }
}

export default Game;
