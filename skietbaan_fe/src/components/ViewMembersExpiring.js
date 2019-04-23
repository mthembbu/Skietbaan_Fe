import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import memberIcon from "../components/assets/greyMembershipIcon.png";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import Export from "../components/assets/Export.png";
import exportClick from "../components/assets/exportPress.png";
import RedBullet from "../components/assets/RedBullet.png";
import { fetchNumberOfNotification } from "../actions/notificationAction";
import { connect } from "react-redux";

class ViewMembersExpiring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isOpened: false,
      height: 100,
      timeLeftOnMembership: [],
      filterText: "",
      selectedValue: false,
      dateValue: "",
      lastSize: 0,
      navbarState: false,
      height: window.innerHeight,
      width: window.innerWidth,
      getData: false,
      exportMsg: false,
      exceptionCaught: false,
      exportResponse: ""
    };
    this.getExpiringMembers = this.getExpiringMembers.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.status = this.status.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleNavbar2 = this.toggleNavbar2.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
  }

  toggleNavbar() {
    this.setState({
      navbarState: !this.state.navbarState
    });
    var navbar = document.querySelector(".navbar-admin");
    if (navbar.classList.contains("hidden")) {
      navbar.classList.remove("hidden");
    } else {
      navbar.classList.add("hidden");
    }
  }

  toggleNavbar2() {
    var navbar = document.querySelector(".navbar-admin");
    if (this.state.lastSize > document.body.clientHeight) {
      navbar.setAttribute("hidden", "true");
      this.toggleNavbar();
    } else {
      navbar.removeAttribute("hidden");
      this.toggleNavbar();
    }
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentDidMount() {
    this.updateDimensions();
    this.getExpiringMembers();
    this.getTimeLeft();
  }
  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - 240 + "px";
    } else {
      return "66vh";
    }
  }
  getExpiringMembers() {
    fetch(BASE_URL + "/api/Features/SearchExpiringMember", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      })
      .then(data =>
        this.setState({
          array: data,
          getData: true
        })
      )
      .catch(err => {
        this.setState({ exceptionCaught: true });
      });
  }

  getTimeLeft() {
    fetch(BASE_URL + "/api/Features/SearchExpiringMemberTimeLeft", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      })
      .then(data =>
        this.setState({
          timeLeftOnMembership: data
        })
      )
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  updateMember(index) {
    let RequestObject = {
      username: this.state.array[index].username,
      memberExpiryDate: this.getCurrentDate() + "T00:00:00"
    };
    fetch(BASE_URL + "/api/Features/RenewMembership", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(RequestObject)
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.getExpiringMembers();
        this.setState({ filterText: "" });
      })
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  onChangeText(event) {
    this.setState({ filterText: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ dateValue: event.target.value });
  }

  status(timeLeft) {
    if (timeLeft < 2 || timeLeft === 2) {
      return true;
    } else {
      return false;
    }
  }

  handleRadioChange(event) {
    this.setState({ selectedValue: event });
  }

  getCurrentDate() {
    let curr = new Date();
    curr.setDate(curr.getDate() + 365);
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  ExportData = () => {
    let token = getCookie("token");
    let filter = "expiring";
    fetch(
      BASE_URL +
        `/api/Features/generateCSV?filter=${filter}&adminToken=${token}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(data => this.setState({ exportResponse: data, exportMsg: true }))
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  };

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    if (this.state.lastSize === 0) {
      this.state.lastSize = document.body.clientHeight;
      document.addEventListener("DOMContentLoaded", () => {
        window.addEventListener("resize", () => {
          this.toggleNavbar2();
        });
      });
    }
    const postItems = (
      <div>
        {this.state.array.length === 0 && this.state.getData === true ? (
          <div className="view-non-error-container">
            <label className="view-non-error-msg">No users expiring yet.</label>
          </div>
        ) : (
          <table striped hover condensed className="table-member">
            <tbody>
              {this.state.array
                .filter(post => {
                  return (
                    !this.state.filterText ||
                    post.username
                      .toLowerCase()
                      .startsWith(this.state.filterText.toLowerCase()) ||
                    post.email
                      .toLowerCase()
                      .startsWith(this.state.filterText.toLowerCase()) ||
                    post.memberID.startsWith(this.state.filterText)
                  );
                })
                .map((post, index) => (
                  <tr className="view-members-user" key={post.id}>
                    <td className="first-column">
                      <Collapsible
                        trigger={
                          <div className="username-and-email">
                            <div className="view-members-username-email">
                              <b>{post.username}</b>
                              <div className="view-non-members-email">
                                {post.email}
                              </div>
                            </div>
                            <div className="view-exp-members-icon">
                              <img
                                src={memberIcon}
                                className="membership-icon"
                                alt="Is a Member"
                              />
                            </div>
                            <div className="expiry-time-column">
                              <div
                                className={
                                  this.status(
                                    this.state.timeLeftOnMembership[index]
                                  )
                                    ? "bad"
                                    : "okay"
                                }
                              >
                                <div>
                                  <b>
                                    {post.memberExpiryDate
                                      .substring(0, 10)
                                      .split("-")
                                      .join("/")}
                                  </b>
                                  <div>
                                    {this.state.timeLeftOnMembership[index]}{" "}
                                    Months
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div>
                          <input
                            type="date"
                            className="view-non-members-text-boxes"
                            id="expdate"
                            value={this.state.datevalue}
                            onChange={this.handleDateChange}
                          />
                        </div>
                        <div className="renew-container">
                          <button
                            className="view-exp-members"
                            onClick={() => this.updateMember(index)}
                          >
                            RENEW
                          </button>
                        </div>
                      </Collapsible>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );
    return (
      <div className="centre-view-member">
        <div className="username-search">
          <Row>
            <Col>
              <div className="search">
                <input
                  autoComplete="off"
                  type="text"
                  className="user-value"
                  id="usernameValue"
                  placeholder="Enter Username"
                  value={this.state.filterText}
                  onChange={this.onChangeText}
                />
              </div>
            </Col>
            <Col className="export-col-container">
              {" "}
              <div className="export-container">
                <img
                  src={Export}
                  onClick={e =>
                    (e.currentTarget.src = exportClick) && this.ExportData()
                  }
                  className="export-icon"
                  alt="Is a Member"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div
          className={
            this.state.getData === false && this.state.exceptionCaught === false
              ? "loader-container-members"
              : "hidden"
          }
        >
          <div
            className={
              this.state.getData === false &&
              this.state.exceptionCaught === false
                ? "loader"
                : "hidden"
            }
          />
          <div
            className={
              this.state.getData === false &&
              this.state.exceptionCaught === false
                ? "target-loader-image"
                : "hidden"
            }
          />
          <div
            className={
              this.state.getData === false &&
              this.state.exceptionCaught === false
                ? "loading-message-members"
                : "hidden"
            }
          >
            Loading...
          </div>
        </div>
        {this.state.exportMsg === false ? (
          <div
            className="table-search-members"
            style={{ height: this.getBodyHeight() }}
          >
            {postItems}
          </div>
        ) : (
          <div>
            {this.state.exportResponse !== ""
              ? setTimeout(() => {
                  this.setState({ exportMsg: false });
                }, 2000)
              : null}
            <div className="exportMsg-container">
              <label className="exportMsg-responce">
                {this.state.exportResponse}
              </label>
              <img
                src={RedBullet}
                className="export-success"
                alt="Is a Member"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { fetchNumberOfNotification }
)(ViewMembersExpiring);
