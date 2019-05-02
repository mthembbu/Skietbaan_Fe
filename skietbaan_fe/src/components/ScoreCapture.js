import React, { Component } from "react";
import "../components/ScoreCapture.css";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types.js";
import cameraGray from "../components/assets/redSubmitButton.png";
import graySubmit from "../components/assets/btnThatSubmitsRed.png";
import grayRetry from "../components/assets/redRetry.png";
import lightgrayback from "../components/assets/Back.png";
import submit from "../components/assets/biggerRedSubmit.png";
import camera from "../components/assets/biggerRedCamera.png";
import { connect } from "react-redux";
import { selectedPage, updateSelectedCompetition } from "../actions/postActions";
import { toggleToggleBar, toggleHeader } from "./toggle.js"
class ScoreCapture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currState: 1,
      clicked: null,
      score: null,
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
      height: document.body.clientHeight,
      somethingClicked: false,
      maximumScore: 20,
      getData: false,
      exceptionCaught: false,
      iOS: !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
    };

    this.competitionClicked = this.competitionClicked.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.flash = this.flash.bind(this);
    this.retakePhoto = this.retakePhoto.bind(this);
    this.validate = this.validate.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", () => {
      let Navbar = document.querySelector(".navbar-admin");
      if (this.state.height === document.body.clientHeight) {
        Navbar.classList.remove("hidden");
      } else {
        Navbar.classList.add("hidden");
      }
    });
  }

  handleScore({ target }) {
    this.validate();
    this.setState(
      {
        [target.name]: target.value
      },
      () => {
        if (
          parseFloat(this.state.score) <= this.state.maximumScore &&
          parseFloat(this.state.score) >= 0 &&
          target.value !== undefined
        ) {
          this.setState({
            validScore: true,
            scoreEntered: true
          });
        } else {
          this.setState({
            validScore: false,
            scoreEntered: false
          });
        }
      }
    );
  }

  cancelClicked() {
    toggleToggleBar();
    if (this.state.somethingClicked) {
      this.setState({
        somethingClicked: !this.state.somethingClicked,
        clicked: null
      });
    }
  }

  competitionClicked(item, compname, maximumScore) {
    if (this.state.clicked == null) {
      toggleToggleBar();
      this.setState({
        somethingClicked: true,
        currState: 2,
        clicked: item,
        competitionName: compname,
        validCompetition: true,
        maximumScore: maximumScore,
        validScore: true
      });
      document.getElementById("scoreInput").value = "";
    }
  }

  componentDidMount() {
    fetch(BASE_URL + "/api/Competition", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ competitionsList: data, getData: true }))
      .catch(err => {
        this.setState({ exceptionCaught: true })
      });
  }

  validate() {
    let Valid = false;
    if (
      parseFloat(this.state.score) > this.state.maximumScore ||
      parseFloat(this.state.score) < 0 ||
      this.state.score === "" ||
      this.state.score === null
    ) {
      this.setState({
        validForm: false,
        validScore: false
      });
      Valid = false;
    } else {
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
      } else {
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
      navbarState: !this.state.navbarState
    });
    var navbar = document.querySelector(".navbar-admin");
    if (navbar.classList.contains("hidden")) {
      navbar.classList.remove("hidden");
      navbar.removeAttribute("hidden");
    } else {
      navbar.classList.add("hidden");
      navbar.setAttribute("hidden", "true");
    }
  }

  CameraClicked() {
    let Valid = this.validate();
    toggleHeader();
    this.setState({
      flashOn: false
    });
    if (Valid) {
      this.setState({
        currState: 3,
        showCamera: true
      });
      this.toggleNavbar();
      const video = document.getElementById("video");
      const constraints = {
        advanced: [
          {
            facingMode: "environment"
          }
        ]
      };
      navigator.mediaDevices
        .getUserMedia({
          video: constraints
        })
        .then(stream => {
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
      advanced: [
        {
          facingMode: "environment"
        }
      ]
    };
    navigator.mediaDevices
      .getUserMedia({
        video: constraints
      })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      });
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
        this.submitScore();
      },
      error => {
        this.submitScore();
      },
      { enableHighAccuracy: true, timeout: 30000 }
    );
  }

  submitScore() {
    let Valid = this.validate();
    if (
      Valid &&
      !this.state.scoreSaved &&
      this.state.longitude !== null &&
      this.state.latitude !== null
    ) {
      let RequestObject = {
        UserScore: this.state.score / 1,
        PictureURL: this.state.imageContent,
        CompetitionName: this.state.competitionName,
        Token: getCookie("token"),
        Longitude: this.state.longitude,
        Latitude: this.state.latitude
      };

      fetch(BASE_URL + "/api/Scores", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(RequestObject)
      })
        .then(response => response.json())
        .then(data => {
          if (data.indexOf("Score Added Successfully") > -1) {
            this.setState({
              scoreSaved: true,
              currState: 5
            });

          }
          if (this.state.navbarState === false) {
            this.toggleNavbar();
            toggleHeader();
          }

          this.props.updateSelectedCompetition(this.state.competitionName);
        })
        .catch(err => {
          /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
        });
      setTimeout(function () {
        window.location = "/scoreCapture";
      }, 2000);
    }
  }

  takePhoto() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let video = document.getElementById("video");
    video.pause();
    context.drawImage(video, 0, 0, 310, 310);
    const image = new Image();
    image.src = canvas.toDataURL();
    this.setState({
      currState: 4,
      hideCamera: true,
      imageContent: image.src,
      imageTaken: true
    });
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.stop();
    }
    video.srcObject = null;
  }

  flash() {
    this.toggleIcon();
    this.state.flashOn = !this.state.flashOn;
    var isFlashOn = this.state.flashOn;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment"
        }
      })
      .then(stream => {
        const video = document.querySelector("video");
        video.srcObject = stream;

        // get the active track of the stream
        const track = stream.getVideoTracks()[0];

        video.addEventListener("loadedmetadata", e => {
          window.setTimeout(
            () => onCapabilitiesReady(track.getCapabilities()),
            500
          );
        });

        function onCapabilitiesReady(capabilities) {
          if (capabilities.torch) {
            track
              .applyConstraints({
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
    } else {
      flash.classList.add("flash");
      flash.classList.remove("flashOff");
    }
  }

  goBack() {
    this.setState({
      imageTaken: false,
      showCamera: false
    });
    toggleHeader();
    let video = document.getElementById("video");
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track.stop();
    }
    video.srcObject = null;
    if (this.state.navbarState === true) {
      this.toggleNavbar();
    }
  }
  render() {

    const stateOne = this.state.showCamera || this.state.imageTaken;

    let competitionItem = [];
    if (this.state.competitionsList && this.state.competitionsList.length > 0) {
      for (let i = 0; i < this.state.competitionsList.length; i++) {
        competitionItem.push(
          <div className="competition-item-container" key={"mykey" + i}>
            <div
              key={"mykey" + i}
              className={
                this.state.somethingClicked === false &&
                  this.state.clicked === null
                  ? "competition-item"
                  : this.state.clicked != null && this.state.clicked === i
                    ? "competition-item active"
                    : "competition-item fade-out"
              }
            >
              <li
                className="li-container"
                onClick={() =>
                  this.competitionClicked(
                    i,
                    this.state.competitionsList[i].name,
                    this.state.competitionsList[i].maximumScore
                  )
                }
              >
                {this.state.competitionsList[i].name.toUpperCase()}
              </li>
              <div
                onClick={() => this.cancelClicked()}
                className="competiton-cancel-button"
              />
            </div>
          </div>
        );
      }
    } else if (this.state.getData === true || this.state.exceptionCaught === true) {
      competitionItem.push(
        <div className="not-active">
          <div className="not-active-message">
            No Competitions available at this point, we’ll have them ready soon
            !
          </div>
        </div>
      );
    }
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="add-score-entire-page-content" autoComplete="off">
        <div
          className={
            this.state.scoreSaved
              ? "sucess-container"
              : stateOne
                ? "page-content-video"
                : "page-content"
          }
        >
          <div className={this.state.scoreSaved === true ?
            "loading-container-add-score padding-top-160" : "hidden "}>
            <div className={this.state.scoreSaved === true ?
              "loader" : "hidden"} />
            <div className={this.state.scoreSaved === true ?
              "target-loader-image" : "hidden"} />
            <div className={this.state.scoreSaved === true ?
              "loading-message" : "hidden "}>Loading...</div>
          </div>
          <div
            className={stateOne || this.state.scoreSaved ? "hidden" : ""}
          >
            <div className="centre-labels">
              <label className="label-competition">
                Select Competition
                  </label>
            </div>
            <div className={this.state.getData === false && this.state.exceptionCaught === false ?
              "loading-container-add-score" : "hidden "}>
              <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                "loader" : "hidden"} />
              <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                "target-loader-image" : "hidden"} />
              <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                "loading-message" : "hidden "}>Loading...</div>
            </div>
            <div className="scrollbar">
              <div className="add-score-competition-container">
                {competitionItem}

                <div

                  className={
                    this.state.somethingClicked === false
                      ? "hidden"
                      : "label-score"
                  }
                >
                  <input
                    type="number"
                    id="scoreInput"
                    min="0"
                    step="1"
                    autoComplete="off"
                    name="score"
                    pattern="\d*"
                    onClick={() => this.toggleNavbar}
                    className="score"
                    onChange={this.handleScore}
                    placeholder="Enter Score"
                  />
                  <div className="error-message-container">
                    <div
                      className={
                        this.state.validScore ? "hidden" : "invalid-score"
                      }
                    >
                      Enter Valid Score. Max: {this.state.maximumScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stretched inline-block">
              <div
                className={
                  this.state.somethingClicked === true
                    ? "submit-container"
                    : "hidden"
                }
              >
                <div
                  className={
                    this.state.imageTaken || this.state.showCamera
                      ? "hidden"
                      : "submit-button-elements2"
                  }
                >
                  <div className="button-hover">
                    <img
                      src={camera}
                      id="btnScoreCapture"
                      className="btn-score-capture2"
                      onClick={() => this.CameraClicked()}
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className={
                    (this.state.showCamera && !this.state.imageTaken) ||
                      this.state.imageTaken
                      ? "hidden"
                      : "submit-button-elements2"
                  }
                >
                  <div className="button-hover ">
                    <img
                      src={submit}
                      onClick={() => this.getLocation()}
                      className="button-that-submits"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.showCamera ? "" : "hidden"}>
            <div
              className={
                this.state.imageTaken ? "hidden" : "photo-top-label"
              }
            >
              <div
                className={
                  this.state.imageTaken || this.state.scoreSaved
                    ? "hidden"
                    : "score-capture-header2"
                }
              >
                <div className="gun-overlay-image">
                  <label className="label-for-capture-score">
                    CAPTURE SCORE
                      </label>
                  <img
                    src={lightgrayback}
                    onClick={() => this.goBack()}
                    id="back"
                    className="btn-back"
                    alt="backBtn"
                  />
                </div>
              </div>
            </div>
            <div
              className={
                this.state.imageTaken ? "hidden" : "video-container"
              }
            >
              <video
                id="video"
                width="310"
                height="310"
                className="video"
                playsInline={true}
                autoPlay
              />
            </div>
            <div
              className={
                this.state.currState !== 3
                  ? "hidden"
                  : "submit-container-comp icon-push-down no-margin"
              }
            >
              <div
                className={
                  this.state.currState !== 3
                    ? "hidden"
                    : "submit-button-elements second float-left"
                }
              >
                <div className={this.state.currState !== 3 || this.state.iOS === true ? "hidden" : ""}>
                  <div className="button-hover">
                    <div
                      id="FlashImage"
                      alt=""
                      className="flash"
                      onClick={() => this.flash()}
                    />
                  </div>
                </div>
              </div>
              <div
                className={
                  this.state.currState !== 3 && this.state.scoreSaved
                    ? "hidden"
                    : "submit-button-elements second float-left"
                }
              >
                <div className="button-hover">
                  <div
                    className={this.state.currState !== 3 ? "hidden" : ""}
                  >
                    <img
                      src={cameraGray}
                      onClick={() => this.takePhoto()}
                      id="snap"
                      className="btn-score-capture"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              this.state.imageTaken && !this.state.scoreSaved
                ? "image-container"
                : "hidden"
            }
          >
            <div
              className={
                !this.state.imageTaken ? "hidden" : "photo-top-label"
              }
            >
              <div
                className={
                  !this.state.imageTaken
                    ? "hidden"
                    : "score-capture-header2"
                }
              >
                <div className="gun-overlay-image">
                  <label className="label-for-capture-score">
                    Score Captured
                      </label>
                </div>
              </div>
            </div>
            <div
              className={
                this.state.imageTaken ? "video-container" : "hidden"
              }
            >
              <canvas
                id="canvas"
                width="310"
                height="310"
                className="image-view background"
              />
            </div>
            <div className="icon-push-down">
              <div
                className={
                  !this.state.imageTaken || this.state.scoreSaved
                    ? "hidden"
                    : "submit-button-elements third float-right"
                }
              >
                <div className="button-hover ">
                  <img
                    src={graySubmit}
                    onClick={() => this.getLocation()}
                    className="button-that-submits2"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={
                  this.state.imageTaken && !this.state.scoreSaved
                    ? "submit-button-elements third float-right"
                    : "hidden"
                }
              >
                <div className="button-hover">
                  <img
                    src={grayRetry}
                    id="btnScoreCapture"
                    className="retake"
                    onClick={() => this.retakePhoto()}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedButton: state.landingReducer.selectedLandingPage
});

export default connect(
  mapStateToProps,
  { selectedPage, updateSelectedCompetition }
)(ScoreCapture);
