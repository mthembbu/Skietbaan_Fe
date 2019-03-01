import React, { Component } from 'react';
import '../components/ScoreCapture.css';
import { validateScore } from './Validators.js';
import { getCookie } from './cookie.js';
import { URL } from '../actions/types.js';

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
      ImageTaken: false,
      latitude: null,
      longitude: null,
      error: null,
      Flashon: false,
      validScore: true,
      validCompetition: true,
      scoreEntered:false
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

  }

  handleScore({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (validateScore(this.state.score)) {
        this.setState({
          validScore: true,
          scoreEntered:true
        });
      }
      else {
        this.setState({
          validScore: false,
          scoreEntered:false
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
        console.log("error")
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
    if (parseInt(this.state.score,0) < 1 || this.state.score === null 
    || (this.state.score % 1) !== 0) {
      this.setState({
        validForm: false,
        validScore: false
      });
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
      ImageTaken: false

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
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  SubmitScore() {
    let Valid = this.Validate();
    if (Valid && !this.state.scoreSaved) {
      this.GetLocation();
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
        .then(data => this.setState({
          scoreSaved: true, currState: 5
        }));
      setTimeout(function () { window.location = "/scorecapture"; }, 2000);

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
      ImageTaken: true
    });

  }

  Flash() {
    this.setState({
      Flashon : !this.Flashon
    })
    
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


  goBack() {
    this.setState({
      ImageTaken: false,
      showCamera: false
    });
    let video = document.getElementById('video');
    video.pause();
    this.ToggleNavbar();
  }


  render() {
    const stateOne = this.state.showCamera || this.state.ImageTaken
    let competitionItem = [];
    if (this.state.competitionsList && this.state.competitionsList.length > 0) {
      for (let i = 0; i < this.state.competitionsList.length; i++) {
        competitionItem.push(<div className="competition-item-container" key={'mykey' + i}> <div key={'mykey' + i}
          className={this.state.clicked != null && this.state.clicked === i ? "active competition-item" : "competition-item"}>
          <li onClick={() => this.CompetitionClicked(i, this.state.competitionsList[i].name)}>
            {this.state.competitionsList[i].name} </li></div></div>);

      }
    }

    return (
      <div className="position-relative">
        <div className={stateOne ? "" : "white-border"}></div>
        <div className={stateOne ? "page-content-video" : "page-content"}>
          <div className={stateOne ? "hidden" : ""}>

            <div className="label-score">
              <div className="centre-label">
                <label className="scorelabel">Type in score</label>
              </div>
              <div className={this.state.validScore ? "hidden" : "invalidScore"}>.</div>
              <div className="input-container">
                <input type="number" id="scoreInput" min="0" step="1" name="score" className="score"
                  onChange={this.handleScore}></input>
              </div>

            </div>
            <div className={this.state.scoreEntered ? "":"hidden"}>
            <div className="centre-label">
              <label className="label-competition">Select Competition</label>
            </div>

            <div className={this.state.validCompetition ? "hidden" : "invalidComp"}>.</div>
            <div className="competition-container">
              {competitionItem}
            </div>
            </div>
            <div className={this.state.scoreSaved ? "sucess-container" : "hidden"}>
              <div className="success"> Score Saved successfully </div>
            </div>
          </div>
          <div className="submit-container">
            <div className={this.state.ImageTaken || this.state.showCamera 
              || !this.state.scoreEntered ? "hidden" : "submit-button-elements"}>
              <div className="button-hover">

                <img src={require('../components/assets/scoreCapture.png')}
                  id="btnScoreCapture" className="btnScoreCapture"
                  onClick={() => this.CameraClicked()} alt=''></img>
              </div>
              <label className="labelIcon">Capture score</label>
            </div>
            <div className={(this.state.showCamera && !this.state.ImageTaken) 
              || this.state.ImageTaken || !this.state.scoreEntered ? "hidden" : "submit-button-elements"}>
              <div className="button-hover ">
                <img src={require('../components/assets/submitScore.png')} onClick={() => this.GetLocation()}
                  className="button-that-submits" alt=''></img>
              </div>
              <label className="labelIcon">Submit</label>
            </div>
            <div className="icon-pushdown no-margin">
            <div className={!this.state.ImageTaken ? "hidden" : "submit-button-elements third float-right"}>
                <div className="button-hover ">
                  <img src={require('../components/assets/submitScore.png')} onClick={() => this.GetLocation()}
                    className="button-that-submits" alt=''></img>
                </div>
                <label className="labelIcon">Submit</label>
              </div>
              <div className={this.state.ImageTaken ? "submit-button-elements third float-right" : "hidden"} >
                <div className="button-hover">
                  <img src={require('../components/assets/retakeImage.png')}
                    id="btnScoreCapture" className="retake" onClick={() => this.RetakePhoto()}
                    alt=''>
                  </img>
                </div>
                <label className="labelIcon">Re-Capture Score</label>
              </div>
            </div>

          </div>
          <div className={this.state.showCamera ? "" : "hidden"}>
            <div className={this.state.ImageTaken ? "hidden" : "label-score photo-top-label"}>
              Capture Score
              <img src={require('../components/assets/grayBack.png')} onClick={() => this.goBack()} id="back"
                className="btnBack" alt=''></img>
              </div>
            <div className="back-spacing">
              
            </div>
            <div className={this.state.ImageTaken ? "hidden" : "video-container"}>
              <video id="video" width="310" height="310" className="video" autoPlay></video>
            </div>
            <div className="submit-container icon-pushdown no-margin">
              <div className={this.state.currState !== 3 ? "hidden" : "submit-button-elements third"} >
                <div className="button-hover">
                  <div className={this.state.currState !== 3 ? "hidden" : ""}>
                    <div onClick={() => this.Flash()} id="Flash" className={!this.state.Flashon ? "flash" : "flashOff"}>
                    </div>
                  </div>
                </div>
              </div>
              <div className={this.state.currState !== 3 ? "hidden" : "submit-button-elements third"}>
                <div className="button-hover">
                  <div className={this.state.currState !== 3 ? "hidden" : ""}>
                    <img src={require('../components/assets/scoreCapture.png')} onClick={() => this.TakePhoto()} id="snap"
                      className="score-capture-black" alt=''></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.ImageTaken ? "image-container" : "hidden"}>
            <div className="centre-label">
              <div className={!this.state.ImageTaken ? "hidden" : "label-score photo-top-label"}>
                <b>Score Captured</b>
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
