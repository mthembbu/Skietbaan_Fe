import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import memberIcon from "../components/assets/greyMembershipIcon.png";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import Export from "../components/assets/Export.png";
import RedBullet from "../components/assets/RedBullet.png";
import exportClick from "../components/assets/exportPress.png";
import { connect } from "react-redux";
import { pageState } from '../actions/postActions';
import { exportIsClicked, exportCSV,filterName } from '../actions/notificationAction';
import deleteButton from '../components/GroupImages/deleteS.png';

class ViewMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isOpened: false,
      height: 100,
      timeLeftOnMembership: [],
      filterText: "",
      lastSize: 0,
      navbarState: false,
      height: window.innerHeight,
      width: window.innerWidth,
      getData: false,
      exportMsg: false,
      exportResponse: "",
      exceptionCaught: false,
      exportResponse: "",
      userIndex: 0,
    };
    this.getAllMembers = this.getAllMembers.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.status = this.status.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleNavbar2 = this.toggleNavbar2.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
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
     this.props.filterName(["members"]);
  }
  componentDidMount() {
    this.updateDimensions();
    this.getAllMembers();
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
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - (240 - 184) - 180 + "px";
    } else {
      return "50vh";
    }
  }

  getAllMembers() {
    fetch(BASE_URL + "/api/Features/SearchMember", {
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
      .then(data => {
        this.setState({
          getData: true,
          array: data.map(user => {
            return {
              ...user,
              selected: false
            }
          })
        });
      })
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
        this.setState({ exceptionCaught: true });
      });
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

  status(timeLeft) {
    if (timeLeft < 2 || timeLeft === 2) {
      return true;
    } else {
      return false;
    }
  }

  ExportData = () => {
    let token = getCookie("token");
    const fData = { getFilterName: this.props.filterNames, getAdminToken: token };
    this.setState({exportMsg:true})
    this.props.exportCSV(fData);
    this.props.filterName(["members"]);
  };

  onChangeArrow = index => {
    if (index !== this.state.userIndex) {
      this.state.array[this.state.userIndex].selected = false;
      this.state.array[index].selected = !this.state.array[index].selected;
    } else {
      this.state.array[index].selected = !this.state.array[index].selected;
    }
    this.setState({ userIndex: index });
    this.forceUpdate();
  };

  timeout(duration) {
    setTimeout(() => {
      this.setState({ exportMsg: false });
    }, duration)
  }

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
      <div style={{ height: this.getBodyHeight() }}>
        {this.state.array.length === 0 && this.state.getData === true ? (
          <div className="view-non-error-container">
            <label className="view-non-error-msg">
              No members have been created yet.
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
                        .startsWith(this.state.filterText.toLowerCase()) ||
                      post.memberID.startsWith(this.state.filterText) ||
                      this.extractEmails(post.email).startsWith(
                        this.state.filterText.toLowerCase()
                      )
                    );
                  })
                  .map((post, index) => (
                    <tr className="view-members-user" key={post.id}>
                      <td className="first-column">
                        <Collapsible
                          open={post.selected}
                          trigger={
                            <div className="username-and-email" onClick={() => this.onChangeArrow(index)}>
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
                              {post.selected===false?
                              <div className="bottom-line"/>:null}
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
                          <div className="view-members-membership-details">
                            CELLPHONE NUMBER:{" "}
                            <b>
                              {post.phoneNumber === null
                                ? "N/A"
                                : post.phoneNumber}
                            </b>
                            <div>
                              MEMBERSHIP NUMBER: <b>{post.memberID}</b>
                            </div>
                            <div className="view-member-phone-number">
                              START OF MEMBERSHIP:
                            <b>{post.memberStartDate.substring(0, 10)}</b>
                            </div>
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
      
      <div className="centre-view-member" style={{ height: this.getBodyHeight() }}>
        <div className="username-search">
          <Row>
            {this.props.isClicked === false ?
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
              </Col> :
              <Col>
                <button onClick={e => (e.currentTarget.src = exportClick) && this.ExportData()} className="export-button-css">{this.props.ExportWrittenText.toUpperCase()}</button>
              </Col>}

            <Col className="export-col-container">
              {" "}
              <div className="export-container">
                <img
                  src={this.props.isClicked === false ? Export : deleteButton}
                  className="export-icon"
                  alt="Is a Member"
                  onClick={()=>this.props.exportIsClicked("members")}
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
          style={{ height: this.getBodyHeight() }}
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
            className={this.state.getData === false && this.state.exceptionCaught === false
              ? "hidden"
              : "table-search-members"}
            style={{ height: this.getBodyHeight() }}
          >
            {postItems}
          </div>
        ) : (
            <div>
              {this.props.filterData !== "" && !this.props.filterData.startsWith("Could")
                ? this.timeout(2000)
                : this.timeout(6000)}
              <div className="exportMsg-container">
                <label className="exportMsg-responce">
                  {this.props.filterData}
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

const mapStateToProps = (state) => ({
  isClicked: state.notificationOBJ.isClicked,
  userIsClicked: state.notificationOBJ.userIsClicked,
  memberIsClicked: state.notificationOBJ.memberIsClicked,
  expiredIsClicked: state.notificationOBJ.expiredIsClicked,
  ExportWrittenText: state.notificationOBJ.ExportWrittenText,
  filterData: state.notificationOBJ.filterData,
  filterNames: state.notificationOBJ.filterName,
});

export default connect(
  mapStateToProps,
  { pageState, exportIsClicked, exportCSV,filterName }
)(ViewMembers);