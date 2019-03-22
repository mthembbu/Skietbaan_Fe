<<<<<<< HEAD
import React, { Component } from "react";
import { Container, Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import "../bootstrap/UserProfile.css";
import $ from "jquery";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types.js";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardCompetitions: [],
      hoursAward: {
        hours: -1
      }
    };
  }

  UNSAFE_componentWillMount() {
    var token = getCookie("token");
    if (token === undefined) {
      this.props.history.push("/register-page");
      return;
    }

    /*use the remote URL*/
    fetch(BASE_URL + "/api/awards/" + token, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ awardCompetitions: data });
        if (this.state.awardCompetitions.length == 0) {
          this.props.history.push("/register-page");
        }
      });
=======
import React, { Component } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import '../bootstrap/UserProfile.css';
import $ from "jquery";
import { getCookie } from './cookie.js';
import {BASE_URL} from '../actions/types.js'
import {Collapse} from 'react-collapse'
import history from "./history";

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            awardCompetitions : [],
            hoursAward : {
                hours: -1,
                collapse: false
            }
        }

        this.toggle = this.toggle.bind(this);
    }

    UNSAFE_componentWillMount(){
        var token = getCookie("token");
        if(token === undefined){
            history.push('/registerPage');
            return;
        }
        
        /*use the remote URL*/
        fetch(BASE_URL + "/api/awards/" + token,{
            method : 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({awardCompetitions : data})
            if(this.state.awardCompetitions.length == 0){
                this.Logout();
                history.push('/registerPage');
            }
        });
>>>>>>> a60fa2218ed0f1a3e6c958fa604ecea5af8e8321

    fetch(BASE_URL + "/api/awards/hours/" + token, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ hoursAward: data });
      });
  }

