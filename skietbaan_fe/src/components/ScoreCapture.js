import React, { Component } from 'react';
import '../components/ScoreCapture.css';
import { validateScore } from './Validators.js';
import { getCookie } from './cookie.js';

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
      validScore:true,
      validCompetition:true
    }
    this.CompetitionClicked = this.CompetitionClicked.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.TakePhoto = this.TakePhoto.bind(this);
    this.SubmitScore = this.SubmitScore.bind(this);
    this.Flash = this.Flash.bind(this);
    this.RetakePhoto = this.RetakePhoto.bind(this);
    this.Validate = this.Validate.bind(this);
    this.GetLocation = this.GetLocation.bind(this);

  }

  handleScore({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (!validateScore(this.state.score)) {
        this.setState({
          validScore: false,
        });
      }
      else{
        this.setState({
          validScore: true,
        });
      }
  });
  }

  CompetitionClicked(item, compname) {
    this.setState({
      currState: 2,
      clicked: item,
      competitionName: compname,
      validCompetition:true
    });
  }

  componentDidMount() {
    fetch("http://localhost:63474/api/Competition", {
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
    fetch("http://localhost:63474/api/features/getuserbytoken/" + token, {
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
    if( parseInt(this.state.score) < 1 || this.state.score === null || this.state.score === "" || (this.state.score % 1) !== 0) 
    {
      this.setState({
        validForm: false,
        validScore:false
      });
      Valid = false;
    }
    else {
      this.setState({
        validForm: true,
        validScore:true
      });
      Valid = true;
    }
    if(Valid)
    if (!this.state.competitionName ){
      this.setState({
        validForm: false,
        validCompetition:false
      });
      Valid = false;
    }
    else {
      this.setState({
        validForm: true,
        validCompetition:true
      });
      Valid = true;
    }
    return Valid;
  }

  CameraClicked() {
    let Valid = this.Validate();

    if (Valid) {
      this.setState({
        currState: 3,
        showCamera: true
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
      fetch("http://localhost:63474/api/Scores", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(response => response.json())
      .then(data => this.setState({
         scoreSaved: true, currState: 5 }));
         setTimeout(function(){ window.location ="/scorecapture"; }, 2000);
         
    }
  }

  TakePhoto() {

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    video.pause();
    context.drawImage(video, 0, 0, 360, 360);
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
    this.state.Flashon = !this.state.Flashon;
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
    function onCapabilitiesReady(capabilities) {
      console.log(capabilities);
    }

  }

  render() {
    let competitionItem = [];
    if (this.state.competitionsList && this.state.competitionsList.length > 0) {
      for (let i = 0; i < this.state.competitionsList.length; i++) {
        competitionItem.push(<div className="competition-item-container"> <div key={'mykey' + i} className={this.state.clicked != null && this.state.clicked === i ? "active competition-item" : "competition-item"}><li onClick={() =>
          this.CompetitionClicked(i, this.state.competitionsList[i].name)}>
          {this.state.competitionsList[i].name} </li></div></div>);

      }
    }

    return (
      <div className="position-relative">
        <div className={this.state.showCamera && !this.state.ImageTaken ? "back-white page-content no-padding" :
          this.state.ImageTaken ? "opacity-85 page-content no-padding" : "page-content no-padding"}>
          <div className={this.state.showCamera && !this.state.ImageTaken ? "hidden" : ""}>>
        <div className="label-score">
              <label>Type in score</label>
              <div className="input-container">
                <input type="number" id="scoreInput" min="0" step="1" name="score" className="score"
                  onChange={this.handleScore} placeholder="Score"></input>
              </div>
              <div className={this.state.validScore ? "hidden" : "invalid"}>Please enter valid score </div>
            </div>
            <div className="centre-label">
              <label className="label-competition">Select Competition</label>
               <div className={this.state.validCompetition ? "hidden" : "invalid"}>Please select a competition</div>
            </div>
            <div className="competition-container">
              {competitionItem}
            </div>
            <div className={this.state.scoreSaved ? "sucess-container" : "hidden"}>
              <div className="success"> Score Saved successfully </div>
            </div>
            <div className="submit-container">
              <div className={this.state.ImageTaken ? "hidden" : "submit-button-elements"}>
                <div className="button-hover">

                  <img src={require('../components/assets/scoreCapture.png')} 
                    id="btnScoreCapture" onClick={() => this.CameraClicked()} alt=''></img>
                </div>
                <label className="labelIcon">Capture score</label>
              </div>
              <div className={this.state.ImageTaken ? "submit-button-elements" : "hidden"} >
                <div className="button-hover">
                  <img src={require('../components/assets/retakeImage.png')}
                    id="btnScoreCapture" onClick={() => this.RetakePhoto()}
                    alt=''>
                  </img>
                </div>
                <label className= "labelIcon">Retry</label>
              </div>
              <div className="submit-button-elements">
                <div className="button-hover">
                  <img src={require('../components/assets/submitScore.png')} onClick={() => this.GetLocation()}
                    className="button-that-submits" alt=''></img>
                </div>
                <label className="labelIcon">Submit</label>
              </div>
            </div>
          </div>
          <div className={this.state.showCamera ? "" : "hidden"}>
            <div className={this.state.ImageTaken ? "hidden" : "video-container"}>
              <div className="label-score">
                <label className={this.state.ImageTaken ? "hidden" : "front-dark"}>Capture Score</label>
              </div>
              <video id="video" width="360" height="360" className="video" autoPlay></video>
            </div>
            <div className="submit-container">
            <div className={this.state.currState !== 3 ? "hidden" : "submit-button-elements"} >
              <div className="button-hover">
                <img src={require('../components/assets/FlashOn.png')} onClick={() => this.Flash()} id="Flash"
                  className="flash" alt=''></img>
              </div>
              </div>
              <div  className={this.state.currState !== 3 ? "hidden" : "submit-button-elements"}>
              <div className="button-hover">
                <img src={require('../components/assets/scoreCapture.png')} onClick={() => this.TakePhoto()} id="snap"
                  className= "score-capture-black" alt=''></img>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.ImageTaken ? "image-container" : "hidden"}>
            <canvas id="canvas" width="360" height="360" className="image-view background" ></canvas>
          </div>
      </div>
    )
  }
}
