/* eslint-disable no-unused-vars, no-undef, max-len, no-unreachable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import quiz from '../../util/quiz';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.handleTypeSwitch = this.handleTypeSwitch.bind(this);
  }

  handleTypeSwitch() {
    switch (quiz.quizType) {
      case 'TRUE_FALSE':
        return <p>Answer Type: True/False</p>;
        break;
      default:

    }
  }

  componentDidMount() {
    const playIcon = document.getElementById(`playIcon${quiz.id}`);
    const playIconHeight = Number.parseInt(window.getComputedStyle(playIcon).height.replace('px', ''));
    const playIconWidth = Number.parseInt(window.getComputedStyle(playIcon).width.replace('px', ''));
    const comicQuizIntro = document.getElementById('comicQuizIntro');

    comicQuizIntro.innerHTML = quiz.introduction;
    playIcon.style.marginLeft = `-${playIconWidth / 2}px`;
    playIcon.style.marginTop = `-${playIconHeight / 2}px`;
  }

  render() {
    return (
      <div className="Intro">
        <div className="gameIntroCard">
          <div className="gameIntroCardImgCont">
            <img
              className="gameIntroCardImg"
              alt={ quiz.thumbnail.altText }
              src={ quiz.thumbnail.filePath }
            />
            <Link to={ `${quiz.url}/game` }>
              <span
              className="glyphicon glyphicon-play-circle"
              id={ `playIcon${quiz.id}` }
              >
              </span>
            </Link>
          </div>
          <div className="gameDescriptionCont">
            <p>{ quiz.title }</p>
            <p>{ quiz.description }</p>
            <p id="comicQuizIntro"></p>
            <p>Number of Questions: { quiz.numOfQuestions }</p>
            <p>Time: { quiz.seconds } seconds</p>
            { this.handleTypeSwitch() }
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
