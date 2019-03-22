import React, { Component } from 'react';
import '../components/ScoreCapture.css';
import { validateScore } from './Validators.js';
import { getCookie } from './cookie.js';
import { URL } from '../actions/types.js';
import cameraGray from '../components/assets/redSubmitButton.png';
import graySubmit from '../components/assets/btnThatSubmitsRed.png';
import grayRetry from '../components/assets/retryBlack.png';
import lightgrayback from '../components/assets/blackBackBtn.png';
import cameraBlack from '../components/assets/cameraBlack.png';
import submit from '../components/assets/blackSumbit.png';

export default class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currState: 1,
      clicked: null,
      score: 0,
      hideCamera: false,
      imageContent: "",
      competitionName: "",
      validForm: true,
      competitionsList: [],
      user: null,
      scoreSaved: false,
      showCamera: false,
      imageTaken: false,
      latitude: null,
      longitude: null,
      error: null,
      Flashon: false,
      validScore: true,
      validCompetition: true,
      scoreEntered: false,
      navbarState: false
    }

    this.CompetitionClicked = this.CompetitionClicked.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.TakePhoto = this.TakePhoto.bind(this);
    this.SubmitScore = this.SubmitScore.bind(this);
    this.Flash = this.Flash.bind(this);
    this.RetakePhoto = this.RetakePhoto.bind(this);
    this.Validate = this.Validate.bind(this);
    this.GetLocation = this.GetLocation.bind(this);
    this.ToggleNavbar = this.ToggleNavbar.bind(this);
    this.ToggleIcon = this.ToggleIcon.bind(this);

  }

  handleScore({ target }) {
    this.Validate();
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (validateScore(this.state.score)) {
        this.setState({
          validScore: true,
          scoreEntered: true
        });
      }
      else {
        this.setState({
          validScore: false,
          scoreEntered: false
        });
      }
    });
  }

  CompetitionClicked(item, compname) {
    this.setState({
      currState: 2,
      clicked: item,
      competitionName: compname,
      validCompetition: true
    });
  }

  componentDidMount() {
    fetch(URL + "/api/Competition", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ competitionsList: data }))
      .catch(function (data) {
      });

    let token = getCookie("token");
    fetch(URL + "/api/features/getuserbytoken/" + token, {
      method: 'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(function (data) {
        this.setState({
          user: data
        });
      })
      .catch(function (data) {
      });

  }

  Validate() {
    let Valid = false;
    if (!validateScore(this.state.score)) {
      this.setState({
        validForm: false,
        validScore: false
      })
      Valid = false;
    }
    else {
      this.setState({
        validForm: true,
        validScore: true
      });
      Valid = true;
    }
    if (Valid)
      if (!this.state.competitionName) {
        this.setState({
          validForm: false,
          validCompetition: false
        });
        Valid = false;
      }
      else {
        this.setState({
          validForm: true,
          validCompetition: true
        });
        Valid = true;
      }
    return Valid;
  }

  ToggleNavbar() {
    this.setState({
      navbarState: !this.state.navbarState,
    })
    var Navbar = document.querySelector(".navbar-admin");
    if (Navbar.classList.contains("hidden")) {
      Navbar.classList.remove("hidden");
    }
    else {
      Navbar.classList.add("hidden");
    }
  }

  CameraClicked() {
    let Valid = this.Validate();
    this.state.Flashon = false;
    if (Valid) {
      this.setState({
        currState: 3,
        showCamera: true
      });
      this.ToggleNavbar();
      const video = document.getElementById("video");
      const constraints = {
        advanced: [{
          facingMode: "environment"
        }]
      };
      navigator.mediaDevices
        .getUserMedia({
          video: constraints
        })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        });
    }

  }

  RetakePhoto() {
    this.setState({
      currState: 3,
      showCamera: true,
      imageTaken: false

    });
    const video = document.getElementById("video");
    const constraints = {
      advanced: [{
        facingMode: "environment"
      }]
    };
    navigator.mediaDevices
      .getUserMedia({
        video: constraints
      })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      });

  }

  GetLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        this.SubmitScore();
      },
      (error) => { this.SubmitScore(); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  SubmitScore() {
    let Valid = this.Validate();
    if (Valid && !this.state.scoreSaved
      && this.state.longitude !== null
      && this.state.latitude !== null) {
      let RequestObject = {
        "UserScore": this.state.score / 1,
        "PictureURL": this.state.imageContent,
        "CompetitionName": this.state.competitionName,
        "Token": getCookie("token"),
        "Longitude": this.state.longitude,
        "Latitude": this.state.latitude
      }
      fetch(URL + "/api/Scores", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(response => response.json())
        .then(data => {
          this.setState({
            scoreSaved: true, currState: 5
          })
          if (this.state.navbarState === false) {
            this.ToggleNavbar();
          }
        });
      setTimeout(function () { window.location = "/scoreCapture"; }, 2000);

    }
    else if (Valid && !this.state.scoreSaved) {
      let RequestObject = {
        "UserScore": this.state.score / 1,
        "PictureURL": this.state.imageContent,
        "CompetitionName": this.state.competitionName,
        "Token": getCookie("token"),
      }
      fetch(URL + "/api/Scores", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(response => response.json())
        .then(data => this.setState({
          scoreSaved: true, currState: 5
        }));
      setTimeout(function () { window.location = "/scoreCapture"; }, 2000);
    }
  }

  TakePhoto() {

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    video.pause();
    context.drawImage(video, 0, 0, 310, 310);
    const image = new Image()
    image.src = canvas.toDataURL();
    this.setState({
      currState: 4,
      hideCamera: true,
      imageContent: image.src,
      imageTaken: true
    });

  }

  Flash() {
    this.ToggleIcon()
    this.state.Flashon = !this.state.Flashon
    var IsFlashOn = this.state.Flashon;
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      }
    })
      .then((stream) => {
        const video = document.querySelector('video');
        video.srcObject = stream;

        // get the active track of the stream
        const track = stream.getVideoTracks()[0];

        video.addEventListener('loadedmetadata', (e) => {
          window.setTimeout(() => (
            onCapabilitiesReady(track.getCapabilities())
          ), 500);
        });

        function onCapabilitiesReady(capabilities) {
          if (capabilities.torch) {
            track.applyConstraints({
              advanced: [{ torch: IsFlashOn }]
            })
              .catch(e => console.log(e));
          }
        }

      })
      .catch(err => console.error('getUserMedia() failed: ', err));

  }

  ToggleIcon() {
    var flash = document.getElementById("FlashImage");
    if (flash.classList.contains("flash")) {
      flash.classList.remove("flash");
      flash.classList.add("flashOff");
    }
    else {
      flash.classList.add("flash");
      flash.classList.remove("flashOff");
    }

  }

  goBack() {
    this.setState({
      imageTaken: false,
      showCamera: false
    });
    let video = document.getElementById('video');
    video.pause();
    this.ToggleNavbar();
  }

  render() {
    document.addEventListener('DOMContentLoaded', () => {
      var HideWhenAddingScore = document.querySelector("#HideWhenAddingScore");
      var last_size = document.body.clientHeight;
      window.addEventListener("resize", function () {
        if (last_size == document.body.clientHeight) {
          return;
        }
        if (HideWhenAddingScore.classList.contains("hidden-small")) {
          HideWhenAddingScore.classList.remove("hidden-small");
        }
        else {
          HideWhenAddingScore.classList.add("hidden-small");
        }
        last_size = document.body.clientHeight;
      })
    }, false);

    const stateOne = this.state.showCamera || this.state.imageTaken
    let competitionItem = [];
    if (this.state.competitionsList && this.state.competitionsList.length > 0) {
      for (let i = 0; i < this.state.competitionsList.length; i++) {
        competitionItem.push(<div className="competition-item-container" key={'mykey' + i}> <div key={'mykey' + i}
          className={this.state.clicked != null && this.state.clicked === i ? "active competition-item" : "competition-item"}>
          <li onClick={() => this.CompetitionClicked(i, this.state.competitionsList[i].name)}>
            {this.state.competitionsList[i].name} </li></div></div>);

      }
    }
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="position-relative" autoComplete="off">
        <div className={stateOne || this.state.scoreSaved ? "hidden" : "score-capture-header"}>
          <label className="label-for-score">ADD SCORE</label>
        </div>
        <div className={this.state.scoreSaved ? "sucess-container" : (stateOne ? "page-content-video" : "page-content")}>
          <div className={this.state.scoreSaved ? "sucess-container" : "hidden"}>
            <div className="success-container">
              <div className="success">
              </div>
              <label className="label-success-container">Score Captured </label>
            </div>
          </div>
          <div className={stateOne || this.state.scoreSaved ? "hidden" : ""}>

            <div className="label-score">
              <input type="number" id="scoreInput" min="0" step="1" autoComplete="off" name="score" className="score"
                onChange={this.handleScore}
                placeholder="Enter Score"></input>
            </div>
            <div className={this.state.validScore ? "hidden" : "invalidScore"}>Enter Valid Score</div>
            <div className="centre-label">
              <label className="label-competition">Select Competition</label>
            </div>
            <div className="competition-container">
              {competitionItem}

            </div>
          </div>
          <div className="submit-container" id="HideWhenAddingScore">
            <div className={this.state.imageTaken || this.state.showCamera
              ? "hidden" : "submit-button-elements"}>
              <div className="button-hover">
                <img src={cameraGray}
                  id="btnScoreCapture" className="btn-score-capture"
                  onClick={() => this.CameraClicked()} alt=''></img>
              </div>
            </div>
            <div className={(this.state.showCamera && !this.state.imageTaken)
              || this.state.imageTaken ? "hidden" : "submit-button-elements"}>
              <div className="button-hover ">
                <img src={graySubmit} onClick={() => this.GetLocation()}
                  className="button-that-submits" alt=''></img>
              </div>
            </div>
            <div className="icon-push-down no-margin">
              <div className={!this.state.imageTaken || this.state.scoreSaved
                ? "hidden" : "submit-button-elements third float-right"}>
                <div className="button-hover ">
                  <img src={submit} onClick={() => this.GetLocation()}
                    className="button-that-submits2" alt=''></img>
                </div>
              </div>
              <div className={this.state.imageTaken && !this.state.scoreSaved
                ? "submit-button-elements third float-right" : "hidden"} >
                <div className="button-hover">
                  <img src={grayRetry}
                    id="btnScoreCapture" className="retake" onClick={() => this.RetakePhoto()}
                    alt=''>
                  </img>
                </div>
              </div>
            </div>
          </div>
          <div className={this.state.showCamera ? "" : "hidden"}>
            <div className={this.state.imageTaken ? "hidden" : "label-score photo-top-label"}>
              Capture Score
              <img src={lightgrayback} onClick={() => this.goBack()} id="back"
                className="btnBack" alt=''></img>
            </div>
            <div className={this.state.imageTaken ? "hidden" : "video-container"}>
              <video id="video" width="310" height="310" className="video" autoPlay></video>
            </div>
            <div className={this.state.currState !== 3 ? "hidden" : "submit-container icon-push-down no-margin"}>
              <div className={this.state.currState !== 3 ? "hidden" : "submit-button-elements third"} >
                <div className="button-hover">
                  <div className={this.state.currState !== 3 ? "hidden" : ""}>
                    <div id="FlashImage" alt="" className="img-responsive flash"
                      onClick={() => this.Flash()}></div>
                  </div>
                </div>
              </div>
              <div className={this.state.currState !== 3 && this.state.scoreSaved ? "hidden" : "submit-button-elements third"}>
                <div className="button-hover">
                  <div className={this.state.currState !== 3 ? "hidden" : ""}>
                    <img src={cameraBlack} onClick={() => this.TakePhoto()} id="snap"
                      className="score-capture" alt=''></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.imageTaken && !this.state.scoreSaved ? "image-container" : "hidden"}>
            <div className="centre-label">
              <div className={!this.state.imageTaken ? "hidden" : "label-score photo-top-label"}>
                Score Captured
              </div>
              <div className="back-spacing">
              </div>
            </div>
            <canvas id="canvas" width="310" height="310" className="image-view background" ></canvas>
          </div>
        </div>

      </div>
    )
  }
}
