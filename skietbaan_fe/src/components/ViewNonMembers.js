import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import arrowUp from "../components/assets/upArrow.png";
import arrowDown from "../components/assets/downArrow.png";
import { getCookie } from "../components/cookie.js";
import Export from "../components/assets/Export.png";
import RedBullet from "../components/assets/RedBullet.png";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchNumberOfNotification } from "../actions/notificationAction";
import { pageState } from '../actions/postActions';
import exportClick from "../components/assets/exportPress.png";

class ViewNonMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isOpened: false,
      height: 100,
      timeLeftOnMembership: [],
      filterText: "",
      membershipsID: "",
      updateName: "",
      indexNumber: 0,
      dateValue: "",
      lastSize: 0,
      navbarState: false,
      arrowChange: false,
      height: window.innerHeight,
      width: window.innerWidth,
      getData: false,
      membershipIds: [],
      exportMsg: false,
      exceptionCaught: false,
      token: getCookie("token"),
      emptyMemberNumber: false,
      dateCheck: false,
      exportResponse: "",
      dateErrormsg: false,
      userIndex: 0,
      done: false
    };
    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.status = this.status.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleNavbar2 = this.toggleNavbar2.bind(this);
    this.onChangeArrow = this.onChangeArrow.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.extractEmails = this.extractEmails.bind(this);
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
    this.getNonMembers();
    this.getTimeLeft();
  }
  componentWillUnmount() {
    this.props.pageState(10);
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - (240 - 190) - 190 + "px";
    } else {
      return "50vh";
    }
  }
  getNonMembers() {
    fetch(BASE_URL + "/api/Features/SearchNonMember", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      })
      .then(data =>
        this.setState({
          array: data.map(user => {
            return {
              ...user,
              selected: false
            };
          }),
          getData: true
        })
      )
      .catch(err => {
        this.setState({ exceptionCaught: true });
      });

    fetch(BASE_URL + "/api/Features/SearchMember")
      .then(res => res.json())
      .then(data =>
        this.setState({
          membershipIds: data.map(memberIds => memberIds.memberID)
        })
      )
      .catch(err => {
        this.setState({ exceptionCaught: true });
      });
  }

  getTimeLeft() {
    fetch(BASE_URL + "/api/Features/TimeLeft", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
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
  extractEmails(text) {
    if (this.state.filterText[0] === "@") {
      let ser = text.search("@");
      let word = text.substring(ser, text.length);
      let ss = word.split(".");
      return ss[0];
    } else {
      return text;
    }
  }

  updateMember(index) {
    if (this.state.membershipIds.indexOf(this.state.membershipsID.toString()) === -1) {
      if (this.state.membershipsID.length != "") {
        if (this.state.dateCheck === true) {
          let RequestObject = {
            username: this.state.array[index].username,
            memberID: this.state.membershipsID,
            MemberStartDate: this.state.dateValue + "T00:00:00",
            memberExpiryDate: this.getCurrentDate() + "T00:00:00"
          };
          fetch(BASE_URL + "/api/Features/Update", {
            method: "Post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(RequestObject)
          })
            .then(function (response) {
              return response.json();
            })
            .then(data => {
              this.setState({ done: true });
              this.setState({ filterText: ""});
              this.props.fetchNumberOfNotification(this.state.token);
            })
            .catch(err => {
              /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
            });
            setTimeout(() => {
              this.getNonMembers();
              }, 2000);
        } else {

        }
      } else {
        /*the membershit can not be null */
      }
    } else {
      /*the membership is already exist */
      this.setState({ emptyMemberNumber: true });
    }
      this.setState({done:false})
  }

  onChangeText(event) {
    this.setState({ filterText: event.target.value });
  }

  status(timeLeft) {
    if (timeLeft < 2 || timeLeft === 2) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentDate() {
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  handleChange(event) {
    this.setState({ membershipsID: event.target.value });
  }
  handleDateChange(event) {
    this.setState({ dateValue: event.target.value });
    var selectedText = document.getElementById("expdate").value;
    var selectedDate = new Date(selectedText);
    var now = new Date();
    if (selectedDate > now) {
      this.setState({ dateCheck: false, dateErrormsg: true });
    } else {
      this.setState({ dateCheck: true, dateErrormsg: false });
    }
  }

  onChangeArrow = index => {
    if (index !== this.state.userIndex) {
      this.state.array[this.state.userIndex].selected = false;
      this.state.array[index].selected = !this.state.array[index].selected;
    } else {
      this.state.array[index].selected = !this.state.array[index].selected;
    }
    this.setState({ membershipsID: "", userIndex: index });
    this.forceUpdate();
  };

  ExportData = () => {
    let token = getCookie("token");
    let filter = "users";
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
            <label className="view-non-error-msg">
              No users available
            </label>
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
                        .startsWith(this.state.filterText.toLowerCase())
                    );
                  })
                  .map((posts, index) => (
                    <tr className="view-members-user" key={posts.id}>
                      <td className="first-column">
                        <Collapsible
                          open={posts.selected}
                          trigger={
                            <div
                              className="username-and-email"
                              onClick={() => this.onChangeArrow(index)}
                            >
                              <div className="view-non-members-users-email">
                                <b>{posts.username}</b>
                                <div className="view-non-members-email">
                                  {posts.email}
                                </div>
                              </div>

                              <div className="view-non-members-arrow">
                                {posts.selected === true ? (
                                  <img
                                    className="view-non-members-image"
                                    src={arrowUp}
                                  />
                                ) : (
                                    <img
                                      className="view-non-members-image"
                                      src={arrowDown}
                                    />
                                  )}
                              </div>
                            </div>
                          }
                        >
                      
                          <div className="membership-details">
                          {this.state.done===false?
                            <div className="membership-container">
                              <input
                                type="number"
                                className="view-non-members-text-boxes"
                                id="membershipID"
                                placeholder="Membership Number"
                                autoComplete="Off"
                                value={this.state.membershipsID}
                                onChange={this.handleChange}
                              />
                              {this.state.emptyMemberNumber === false ? null : (
                                <label className="non-member-same-member-number-error">
                                  Membership number already exists
                              </label>
                              )}
                            </div>:null}
                            {this.state.done === false ?
                              <div className="date-error-msg-cpntainer">
                                <input
                                  type="date"
                                  className="view-non-members-date-box"
                                  id="expdate"
                                  required
                                  data-date-format="yyyy-mm-dd"
                                  value={this.state.datevalue}
                                  onChange={this.handleDateChange}
                                />
                                {this.state.dateErrormsg === true ?
                                  <label className="non-member-Date-error-msg">Date selected is invalid</label> : null}
                              </div> : null}
                            {this.state.done === false ?
                              <div>
                                <button
                                  className={(this.state.dateValue != "" && this.state.membershipsID != "" && this.state.dateErrormsg === false) ? "view-non-members-confirm" : "view-non-members-confirm-inactive"}
                                  onClick={() => this.updateMember(index)}
                                >
                                  CONFIRM MEMBERSHIP
                            </button>
                              </div> : null}
                            {this.state.done === true ?
                              <div className="user-is-a-member-msg-container">
                                <label className="user-is-a-member-msg">MADE MEMBER SUCCESSFUL</label>
                              </div> : null}
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
                  className="export-icon"
                  alt="Is a Member"
                  onClick={e =>
                    (e.currentTarget.src = exportClick) && this.ExportData()
                  }
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
  { fetchNumberOfNotification, pageState }
)(ViewNonMembers);