<<<<<<< HEAD
  AnimateAccuracyCircle(counter, element, index) {
    if (counter > element.accuracy) return;
    if (counter <= element.accuracy) {
      var degreees = (360 * counter) / 100;
      var activeBorder = $(`#${index}`);
      $(`#circle${index}`).html(Math.round(counter) + "%");

      if (degreees <= 180) {
        activeBorder.css(
          "background-image",
          "linear-gradient(" +
            (90 + degreees) +
            "deg, transparent 50%, #F3F4F9 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)"
        );
      } else {
        activeBorder.css(
          "background-image",
          "linear-gradient(" +
            (degreees - 90) +
            "deg, transparent 50%, #EA241A 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)"
        );
      }
      counter++;
      setTimeout(() => {
        this.AnimateAccuracyCircle(counter, element, index);
      }, 80);
=======
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    animateAccuracyCircle(counter, element, index){
        if(counter > element.accuracy) return;
        if(counter <= element.accuracy){
            var degreees = (360 * counter) / 100;
            var activeBorder = $(`#${index}`);
            $(`#circle${index}`).html(Math.round(counter)+"%");
            
            if (degreees<=180){
                activeBorder.css('background-image','linear-gradient(' + (90 + degreees) + 
                                    'deg, transparent 50%, #F3F4F9 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)');
            }
            else{
                activeBorder.css('background-image','linear-gradient(' + (degreees - 90) + 
                                'deg, transparent 50%, #EA241A 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)');
            }
            counter++;
            setTimeout(() => {
                this.animateAccuracyCircle(counter, element, index)
            }, 80)
        }
>>>>>>> a60fa2218ed0f1a3e6c958fa604ecea5af8e8321
    }
  }

  /*
        This function takes the total score as string and append zeros
        at the front if the total score has less than four digits
    */
<<<<<<< HEAD
  Tokenize(str) {
    var _array = [];
    if (str == null) {
      _array = ["0", "0", "0", "0"];
      return _array;
    } else {
      var loopCount = 4 - str.length;
      _array = str.split("");
=======
    tokenize(str){
        var _array = []
        if(str == null){
            _array = ["0", "0", "0", "0"]
            return _array
        }else{
            var loopCount = 4 - str.length
            _array = str.split("")
            
            if(loopCount > 0){
                for(var i = 0; i < loopCount; i++){
                    _array.unshift("0") //append zeros at start of array
                }
            }
        }
>>>>>>> a60fa2218ed0f1a3e6c958fa604ecea5af8e8321

      if (loopCount > 0) {
        for (var i = 0; i < loopCount; i++) {
          _array.unshift("0"); //append zeros at start of array
        }
      }
    }

<<<<<<< HEAD
    return _array;
  }

  SetDigits(str, isCompetitionLocked) {
    var _array = this.Tokenize(str);
    return (
      <div className="lay-horizontal">
        <div
          className={
            isCompetitionLocked
              ? "box box-grey-background"
              : "box box-white-background"
          }
        >
          <div className={isCompetitionLocked ? "grey-text" : "black-text"}>
            <label className="box-label-text">{_array[0]}</label>
          </div>
        </div>
        <div
          className={
            isCompetitionLocked
              ? "box box-grey-background"
              : "box box-white-background"
          }
        >
          <div className={isCompetitionLocked ? "grey-text" : "black-text"}>
            <label className="box-label-text">{_array[1]}</label>
          </div>
        </div>
        <div
          className={
            isCompetitionLocked
              ? "box box-grey-background"
              : "box box-white-background"
          }
        >
          <div className={isCompetitionLocked ? "grey-text" : "black-text"}>
            <label className="box-label-text">{_array[2]}</label>
          </div>
        </div>
        <div
          className={
            isCompetitionLocked
              ? "box box-grey-background"
              : "box box-white-background"
          }
        >
          <div className={isCompetitionLocked ? "grey-text" : "black-text"}>
            <label className="box-label-text">{_array[3]}</label>
          </div>
        </div>
      </div>
    );
  }

  RenderLockedIcon() {
    return (
      <div className="locked-icon" style={{ display: "inline" }}>
        <img
          src={require("../resources/awardIcons/locked-icon.png")}
          alt="lock-icon"
        />
      </div>
    );
  }

  RenderActiveCircle(index) {
    return (
      <div id={index} className="active-border">
        <div id={`circle${index}`} className="circle">
          <label className="accuracy-text">0%</label>
        </div>
      </div>
    );
  }

  RenderBulletIcons() {
    return (
      <div className="bullet-img-scale bullet-padding-right">
        <img
          src={require("../resources/awardIcons/bullet.png")}
          alt="bullet image"
        />
      </div>
    );
  }

  RenderRedLockIcon() {
    return (
      <div className="lock-img-scale">
        <img
          src={require("../resources/awardIcons/red-locked-icon.png")}
          alt="lock image"
        />
      </div>
    );
  }

  CompetitionsStat(element, index) {
    return (
      <div
        className="shooting-award push-shooting-award-bottom text-color"
        key={index}
      >
        <Row>
          <Col>
            <Row className="center-block-content">
              <Col>
                <div>
                  <label className="competition-name-size">
                    {element.competitionName}
                  </label>
                </div>
              </Col>
            </Row>
            <Row className="push-bottom-67px">
              <Col>
                <div className="rectangle lay-horizontal">
                  <Row className="inherit-width">
=======
    setDigits(str, isCompetitionLocked){
        var _array = this.tokenize(str)
        return(
            <div className="lay-horizontal">
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[0]}</label></div>
                </div>
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[1]}</label></div>
                </div>
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[2]}</label></div>
                </div>
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[3]}</label></div>
                </div>
            </div>
        )
    }    
    
    renderLockedIcon(){
        return(
            <div className="locked-icon" style={{display: "inline"}}>
                <img src={require("../resources/awardIcons/locked-icon.png")} alt="lock-icon" />
            </div>
        )
    }

    renderActiveCircle(index){
        return(
            <div id={index} className="active-border">
                <div id={`circle${index}`} className="circle">
                    <label className="accuracy-text">0%</label>
                </div>
            </div>
        )
    }

    renderBulletIcons(){
        return(
            <div className="bullet-img-scale bullet-padding-right">
                <img src={require("../resources/awardIcons/bullet.png")} alt="bullet image"></img>
            </div>
        )
    }

    renderRedLockIcon(){
        return(
            <div className="lock-img-scale">
                <img src={require("../resources/awardIcons/red-locked-icon.png")} alt="lock image"></img>
            </div>
        )
    }

    competitionsStat(element, index){
        return(
            <div className="shooting-award push-shooting-award-bottom text-color" key={index}>
                <Row>
>>>>>>> a60fa2218ed0f1a3e6c958fa604ecea5af8e8321
                    <Col>
                      <div className="accuracy-text-align">
                        <label className="accuracy-label">Accuracy</label>
                      </div>
                      <div className="circle-bigger">
                        {!element.isCompetitionLocked
                          ? this.RenderActiveCircle(index)
                          : this.RenderRedLockIcon()}
                      </div>
                      <Row className="center-block-content">
                        <Col className="center-icons-col">
                          <div className="lay-horizontal scale-img">
                            <img
                              src={
                                !element.isCompetitionLocked &&
                                element.accuracyAward.gold
                                  ? require("../resources/awardIcons/gold-icon.png")
                                  : require("../resources/awardIcons/locked-icon.png")
                              }
                              alt="gold award"
                            />
                            <img
                              src={
                                !element.isCompetitionLocked &&
                                element.accuracyAward.silver
                                  ? require("../resources/awardIcons/silver-icon.png")
                                  : require("../resources/awardIcons/locked-icon.png")
                              }
                              alt="silver award"
                            />
                            <img
                              src={
                                !element.isCompetitionLocked &&
                                element.accuracyAward.bronze
                                  ? require("../resources/awardIcons/bronze-icon.png")
                                  : require("../resources/awardIcons/locked-icon.png")
                              }
                              alt="bronze award"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <div className="float-right">
                        <div>
                          <label className="total-label">Total</label>
                        </div>
                        <div className="circle-bigger">
                          {!element.isCompetitionLocked
                            ? this.RenderBulletIcons()
                            : null}
                          <div>
                            {!element.isCompetitionLocked ? (
                              <label className="total-text">
                                {element.total}
                              </label>
                            ) : (
                              this.RenderRedLockIcon()
                            )}
                          </div>
                          {!element.isCompetitionLocked
                            ? this.RenderBulletIcons()
                            : null}
                        </div>
                        <Row className="center-block-content">
                            <Col>
                                <div>
                                    <label className="competition-name-size">{element.competitionName}</label>
                                </div>
                            </Col>
                        </Row>
                        <Row className="push-bottom-67px">
                            <Col>
                                <div className="rectangle lay-horizontal">
                                    <Row className="inherit-width">
                                        <Col>
                                            <div className="accuracy-text-align"><label className="accuracy-label">Accuracy</label></div>
                                            <div className="circle-bigger">
                                               {!element.isCompetitionLocked ? this.renderActiveCircle(index) : this.renderRedLockIcon()}
                                            </div>
                                            <Row className="center-block-content">
                                                <Col className="center-icons-col">
                                                    <div className="lay-horizontal scale-img">
                                                        <img src={!element.isCompetitionLocked && element.accuracyAward.gold ? 
                                                            require('../resources/awardIcons/gold-icon.png') :
                                                            require('../resources/awardIcons/locked-icon.png')} alt="gold award" />
                                                        <img src={!element.isCompetitionLocked && element.accuracyAward.silver ? 
                                                            require('../resources/awardIcons/silver-icon.png') :
                                                            require('../resources/awardIcons/locked-icon.png')} alt="silver award" />
                                                        <img src={!element.isCompetitionLocked && element.accuracyAward.bronze?
                                                            require('../resources/awardIcons/bronze-icon.png') :
                                                            require('../resources/awardIcons/locked-icon.png')} alt="bronze award" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <div className="float-right">
                                                <div><label className="total-label">Total</label></div>
                                                <div className="circle-bigger">
                                                    {!element.isCompetitionLocked ? this.renderBulletIcons() : null}
                                                    <div>
                                                        {!element.isCompetitionLocked ? 
                                                            <label className="total-text">{element.total}</label> : this.renderRedLockIcon()}
                                                    </div>
                                                    {!element.isCompetitionLocked ? this.renderBulletIcons() : null}
                                                </div>
                                                <Row className="center-block-content">
                                                <Col className="center-icons-col">
                                                    <div className="lay-horizontal scale-img">
                                                        <img src={!element.isCompetitionLocked && element.totalAward.gold ?
                                                            require('../resources/awardIcons/gold-icon.png') :
                                                            require('../resources/awardIcons/locked-icon.png')} alt="locked award" />
                                                        <img src={!element.isCompetitionLocked && element.totalAward.silver ?
                                                            require('../resources/awardIcons/silver-icon.png') :
                                                            require('../resources/awardIcons/locked-icon.png')} alt="silver award" />
                                                        <img src={!element.isCompetitionLocked && element.totalAward.bronze ?
                                                            require('../resources/awardIcons/bronze-icon.png') :
                                                            require('../resources/awardIcons/locked-icon.png')} alt="bronze award" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                      </div>
                    </Col>
<<<<<<< HEAD
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
          <div>{this.AnimateAccuracyCircle(1, element, index)}</div>
        </Row>
      </div>
    );
  }

  RenderHoursIcons() {
    return (
      <div className="lay-horizontal scale-img center-block-content">
        <img
          src={
            this.state.hoursAward.gold
              ? require("../resources/awardIcons/gold-icon.png")
              : require("../resources/awardIcons/locked-icon.png")
          }
          alt="gold award"
        />
        <img
          src={
            this.state.hoursAward.silver
              ? require("../resources/awardIcons/silver-icon.png")
              : require("../resources/awardIcons/locked-icon.png")
          }
          alt="silver award"
        />
        <img
          src={
            this.state.hoursAward.bronze
              ? require("../resources/awardIcons/bronze-icon.png")
              : require("../resources/awardIcons/locked-icon.png")
          }
          alt="bronze award"
        />
      </div>
    );
  }

  RenderAllCompetitionsStats() {
    let renderArray = [];
    this.state.awardCompetitions.forEach((element, index) => {
      renderArray.push(this.CompetitionsStat(element, index));
    });
=======
                    <div>{this.animateAccuracyCircle(1, element, index)}</div>
                </Row>
            </div>
        )
    }

    renderHoursIcons(){
        return(
            <div className="lay-horizontal scale-img center-block-content">
                <img src={this.state.hoursAward.gold ?
                    require('../resources/awardIcons/gold-icon.png') : require('../resources/awardIcons/locked-icon.png')} alt="gold award" />
                <img src={this.state.hoursAward.silver ?
                    require('../resources/awardIcons/silver-icon.png') : require('../resources/awardIcons/locked-icon.png')} alt="silver award" />
                <img src={this.state.hoursAward.bronze ?
                    require('../resources/awardIcons/bronze-icon.png') : require('../resources/awardIcons/locked-icon.png')} alt="bronze award" />
            </div>
        )
    }

    renderAllCompetitionsStats(){
        let renderArray = []
        this.state.awardCompetitions.forEach((element, index) => {
            renderArray.push(this.competitionsStat(element, index))
        })
>>>>>>> a60fa2218ed0f1a3e6c958fa604ecea5af8e8321

    return renderArray;
  }

