import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../bootstrap/ProfileLanding.css";
import UserProfile from "./UserProfile";
import Documents from "./Documents";
import UserDetails from "./userDetails";
import { getCookie } from "./cookie.js";
import history from "./history";
import { connect } from "react-redux";
import {setSelectedLandingPage} from "../actions/profileLandingAction"

class ProfileLanding extends Component {
  constructor(props) {
    super(props);

    this.awardPage = this.awardPage.bind(this);
    this.documentsPage = this.documentsPage.bind(this);
    this.details = this.details.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
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

  details() {
    if (this.props.selectedButton != 3) this.props.setSelectedLandingPage(3);
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
      <div>
        <div
          className={
            this.props.selectedButton == 1
              ? "fix-top pad-bottom-13px"
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
          <div className="buttons-container">
            <Row className="buttons-row">
              <div className="buttons-rectangle lay-horizontal">
                <Col
                  id="remove-left-button-padding"
                  className="pad-button-text-top"
                >
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 1
                          ? "unstyle-button-active btn-block button-fill"
                          : "unstyle-button btn-block button-fill"
                      }
                      onClick={this.awardPage}
                    >
                      <label className="button-text">AWARDS</label>
                    </button>
                  </div>
                </Col>
                <Col id="pad-middle-button" className="pad-button-text-top">
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 2
                          ? "unstyle-button-active btn-block button-fill"
                          : "unstyle-button btn-block button-fill"
                      }
                      onClick={this.documentsPage}
                    >
                      <label className="button-text">DOCUMENTS</label>
                    </button>
                  </div>
                </Col>
                <Col
                  id="remove-right-button-padding"
                  className="pad-button-text-top"
                >
                  <div>
                    <button
                      className={
                        this.props.selectedButton == 3
                          ? "unstyle-button-active btn-block button-fill"
                          : "unstyle-button btn-block button-fill"
                      }
                      onClick={this.details}
                    >
                      <label className="button-text">DETAILS</label>
                    </button>
                  </div>
                </Col>
              </div>
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
          ) : this.props.selectedButton == 3 ? (
            <UserDetails />
          ) : this.props.selectedButton == 2 ? (
            <Documents />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  selectedButton : state.landingReducer.selectedLandingPage
});

export default connect(mapStateToProps, {setSelectedLandingPage})(ProfileLanding);
