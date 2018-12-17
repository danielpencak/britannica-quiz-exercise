/* eslint-disable no-unused-vars, no-undef, max-len */
import React, { Component } from 'react';
import questions from '../../util/questions';
import quiz from '../../util/quiz';

class ResultCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions,
      yourAnswers: JSON.parse(localStorage.getItem(`Quiz${quiz.id}Answers`))
    };
  }

  componentDidMount() {
    const questionElements = Array.from(document.getElementsByClassName(`question${this.props.index}`));
    const yourAnswerElements = Array.from(document.getElementsByClassName(`yourAnswer${this.props.index}`));
    const correctAnswerElements = Array.from(document.getElementsByClassName(`correctAnswer${this.props.index}`));

    for (const questionElement of questionElements) {
      questionElement.innerHTML = this.props.question;
    }

    for (const yourAnswerElement of yourAnswerElements) {
      if (this.state.yourAnswers[this.props.index]) {
        yourAnswerElement.innerText = this.state.questions[this.props.index].answers[this.state.yourAnswers[this.props.index] - 1];
      }
      else {
        yourAnswerElement.innerText = 'You did not answer this question in time.';
      }
    }

    for (const correctAnswerElement of correctAnswerElements) {
      correctAnswerElement.innerText = this.state.questions[this.props.index].answers[this.state.questions[this.props.index].correct - 1];
    }
  }

  render() {
    return (
      <div className="ResultCard">
        {
          this.props.quizResult
          ? <div className="correctAnswerCont">
            <div className="glyphicon glyphicon-ok-sign"></div>
              <h3 className="resultCardHeader">Question</h3>
              <p
                className={ `question${this.props.index}` }
              >
              </p>
              <h3 className="resultCardHeader">Your Answer</h3>
              <p
                className={ `yourAnswer${this.props.index}` }
              >
              </p>

              <h3 className="resultCardHeader">Explanation</h3>
              <p>
                { this.state.questions[this.props.index].explanation }
              </p>
          </div>
          : <div className="wrongAnswerCont">
              <div className="glyphicon glyphicon-remove-sign"></div>
              <h3 className="resultCardHeader">Question</h3>
              <p
                className={`question${this.props.index}`}
              >
              </p>
              <h3 className="resultCardHeader">Your Answer</h3>
              <p
                className={ `yourAnswer${this.props.index}` }
              >
              </p>
              <h3 className="resultCardHeader">Correct Answer</h3>
              <p
                className={ `correctAnswer${this.props.index}` }
              >
              </p>

              <h3 className="resultCardHeader">Explanation</h3>
              <p>
                { this.state.questions[this.props.index].explanation }
              </p>
            </div>
        }
      </div>
    );
  }
}

export default ResultCard;