<<<<<<< HEAD
  render() {
    return (
      <div className="my-container">
        <Container>
          <div>
            <div className="member-number text-color">
              <label className="light-weight">
                Membership No:
                <span id="member-number-span">
                  {this.state.hoursAward.membershipNumber !== undefined
                    ? this.state.hoursAward.membershipNumber
                    : null}
                </span>
              </label>
=======
    render() {
        return (
            <div className="my-container">
                <Container>
                    <Row>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="compName-text">
                            <a onClick={this.toggle}>
                                {this.state.awardCompetitions.length > 0 ? 
                                    this.state.awardCompetitions[0].competitionName.toUpperCase() : null}
                            </a>
                            {this.state.awardCompetitions.length > 0 ?
                                <Collapse isOpened={true}>
                                    <p className="competition-name-text">asfpwawfpasfqpf</p>
                                </Collapse> : null
                            }
                            </div>
                        </Col>
                    </Row>
                </Container>
>>>>>>> a60fa2218ed0f1a3e6c958fa604ecea5af8e8321
            </div>
            <div className="page-title text-color">
              <label>Awards & Statistics</label>
            </div>
            <Row className="push-shooting-award-bottom">
              <Col>
                <Row>
                  <Col>
                    <div className="hours-heading text-color">
                      <label>Hours Shooting</label>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col className="push-bottom-12px">
                    <div className="lay-horizontal justify-center">
                      {/*make hours dynamic*/}
                      {this.state.hoursAward.hours !== -1
                        ? this.SetDigits(this.state.hoursAward.hours.toString())
                        : this.SetDigits(null)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {this.state.hoursAward != null
                      ? this.RenderHoursIcons()
                      : null}
                  </Col>
                </Row>
              </Col>
            </Row>
            {this.state.awardCompetitions.length > 0
              ? this.RenderAllCompetitionsStats()
              : null}
          </div>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
