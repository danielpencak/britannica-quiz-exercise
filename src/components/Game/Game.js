/* eslint-disable no-unused-vars, no-undef, no-negated-condition, arrow-parens, max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import questions from '../../util/questions';
import quiz from '../../util/quiz';

let gamePreTimer = null;
let gameTimer = null;
const yourAnswers = Array(quiz.numOfQuestions).fill(null);
const checkedAnswers = Array(quiz.numOfQuestions).fill(false);

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamePreTimer: 3,
      gameTimer: quiz.seconds,
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

    yourAnswers[this.state.questionIndex] = selectedAnswerCode;

    if (correctAnswerCode === selectedAnswerCode) {
      checkedAnswers[this.state.questionIndex] = true;
    }
    else {
      checkedAnswers[this.state.questionIndex] = false;
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
        this.props.history.push(`${quiz.url}/results`);
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
    }, 2000);
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
    const questionIndex = this.state.questionIndex;
    const questionList = this.state.questions;

    return (
      <div className="Game">
        {
          !this.state.gameStart
          ? <div className="preGameTimerCont">
              <h1 className="preGameTimer">
                THE GAME BEGINS IN
              </h1>
              <div id="gamePreTimer">
                <h1 className="preGameTimer">
                  {this.state.gamePreTimer}
                </h1>
              </div>
          </div>
          : <div>
            <h1 className="gameTimer">
              TIME REMAINING: <span className="time">{ this.state.gameTimer }</span>
            </h1>
            <div className="questionCard">
              <p className="level">
                Difficulty Level: { questionList[questionIndex].level }
              </p>
              <div className="questionCont">
                <p id="question"></p>
              </div>
              {
                questionList[questionIndex].type === 'TRUE_FALSE'
                ? questionList[questionIndex].answers.map((answer, index) => {
                  return (
                    <div
                      key={ index }
                      id={ `Answer${index}` }
                      data-index={ index.toString() }
                      data-correct-answer={ (questionList[questionIndex].correct).toString() }
                      onClick={ event => {
                        this.handleAnswerClick(event);
                      } }
                      className="answer"
                    >
                      { answer }
                    </div>
                  );
                })
                : null
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Game;
