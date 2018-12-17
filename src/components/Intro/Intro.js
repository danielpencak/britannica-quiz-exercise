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
        return <p>Answer Type: <span className="details">True/False</span></p>;
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
          <div className="gameDetailsCont">
            <div className="playGameCont">
              <h3 className="quizTitle">{ quiz.title }</h3>
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
            </div>
            <div className="gameDescriptionCont">
              <p>Number of Questions: <span className="details">{ quiz.numOfQuestions }</span></p>
              <p>Time: <span className="details">{ quiz.seconds } seconds</span></p>
              { this.handleTypeSwitch() }
            </div>
          </div>
          <p id="comicQuizIntro"></p>
        </div>
      </div>
    );
  }
}

export default Intro;
