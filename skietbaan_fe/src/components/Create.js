import React, { Component } from "react";
import "./Create.css";
import { getCookie } from "../components/cookie.js";
import { URL } from "../actions/types.js";
import { Row, Col } from "react-bootstrap";
import RegisterMember from "../components/RegisterMember";
import ViewMembers from "../components/ViewMembers";
import { timingSafeEqual } from "crypto";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToken: true,
      selectedButton: 1,
      selectedButtonCreateViewGroups: 1,
      selectedButtonCreateViewCompetitions: 1
    };

    this.groupsPage = this.groupsPage.bind(this);
    this.comptetitionsPage = this.comptetitionsPage.bind(this);
    this.membersPage = this.membersPage.bind(this);
    this.createGroups = this.createGroups.bind(this);
    this.viewGroups = this.viewGroups.bind(this);
    this.createCompetitions = this.createCompetitions.bind(this);
    this.viewCompetitions = this.viewCompetitions.bind(this);
  }

  groupsPage() {
    this.setState({ selectedButton: 1 });
  }

  comptetitionsPage() {
    this.setState({ selectedButton: 2 });
  }

  membersPage() {
    this.setState({ selectedButton: 3 });
  }

  createGroups() {
    this.setState({ selectedButtonCreateViewGroups: 1 });
  }

  viewGroups() {
    this.setState({ selectedButtonCreateViewGroups: 2 });
  }

  createCompetitions() {
    this.setState({ selectedButtonCreateViewCompetitions: 1 });
  }

  viewCompetitions() {
    this.setState({ selectedButtonCreateViewCompetitions: 2 });
  }

  componentDidMount() {
    let found = false;
    if (getCookie("token")) {
      let token = getCookie("token");
      fetch(URL + "/api/features/getuserbytoken/" + token, {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(function(data) {
          if (data === undefined || data === null) {
            this.setState({
              isToken: true
            });
            found = true;
          }
        })
        .then(data => {
          if (data === undefined || data === null) {
            this.setState({
              isToken: true
            });
            found = true;
          }
        })
        .catch(function(data) {
          if (!getCookie("token") || found === false) {
            var res = document.cookie;
            var multiple = res.split(";");
            for (var i = 0; i < multiple.length; i++) {
              var key = multiple[i].split("=");
              document.cookie =
                key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
            window.location = "/registerPage";
          }
        });
    } else {
      window.location = "/registerPage";
    }
  }

  render() {
    return (
      <div className="create-container">
        <div class="page-name-create-all">
          <label className="create-all-menu-header">Create</label>
        </div>
        <div className="create-all-page-content">
          <div className="buttons-container">
            <Row className="buttons-row">
              <div className="buttons-rectangle lay-horizontal">
                <Col
                  id="removeLeftButtonPadding"
                  className="pad-button-text-top"
                >
                  <div>
                    <button
                      className={
                        this.state.selectedButton === 1
                          ? "unstyle-button-active btn-block button-fill"
                          : "unstyle-button btn-block button-fill"
                      }
                      onClick={this.groupsPage}
                    >
                      <label className="button-text">GROUPS</label>
                    </button>
                  </div>
                </Col>
                <Col id="padMiddleButton" className="pad-button-text-top">
                  <div>
                    <button
                      className={
                        this.state.selectedButton === 2
                          ? "unstyle-button-active btn-block button-fill"
                          : "unstyle-button btn-block button-fill"
                      }
                      onClick={this.comptetitionsPage}
                    >
                      <label className="button-text">COMPETITIONS</label>
                    </button>
                  </div>
                </Col>
                <Col
                  id="removeRightButtonPadding"
                  className="pad-button-text-top"
                >
                  <div>
                    <button
                      className={
                        this.state.selectedButton === 3
                          ? "unstyle-button-active btn-block button-fill"
                          : "unstyle-button btn-block button-fill"
                      }
                      onClick={this.membersPage}
                    >
                      <label className="button-text">MEMBERS</label>
                    </button>
                  </div>
                </Col>
              </div>
            </Row>
          </div>

          <div
            className={
              this.state.selectedButton === 1
                ? "content-container pad-top-13px"
                : this.state.selectedButton === 2
                ? "content-container pad-top-13px"
                : "content-container"
            }
          >
            {this.state.selectedButton === 1 ? (
              <div className="buttons-container">
                <Row className="buttons-row">
                  <div className="buttons-rectangle lay-horizontal">
                    <Col
                      id="removeLeftButtonPadding"
                      className="pad-button-text-top"
                    >
                      <div>
                        <button
                          className={
                            this.state.selectedButtonCreateViewGroups === 1
                              ? "unstyle-button-active btn-block button-fill"
                              : "unstyle-button btn-block button-fill"
                          }
                          onClick={this.createGroups}
                        >
                          <label className="button-text">CREATE</label>
                        </button>
                      </div>
                    </Col>
                    <Col id="padMiddleButton" className="pad-button-text-top">
                      <div>
                        <button
                          className={
                            this.state.selectedButtonCreateViewGroups === 2
                              ? "unstyle-button-active btn-block button-fill"
                              : "unstyle-button btn-block button-fill"
                          }
                          onClick={this.viewGroups}
                        >
                          <label className="button-text">VIEW</label>
                        </button>
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
            ) : this.state.selectedButton === 2 ? (
              <div className="buttons-container">
                <Row className="buttons-row">
                  <div className="buttons-rectangle lay-horizontal">
                    <Col
                      id="removeLeftButtonPadding"
                      className="pad-button-text-top"
                    >
                      <div>
                        <button
                          className={
                            this.state.selectedButtonCreateViewCompetitions === 1
                              ? "unstyle-button-active btn-block button-fill"
                              : "unstyle-button btn-block button-fill"
                          }
                          onClick={this.createCompetitions}
                        >
                          <label className="button-text">CREATE</label>
                        </button>
                      </div>
                    </Col>
                    <Col id="padMiddleButton" className="pad-button-text-top">
                      <div>
                        <button
                          className={
                            this.state.selectedButtonCreateViewCompetitions === 2
                              ? "unstyle-button-active btn-block button-fill"
                              : "unstyle-button btn-block button-fill"
                          }
                          onClick={this.viewCompetitions}
                        >
                          <label className="button-text">VIEW</label>
                        </button>
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
            ) : this.state.selectedButton === 3 ? (
              <ViewMembers />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Create;
