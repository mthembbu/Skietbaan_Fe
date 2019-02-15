import React, { Component } from 'react';
import '../components/ScoreCapture.css';
import { Button } from 'reactstrap';
import { validateScore } from './Validators.js';
import {getCookie} from './cookie.js'


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
      validForm: false,
      competitionsList:[],
      user:null,
      scoreSaved:false
    }
    this.CompetitionClicked = this.CompetitionClicked.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.TakePhoto = this.TakePhoto.bind(this);
    this._base64ToArrayBuffer = this._base64ToArrayBuffer.bind(this);
    this.SubmitScore = this.SubmitScore.bind(this);
    this.Reset = this.Reset.bind(this);

  }

  handleScore({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    let isValid = true;
    let stateUpdate = {
      invalidScore: false,
    }
    if (!validateScore(this.state.score)) {
      stateUpdate.invalidPassword = true;
      isValid = false;
    };
    this.setState({
      ...stateUpdate,
      validForm: isValid
    });
  }

  CompetitionClicked(item, competitionName) {
    this.setState({
      currState: 2,
      clicked: item,
      competitionName: competitionName
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
    fetch("http://localhost:63474/api/Competition", {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => this.setState({ competitionsList: data }));

    var token = getCookie("token");
    fetch("http://localhost:63474/api/features/getuserbytoken/" + token, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => this.setState({ user: data }));
  }
  
  

  CameraClicked() {
    this.setState({
      currState: 3
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
          video.srcObject=stream;
          video.play();
        });
  }

  SubmitScore() {


    if (this.state.validForm || true ) {
      let RequestObject = {
        "UserScore": this.state.score,
        "PictureURL": this.state.imageContent,
        "Competition": this.state.competitionName,
        "Username":this.state.user.username
      }
      fetch("http://localhost:63474/api/Scores", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(response => response.json()).then(data => this.setState({ scoreSaved: true,currState:5 }));
    }
  }
  Reset()
  {
    this.setState({
      scoreSaved: null,
      currState:1,
      imageContent:null,
      clicked:null,
      competitionName:null,
      scoreSaved:false
    });
  }

  TakePhoto() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    context.drawImage(video, 0, 0, 640, 480);
    const image = new Image()
    image.src = canvas.toDataURL();
    console.log("photo")
    this.setState({
      currState: 4,
      hideCamera: true,
      imageContent: image.src
    });
    video.pause();
  }

  render() {

    let competitionItem = [];
    let scoreSavedSucessMessage = [];
    if(this.state.competitionsList && this.state.competitionsList.length > 0)
    {
      for (let i = 0; i < this.state.competitionsList.length; i++) {
        competitionItem.push(<div key={'mykey' + i} className={this.state.clicked != null &&
          this.state.clicked !== i ? "hidden" : "competition-item"}><li onClick={() => this.CompetitionClicked(i, this.state.competitionsList[i].name)}>
            {this.state.competitionsList[i].name} </li></div>);
    }
  }

    if (this.state.clicked != null) {
      competitionItem.push(<input name="score" key={'myKey' + 10} className={this.state.currState !== 2 ? "hidden" : "inputScore"}
        onChange={this.handleScore}></input>,
        //<Button key={'myKey' + 1} id="btnExtra" className={this.state.currState !== 2 ? "hidden" : ""} >S n Extra</Button>,
        <Button key={'myKey' + 2} id="btnScoreCapture" className={this.state.currState === 2 ? "" : "hidden"}
          onClick={() => this.CameraClicked()} >Capture score</Button>,
        <Button key={'myKey' + 3} onClick={() => this.SubmitScore()} className={this.state.currState === 2 || this.state.currState === 4 ? "" : "hidden"} >
          Submit</Button>,
        <video key={'myKey' + 4} id="video" className={this.state.currState === 4 ? "hidden" : "video"} autoPlay></video>,
        <button key={'myKey' + 5} onClick={() => this.TakePhoto()} id="snap" className={this.state.currState !== 3 ? "hidden" : ""}>
          Snap</button>,
        <canvas key={'myKey' + 6} id="canvas" className={this.state.currState !== 4 ? "hidden" : "video"}></canvas>
      )
    }

      scoreSavedSucessMessage.push(<div key={'myKey' + 1} className={this.state.scoreSaved == false ? "hidden":""}>Sucesfully Saved Score</div>, 
              <button key={'myKey' + 2} onClick={() => this.Reset()} id="snap" className={this.state.scoreSaved == false ? "hidden" : ""}>
      Another Score</button>,);
    return (

      <div className="page-content">
        <div className="ProgressBar">
          <div className={this.state.currState >= 1 ? "Circle first active" : "Circle first "}>1</div>
          <div className={this.state.currState >= 2 ? "Circle second active" : "Circle second "}>2</div>
          <div className={this.state.currState >= 3 ? "Circle third active" : "Circle third "}>3</div>
          <div className={this.state.currState >= 4 ? "Circle fourth active" : "Circle fourth "}>4</div>
        </div>
        <ul className="competition-container">
        {scoreSavedSucessMessage}
          {competitionItem}
        </ul>

      </div>
    )
  }
}
