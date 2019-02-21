import React, { Component } from 'react';
import '../components/ScoreCapture.css';
import { Button } from 'reactstrap';
import { validateScore } from './Validators.js';
import { getCookie } from './cookie.js'


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
      ImageTaken: false
    }
    this.CompetitionClicked = this.CompetitionClicked.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.TakePhoto = this.TakePhoto.bind(this);
    this._base64ToArrayBuffer = this._base64ToArrayBuffer.bind(this);
    this.SubmitScore = this.SubmitScore.bind(this);
    this.Reset = this.Reset.bind(this);
    this.RetakePhoto = this.RetakePhoto.bind(this);
  

  }

  handleScore({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    let stateUpdate = {
      invalidScore: false,
    }
    if (!validateScore(this.state.score)) {
      stateUpdate.invalidPassword = true;

    };
    this.setState({
      ...stateUpdate
    });
  }

  CompetitionClicked(item, compname) {
    this.setState({
      currState: 2,
      clicked: item,
      competitionName: compname
    });
  }

  _base64ToArrayBuffer(base64) {
    var binary_string = base64;
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  componentDidMount() {
    console.log("in function");
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
        this.state.user = data;
      })
      .catch(function (data) {
        console.log("error")
      });

  }

  CameraClicked() {
    if (!this.state.competitionName != "" || this.state.score < 1)
      this.state.validForm = false;
    else
      this.state.validForm = true;

    if (this.state.validForm) {
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
  RetakePhoto()
  {
      this.setState({
        currState: 3,
        showCamera: true,
        ImageTaken:false

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

  SubmitScore() {

    if (this.state.validForm && !this.state.scoreSaved) {
      let RequestObject = {
        "UserScore": this.state.score,
        "PictureURL": this.state.imageContent,
        "CompetitionName": this.state.competitionName,
        "Token": getCookie("token")
      }
      fetch("http://localhost:63474/api/Scores", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(response => response.json()).then(data => this.setState({ scoreSaved: true, currState: 5 }));
    }
  }

  Reset() {
    if(!this.state.scoreSaved)
    this.SubmitScore();
    this.setState({
      currState: 1,
      imageContent: null,
      clicked: null,
      competitionName: null,
      scoreSaved: false,
      ImageTaken:false,
      showCamera:false,
      score:0,
      scoreSaved:false
    });
    var scoreInput = document.getElementById("scoreInput");
    scoreInput.value = "";
  }

  TakePhoto() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    context.drawImage(video, 0, 0, 480, 480);
    const image = new Image()
    image.src = canvas.toDataURL();
    this.setState({
      currState: 4,
      hideCamera: true,
      imageContent: image.src,
      ImageTaken: true
    });
    video.pause();
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
    if (this.state.clicked != null) {

      //<canvas key={'myKey' + 6} id="canvas" className={this.state.currState !== 4 ? "hidden" : "video"}></canvas>
    }
    //  scoreSavedSucessMessage.push(<div key={'myKey' + 1} className={this.state.scoreSaved == false ? "hidden":""}>
    //  Successfully Saved Score</div>, 

    return (
      <div>
        <div className={this.state.showCamera && !this.state.ImageTaken ? "back-white page-content no-padding" : this.state.ImageTaken ? "opacity-85 page-content no-padding" : "page-content no-padding"}>
          <div className={this.state.showCamera && !this.state.ImageTaken ? "hidden" : ""}>>
        <div className="label-score">
              <label>Type in score</label>
              <div className="input-container">
                <input id = "scoreInput"name="score" className="score"
                  onChange={this.handleScore}></input>
              </div>
              <div className={this.state.validForm ? "hidden" : ""}>Invalid Form</div>
              {this.state.validForm}
            </div>
            <div className="centre-label">
              <label className="label-competition">Select Competition</label>
            </div>
            <div className="competition-container">
              {competitionItem}
            </div>
            <div className={this.state.scoreSaved ? "sucess-container":"hidden"}> 
                <div className="success"> Score Saved successfully </div>
            </div>
            <div className="submit-container">
              <div className="submit-button-elements">
                <Button onClick={() => this.Reset()} id="snap" className="">Another Score</Button>
              </div>
              <div className="submit-button-elements">
                <Button className={this.state.ImageTaken ? "hidden":""} id="btnScoreCapture" onClick={() => this.CameraClicked()}>Capture score</Button>
              </div>
              <div className="submit-button-elements">
                <Button className={this.state.ImageTaken ? "":"hidden"} id="btnScoreCapture" onClick={() => this.RetakePhoto()}>Retake score</Button>
              </div>
              <div className="submit-button-elements">
                <Button onClick={() => this.SubmitScore()} className="" >Submit</Button>
              </div>
            </div>


          </div>
          <div className={this.state.showCamera ? "" : "hidden"}>
            <div className="video-container">
            <div className="label-score">
            <label className={this.state.ImageTaken ? "hidden" :"front-dark"}>Capture score</label>
            </div>
              <video id="video" className={this.state.ImageTaken ? "hidden" : "video"} autoPlay></video>
            </div>
            <div className="submit-container">
              <div className="submit-button-elements">
                <button onClick={() => console.log("flash on")} id="Flash"
                  className={this.state.currState !== 3 ? "hidden" : ""}>flash</button>
              </div>
              <div className="submit-button-elements">
                <button onClick={() => this.TakePhoto()} id="snap"
                  className={this.state.currState !== 3 ? "hidden" : ""}>Snap</button>
              </div>
            </div>


          </div>

        </div>
        <div className="video-container">
          <canvas key={'myKey' + 6} id="canvas" className={this.state.ImageTaken ? "image-view" : "hidden"}></canvas>
        </div>
      </div>
    )
  }
}
