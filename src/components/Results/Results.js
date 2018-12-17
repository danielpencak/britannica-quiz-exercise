/* eslint-disable no-unused-vars, no-undef, max-len, arrow-parens */
import React, { Component } from 'react';
import ResultCard from '../ResultCard/ResultCard';
import questions from '../../util/questions';
import quiz from '../../util/quiz';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizResults: null,
      questions
    };

    this.handleComputeCorrect = this.handleComputeCorrect.bind(this);
  }

  handleComputeCorrect() {
    const totalQuestions = this.state.questions.length;
    let correctAnswers = 0;

    if (this.state.quizResults) {
      this.state.quizResults.forEach(quizResult => {
        if (quizResult) {
          correctAnswers += 1;
        }
      });
    }

    return (
      <div>{ `${correctAnswers}/${totalQuestions}` }</div>
    );
  }

  componentDidMount() {
    const quizResults = JSON.parse(localStorage.getItem(`Quiz${quiz.id}Results`));

    this.setState({
      quizResults
    });
  }

  render() {
    return (
      <div className="Results">
        <div className="resultHeader">
          <h1>Your Quiz Results</h1>
          <h1>
            {
              this.handleComputeCorrect()
            }
          </h1>
        </div>
        <div className="btnCont">
          <div
            className="btn"
            onClick={ event => {
              this.props.history.push(`${quiz.url}/game`);
            } }
          >
            PLAY AGAIN
          </div>
          <div
            className="btn"
            onClick={ event => {
              this.props.history.push(`${quiz.url}/intro`);
            } }
          >
            HOME
          </div>
        </div>
        <div className="resultsCont">
        {
          this.state.quizResults
          ? this.state.quizResults.map((quizResult, index) => (
            <ResultCard
              quizResult={ quizResult }
              key={ index }
              index={ index }
              question={ this.state.questions[index].question }
            />
          ))
          : null
        }
        </div>
      </div>
    );
  }
}

export default Results;
