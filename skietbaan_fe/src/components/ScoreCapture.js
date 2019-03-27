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
      flashOn: false,
      validScore: true,
      validCompetition: true,
      scoreEntered: false,
      navbarState: false,
      eventsAdded: false,
      lastSize : 0

    }

    this.competitionClicked = this.competitionClicked.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.flash = this.flash.bind(this);
    this.retakePhoto = this.retakePhoto.bind(this);
    this.validate = this.validate.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleNavbar2 = this.toggleNavbar2.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  handleScore({ target }) {
    this.validate();
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

  competitionClicked(item, compname) {
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

  validate() {
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

  toggleNavbar() {
    this.setState({
      navbarState: !this.state.navbarState,
    })
    var navbar = document.querySelector(".navbar-admin");
    if (navbar.classList.contains("hidden")) {
      navbar.classList.remove("hidden");
    }
    else {
      navbar.classList.add("hidden");
    }
  }

  toggleNavbar2() {
    var navbar = document.querySelector(".navbar-admin");
    if (this.state.lastSize > document.body.clientHeight) {
      navbar.setAttribute('hidden', 'true');
      this.toggleNavbar();
    }
    else {
      navbar.removeAttribute('hidden');
      this.toggleNavbar();
    }
  }

  CameraClicked() {
    let Valid = this.validate();
    this.setState({
      flashOn: false
    })
    if (Valid) {
      this.setState({
        currState: 3,
        showCamera: true
      });
      this.toggleNavbar();
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

  retakePhoto() {
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

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        this.submitScore();
      },
      (error) => { this.submitScore(); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  submitScore() {
    let Valid = this.validate();
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
            this.toggleNavbar();
          }
        });
      setTimeout(function () { window.location = "/scoreCapture"; }, 4000);

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
      setTimeout(function () { window.location = "/scoreCapture"; }, 5000);
    }
  }

  takePhoto() {

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

  flash() {
    this.toggleIcon()
    this.state.flashOn = !this.state.flashOn
    var isFlashOn = this.state.flashOn;
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
              advanced: [{ torch: isFlashOn }]
            })
              .catch();
          }
        }

      })
      .catch();

  }

  toggleIcon() {
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
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.stop();
    }
    video.srcObject = null;
      this.toggleNavbar();
  }

  render() {

    if (this.state.lastSize === 0) {
      this.state.lastSize = document.body.clientHeight; 
      document.addEventListener('DOMContentLoaded', () => {        
        window.addEventListener("resize", () => {
            this.toggleNavbar2();
        })
      });
    }
    const stateOne = this.state.showCamera || this.state.imageTaken
    let competitionItem = [];
    if (this.state.competitionsList && this.state.competitionsList.length > 0) {
      for (let i = 0; i < this.state.competitionsList.length; i++) {
        competitionItem.push(<div className="competition-item-container" key={'mykey' + i}> <div key={'mykey' + i}
          className={this.state.clicked != null && this.state.clicked === i ? "active competition-item" : "competition-item"}>
          <li onClick={() => this.competitionClicked(i, this.state.competitionsList[i].name)}>
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
                <div className="error-message-container">
                <div className={this.state.validScore ? "hidden" : "invalid-score"}>Enter Valid Score</div>
                </div>
            </div>
            
            <div className="centre-labels">
              <label className="label-competition">Select Competition</label>
            </div>
            <div className="competition-container">
              {competitionItem}
             
            </div>
            <div className="error-message-container">
              <div className={this.state.validCompetition === false && this.state.validScore === true
                ? "invalid-comp" : "hidden"}>Select Competition</div>
              </div>
            <div className="submit-container">
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
                  <img src={graySubmit} onClick={() => this.getLocation()}
                    className="button-that-submits" alt=''></img>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.showCamera ? "" : "hidden"}>
          
            <div className={this.state.imageTaken ? "hidden" : "photo-top-label"}>Capture Score
              <img src={lightgrayback} onClick={() => this.goBack()} id="back"
                className="btn-back" alt='backBtn'></img>
            </div>
            
            <div className={this.state.imageTaken ? "hidden" : "video-container"}>
              <video id="video" width="310" height="310" className="video" autoPlay></video>
            </div>
            <div className={this.state.currState !== 3 ? "hidden" : "submit-container icon-push-down no-margin"}>
              <div className={this.state.currState !== 3 ? "hidden" : "submit-button-elements third"} >
                <div className="button-hover">
                  <div className={this.state.currState !== 3 ? "hidden" : ""}>
                    <div id="FlashImage" alt="" className="img-responsive flash"
                      onClick={() => this.flash()}></div>
                  </div>
                </div>
              </div>
              <div className={this.state.currState !== 3 && this.state.scoreSaved ? "hidden" : "submit-button-elements third"}>
                <div className="button-hover">
                  <div className={this.state.currState !== 3 ? "hidden" : ""}>
                    <img src={cameraBlack} onClick={() => this.takePhoto()} id="snap"
                      className="score-capture" alt=''></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.imageTaken && !this.state.scoreSaved ? "image-container" : "hidden"}>
              <div className={!this.state.imageTaken ? "hidden" : "photo-top-label"}>
                Score Captured
              </div>
            <div className={this.state.imageTaken ? "video-container" : "hidden"}>
            <canvas id="canvas" width="310" height="310" className="image-view background" ></canvas>
            </div>
            <div className="icon-push-down">
              <div className={!this.state.imageTaken || this.state.scoreSaved
                ? "hidden" : "submit-button-elements third float-right"}>
                <div className="button-hover ">
                  <img src={submit} onClick={() => this.getLocation()}
                    className="button-that-submits2" alt=''></img>
                </div>
              </div>
              <div className={this.state.imageTaken && !this.state.scoreSaved
                ? "submit-button-elements third float-right" : "hidden"} >
                <div className="button-hover">
                  <img src={grayRetry}
                    id="btnScoreCapture" className="retake" onClick={() => this.retakePhoto()}
                    alt=''>
                  </img>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
