import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import "./Create.css";
import history from "./history";
import { getCookie } from "./cookie.js";
import { URL } from "../actions/types.js";
import ViewMembers from "../components/ViewMembers";
import Radio from "@material-ui/core/Radio";
import CreateComp from "../components/CreateComp";
import AddGroup from "../components/AddGroup";
import ViewNonMembers from "../components/ViewNonMembers";
import ViewMembersExpiring from "../components/ViewMembersExpiring";
import ViewComp from "../components/ViewComp";
import GroupComponent from "../components/GroupComponent";

export class createPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToken: true,
      selectedButton: 1,
      selectedButtonCreateViewGroups: 1,
      selectedButtonCreateViewCompetitions: 1,
      selectedValue: "A",
      user: [],
    };

    this.groupsPage = this.groupsPage.bind(this);
    this.comptetitionsPage = this.comptetitionsPage.bind(this);
    this.membersPage = this.membersPage.bind(this);
    this.createGroups = this.createGroups.bind(this);
    this.viewGroups = this.viewGroups.bind(this);
    this.createCompetitions = this.createCompetitions.bind(this);
    this.viewCompetitions = this.viewCompetitions.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange = event => {
    this.setState({ selectedValue: event });
  };

  componentDidMount(){
    if (getCookie("token") !== null) {
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
          if(data.admin === false){
            history.push("/home");
          }
        })
        .catch(function(data) {});
    } else {
      window.location = "/registerPage";
    }
  }

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="create-main-container">
        {this.props.page === 0 ? (
          <div className="create-nav-container">
            <div
              className={
                this.state.selectedButton === 3
                  ? "create-top-nav-members"
                  : "create-top-nav"
              }
            >
              <div class="page-name-bar">
                <div className="gun-overlay-image">
                  <label className="label-for-score">CREATE</label>
                </div>
              </div>
              <div className="first-buttons-container">
                <Row className="buttons-row">
                  <div className="buttons-squire-rectangle lay-horizontal">
                    <Col
                      id="removeLeftButtonPadding"
                      className="pad-button-text-top"
                    >
                      <div>
                        <button
                          className={
                            this.state.selectedButton === 1
                              ? "unstyle-create-active btn-block button-fill"
                              : "unstyle-create btn-block button-fill"
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
                              ? "unstyle-create-active btn-block button-fill"
                              : "unstyle-create btn-block button-fill"
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
                              ? "unstyle-create-active btn-block button-fill"
                              : "unstyle-create btn-block button-fill"
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
              {this.state.selectedButton === 3 ? (
                <div className="member-radio">
                  <div className="radio-A">
                    <Radio
                      className="a-radio"
                      aria-label="A"
                      checked={this.state.selectedValue === "A"}
                      onChange={() => this.handleChange("A")}
                      value="b"
                      color={"primary"}
                      name="radio-button-demo"
                      aria-label="B"
                    />

                    <label className="member-user-label">USERS</label>
                  </div>
                  <div className="radio-B">
                    <Radio
                      className="b-radio"
                      aria-label="A"
                      checked={this.state.selectedValue === "B"}
                      value="b"
                      aria-label="B"
                      color={"primary"}
                      onChange={() => this.handleChange("B")}
                    />
                    <label className="member-user-label">MEMBERS</label>
                  </div>
                  <div className="radio-C">
                    <Radio
                      className="c-radio"
                      aria-label="A"
                      checked={this.state.selectedValue === "C"}
                      value="b"
                      aria-label="B"
                      color={"primary"}
                      onChange={() => this.handleChange("C")}
                    />
                    <label className="member-user-label">EXPIRING</label>
                  </div>
                </div>
              ) : null}

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
                      <div className="buttons-squire-rectangle lay-horizontal">
                        <Col
                          id="removeLeftButtonPadding"
                          className="pad-button-text-top"
                        >
                          <div>
                            <button
                              className={
                                this.state.selectedButtonCreateViewGroups === 1
                                  ? "unstyle-create-active btn-block button-fill"
                                  : "unstyle-create btn-block button-fill"
                              }
                              onClick={this.createGroups}
                            >
                              <label className="button-text">CREATE</label>
                            </button>
                          </div>
                        </Col>
                        <Col
                          id="padMiddleButton"
                          className="pad-button-text-top"
                        >
                          <div>
                            <button
                              className={
                                this.state.selectedButtonCreateViewGroups === 2
                                  ? "unstyle-view-active btn-block button-fill"
                                  : "unstyle-view btn-block button-fill"
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
                      <div className="buttons-squire-rectangle lay-horizontal">
                        <Col
                          id="removeLeftButtonPadding"
                          className="pad-button-text-top"
                        >
                          <div>
                            <button
                              className={
                                this.state
                                  .selectedButtonCreateViewCompetitions === 1
                                  ? "unstyle-create-active btn-block button-fill"
                                  : "unstyle-create btn-block button-fill"
                              }
                              onClick={this.createCompetitions}
                            >
                              <label className="button-text">CREATE</label>
                            </button>
                          </div>
                        </Col>
                        <Col
                          id="padMiddleButton"
                          className="pad-button-text-top"
                        >
                          <div>
                            <button
                              className={
                                this.state
                                  .selectedButtonCreateViewCompetitions === 2
                                  ? "unstyle-view-active btn-block button-fill"
                                  : "unstyle-view btn-block button-fill"
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
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="components-create">
          {this.state.selectedButton === 1 &&
          this.state.selectedButtonCreateViewGroups === 1 ? (
            <AddGroup />
          ) : this.state.selectedButton === 1 &&
            this.state.selectedButtonCreateViewGroups === 2 ? (
            <GroupComponent />
          ) : null}
          {this.state.selectedButton === 2 &&
          this.state.selectedButtonCreateViewCompetitions === 1 ? (
            <CreateComp />
          ) : this.state.selectedButton === 2 &&
            this.state.selectedButtonCreateViewCompetitions === 2 ? (
            <ViewComp />
          ) : null}
          {this.state.selectedButton === 3 &&
          this.state.selectedValue === "A" ? (
            <ViewNonMembers />
          ) : this.state.selectedButton === 3 &&
            this.state.selectedValue === "B" ? (
            <ViewMembers />
          ) : this.state.selectedButton === 3 &&
            this.state.selectedValue === "C" ? (
            <ViewMembersExpiring />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  page: state.posts.page
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createPages);
