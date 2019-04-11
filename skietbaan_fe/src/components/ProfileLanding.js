import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../bootstrap/ProfileLanding.css";
import UserProfile from "./UserProfile";
import Documents from "./Documents";
import UserDetails from "./userDetails";
import StatisticsPage from "./StatisticsPage"
import { getCookie } from "./cookie.js";
import history from "./history";
import { connect } from "react-redux";
import {setSelectedLandingPage} from "../actions/profileLandingAction";
import { selectedPage } from '../actions/postActions';

class ProfileLanding extends Component {
  constructor(props) {
    super(props);

    this.awardPage = this.awardPage.bind(this);
    this.documentsPage = this.documentsPage.bind(this);
    this.details = this.details.bind(this);
    this.stats = this.stats.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.props.selectedPage(3);
    var token = getCookie("token");
    if (token == undefined) {
        history.push("/registerPage");
        return;
    }
  }

  awardPage() {
    if (this.props.selectedButton != 1) this.props.setSelectedLandingPage(1);
  }

  documentsPage() {
    if (this.props.selectedButton != 2) this.props.setSelectedLandingPage(2);
  }

  stats(){
    if (this.props.selectedButton != 3) this.props.setSelectedLandingPage(3);
  }

  details() {
    if (this.props.selectedButton != 4) this.props.setSelectedLandingPage(4);
  }

  logout() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
      var key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
    window.location = "/login";
    return false;
  }

  render() {
    return (
      <Row className="row justify-content-center">
				   <Col sm={8} className="profile-bootstrap-col-center-container">
           <div className="profile-landing-container">
        <div
          className={
            this.props.selectedButton == 1
              ? "fix-top"
              : this.props.selectedButton == 2
              ? "fix-top pad-bottom-0px"
              : "fix-top"
          }
        >
          <Row className="top-bar-rectangle">
            <Col className="lay-horizontal">
                <div className="gun-overlay-img-background">
                  <label className="profile-title">PROFILE</label>
                </div>
                <div className="logout-button-right">
                    <a onClick={this.logout}>
                        <div className="logout-button">
                        <label className="logout-text">Logout</label>
                        </div>
                    </a>
                </div>
            </Col>
          </Row>
          <div className="profile-buttons-container">
            <Row className="buttons-row lay-horizontal">
                <Col className="pad-button-text-top profile-center-top-buttons">
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 1
                          ? "unstyle-button-active btn-block "
                          : "unstyle-button btn-block "
                      }
                      onClick={this.awardPage}
                    >
                      <div className="medal-img">
                        {this.props.selectedButton == 1 ?
                          <img src={require("../resources/awardIcons/medal-icon.png")}></img> :
                          <img src={require("../resources/awardIcons/grey-medal-icon.png")}></img>
                        }
                      </div>
                    </button>
                    <div className="profile-navigation-text-align">
                      <label className="profile-navigation-text">AWARDS</label>
                    </div>
                  </div>
                </Col>
                <Col 
                className="pad-button-text-top profile-center-top-buttons">
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 2
                          ? "unstyle-button-active btn-block "
                          : "unstyle-button btn-block "
                      }
                      onClick={this.documentsPage}
                    >
                      <div className="docs-img-scale">
                        {this.props.selectedButton == 2 ?
                          <img src={require("../resources/awardIcons/docs-icon.png")}></img> :
                          <img src={require("../resources/awardIcons/grey-docs-icon.png")}></img>
                        }
                      </div>
                    </button>
                    <div className="profile-navigation-text-align">
                      <label className="profile-navigation-text">DOCS</label>
                    </div>
                  </div>
                </Col>
                <Col className="profile-center-top-buttons">
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 3
                          ? "unstyle-button-active btn-block "
                          : "unstyle-button btn-block "
                      }
                      onClick={this.stats}
                    >
                      <div className="stats-img-scale">
                        {this.props.selectedButton == 3 ?
                          <img src={require("../resources/awardIcons/stats-icon.png")}></img> :
                          <img src={require("../resources/awardIcons/grey-stats-icon.png")}></img>
                        }
                      </div>
                    </button>
                    <div className="profile-navigation-text-align">
                      <label className="profile-navigation-text">STATS</label>
                    </div>
                  </div>
                </Col>
                <Col className="pad-button-text-top profile-center-top-buttons"
                >
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 4
                          ? "unstyle-button-active btn-block "
                          : "unstyle-button btn-block "
                      }
                      onClick={this.details}
                    >
                      <div className="details-img-scale">
                        {this.props.selectedButton == 4 ? 
                          <img src={require("../resources/awardIcons/details-icon.png")}></img> : 
                          <img src={require("../resources/awardIcons/grey-details-icon.png")}></img>
                        }
                      </div>
                    </button>
                    <div className="profile-navigation-text-align">
                      <label className="profile-navigation-text">DETAILS</label>
                    </div>
                  </div>
                </Col>
            </Row>
          </div>
        </div>
        <div
          className={
            this.props.selectedButton == 1
              ? "award-content-container"
              : this.props.selectedButton == 2 || this.props.selectedButton == 3
              ? "award-content-container pad-top-50px"
              : "award-content-container"
          }
        >
          {this.props.selectedButton == 1 ? (
            <UserProfile />
          ) : this.props.selectedButton == 2 ? (
            <Documents />
          ) : this.props.selectedButton == 3 ? (
            <StatisticsPage />
          ) : this.props.selectedButton == 4 ? (
            <UserDetails />
          ) : null}
        </div>
      </div>
           </Col>
        </Row>
        
    );
  }
}

const mapStateToProps = (state) =>({
  selectedButton : state.landingReducer.selectedLandingPage
});

export default connect(mapStateToProps, {setSelectedLandingPage,selectedPage})(ProfileLanding);
