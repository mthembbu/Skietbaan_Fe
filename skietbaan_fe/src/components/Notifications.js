import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { getCookie } from "./cookie";
import { connect } from "react-redux";
import { BASE_URL } from "../actions/types.js";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import Moment from "react-moment";
import "moment-timezone";
import { selectedPage } from "../actions/postActions";
import deleteIcon from "../components/Notification-Img/trashcan.png";
import deleteIconChange from "../components/Notification-Img/blacktrashcan.png";
import whiteSelectAll from "../components/Notification-Img/white-select-all.png";
import blackSelectAll from "../components/Notification-Img/black-select-all.png";
import notifySpeakerBlack from "../components/Notification-Img/notifySpeaker.png";
import notifySpeakerWhite from "../components/Notification-Img/notifySpeakerWhite.png";
import { setSelectedCompetition } from "../actions/userProfileActions";
import { setSelectedLandingPage } from "../actions/profileLandingAction";
import {
  updateSelectedCompetition,
  updateSelectedGroup
} from "../actions/postActions";
import {
  updateIsReadProperty,
  getNotifications
} from "../actions/notificationAction";
import { Row, Col } from "react-bootstrap";

class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsArray: [],
      count: 0,
      tokenValue: "",
      deleteClicked: false,
      cancelClicked: false,
      isRead: false,
      toggle: false,
      secondToggle: false,
      check: "Select all",
      markedForDeletion: false,
      updatedNotification: {},
      token: getCookie("token"),
      marked: null,
      selected: null,
      adminToggle: false,
      stateCheck: false,
      speakerClicked: null,
      announceString: "",
      height: window.innerHeight,
      width: window.innerWidth
    };
    this.onDelete = this.onDelete.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.onChange = this.onChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
  }
  onDelete = async () => {
    const deletingArray = [];
    for (var i = 0; i < this.props.notificationsArray.length; i++) {
      if (this.props.notificationsArray[i].markedForDeletion === true) {
        deletingArray.push(this.props.notificationsArray[i]);
      }
    }
    try {
      fetch(BASE_URL + "/api/Notification/DeleteNotificationById", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deletingArray)
      }).then(() => {
        this.props.getNotifications(this.state.token);
        this.setState({
          toggle: false
        });
      });
    } catch (err) {}
  };

  onClick_View = (Notification, Message, Id) => {
    this.setState({
      isRead: true,
      toggle: false
    });
    this.props.updateIsReadProperty(Id);
    if (Notification === "Award") {
      var awardCompetitionName = Message.split(":")[1].trim();
      this.props.setSelectedCompetition(awardCompetitionName);
      this.props.setSelectedLandingPage(1);
      setTimeout(() => {
        window.location = "/profile";
      }, 1000);
    } else if (Notification === "Document") {
      this.props.setSelectedLandingPage(2);
      setTimeout(() => {
        window.location = "/profile";
      }, 1000);
    } else if (
      Notification === "Confirmation" ||
      Notification === "Expiry" ||
      Notification === "Renewal"
    ) {
      setTimeout(() => {
        this.props.history.push("/notify");
      }, 1000);
    } else if (Notification === "Competition") {
      var competitionName = Message.split(",")[0];
      this.props.updateSelectedCompetition(competitionName);
      setTimeout(() => {
        window.location = "/home";
      }, 1000);
    } else if (Notification === "Group") {
      var groupName = Message.split(",")[0];
      this.props.updateSelectedGroup(groupName);
      setTimeout(() => {
        window.location = "/home";
      }, 1000);
    } else {
      this.props.history.push("/notify");
    }
  };

  markForDeletion = index => {
    if (this.props.notificationsArray[index].markedForDeletion === true) {
      this.setState({ marked: false });
      this.props.notificationsArray[index].markedForDeletion = false;
    } else if (
      this.props.notificationsArray[index].markedForDeletion === false
    ) {
      this.setState({ marked: true });
      this.props.notificationsArray[index].markedForDeletion = true;
    }
  };

  selectAll = () => {
    for (var i = 0; i < this.props.notificationsArray.length; i++) {
      if (this.props.notificationsArray[i].markedForDeletion === true) {
        this.setState({ marked: false });
        this.props.notificationsArray[i].markedForDeletion = false;
      } else if (this.props.notificationsArray[i].markedForDeletion === false) {
        this.setState({ marked: true });
        this.props.notificationsArray[i].markedForDeletion = true;
      }
    }
  };

  onClick_cancel() {
    for (var i = 0; i < this.props.notificationsArray.length; i++) {
      this.props.notificationsArray[i].markedForDeletion = false;
    }
    this.setState({
      count: 0,
      toggle: false,
      secondToggle: false
    });
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  getBodyHeight() {
    return this.state.height - 56;
  }
  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  componentDidMount() {
    this.props.selectedPage(4);
    if (getCookie("token")) {
      this.props.getNotifications(this.state.token);
    }
    this.checkUserType();
  }

  onChange(event) {
    this.setState({ announceString: event.target.value });
    this.disableButton();
  }

  changeIcon() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  secondIconChange() {
    this.setState({
      secondToggle: !this.state.secondToggle
    });
  }

  checkUserType() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/features/getuserbytoken/" + token, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          stateCheck: data.admin
        });
      })
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  speakerClick() {
    this.setState({
      adminToggle: !this.state.adminToggle
    });
    if (this.state.adminToggle === false) {
      this.disableButton();
    }
  }

  disableButton() {
    setTimeout(() => {
      if (
        this.state.announceString.length > 0 &&
        this.state.announceString !== undefined
      ) {
        document.getElementById("announcementButton").disabled = false;
      } else document.getElementById("announcementButton").disabled = true;
    }, 500);
  }

  submitAnnouncement = () => {
    fetch(BASE_URL + "/api/Notification/Announcements/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.announceString)
    })
      .then(function(response) {})
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
    document.getElementById("announcementButton").disabled = true;
    setTimeout(() => {
      this.setState({
        adminToggle: false
      });
      window.location = "/notify";
    }, 1000);
  };

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }

    let headingItems = (
      <div className="page-heading">
        <div className="notification-gun-overlay-image">
          <div className="outer-header-div">
            <label className="label-for-score">NOTIFICATIONS</label>
          </div>
        </div>
        <div className="notification-icon-spacing">
          <img
            src={
              this.state.toggle
                ? whiteSelectAll
                : this.state.secondToggle
                ? blackSelectAll
                : "hidden"
            }
            onClick={() => this.selectAll()}
            className="select-all"
            alt=""
          />
          <img
            src={this.state.toggle ? deleteIconChange : deleteIcon}
            onClick={() => this.changeIcon()}
            className={this.state.toggle ? "black-delete-icon" : "delete-icon"}
            alt=""
          />
        </div>
      </div>
    );

    const adminHeadingItems = (
      <div className="page-heading">
        <div className="gun-overlay-image">
          <div className="outer-header-div">
            <label className="label-for-score">NOTIFICATIONS</label>
          </div>
        </div>
        <div className="notification-spacing">
          <img
            src={
              this.state.adminToggle ? notifySpeakerBlack : notifySpeakerWhite
            }
            onClick={() => this.speakerClick()}
            className="admin-notification-images"
          />
        </div>
        <div className="admin-notification-icon-spacing">
          <img
            src={
              this.state.toggle
                ? whiteSelectAll
                : this.state.secondToggle
                ? blackSelectAll
                : "hidden"
            }
            onClick={() => this.selectAll()}
            className="admin-select-all"
            alt=""
          />
          <img
            src={this.state.toggle ? deleteIconChange : deleteIcon}
            onClick={() => this.changeIcon()}
            className={
              this.state.toggle
                ? "admin-black-delete-icon"
                : "admin-delete-icon"
            }
            alt=""
          />
        </div>
      </div>
    );

    const postItems = (
      <table className="post-items">
        {this.props.notificationsArray.length <= 0 ? (
          <label className="empty">No Notifications Available</label>
        ) : (
          ""
        )}
        {this.props.notificationsArray.map((post, i) => (
          <tr className="tr-class" key={i}>
            <td className="first-column-notify">
              <img
                src={post.images}
                className="notification-icon-on-the-side"
                alt=""
              />
            </td>
            <td className="td-notification">
              <label
                className={
                  post.markedForDeletion && this.state.toggle
                    ? "notifications-selected-text"
                    : post.isRead === true
                    ? "notifications-text"
                    : "notifications-unread"
                }
                onClick={() =>
                  this.onClick_View(
                    post.typeOfNotification,
                    post.notificationMessage,
                    post.id
                  )
                }
              >
                {post.notificationMessage}
              </label>
              <Moment fromNow className="time-div">
                {post.timeOfArrival}
              </Moment>
            </td>
            <td className="td-Delete">
              <div
                onClick={() => this.markForDeletion(i)}
                className={
                  this.state.toggle
                    ? post.markedForDeletion
                      ? "notifications-selected"
                      : "notifications-images"
                    : "hide"
                }
                alt="redirect"
              />
            </td>
          </tr>
        ))}
      </table>
    );

    let markedItems = [];

    this.props.notificationsArray.forEach(function(notifications) {
      if (notifications.markedForDeletion) {
        markedItems.push(notifications);
      }
    });
    let markedItemsCount = markedItems.length;
    let modalText;
    if (markedItemsCount === this.props.notificationsArray.length) {
      modalText = "DELETE ALL NOTIFICATIONS";
    } else {
      modalText = "DELETE " + markedItemsCount + " NOTIFICATION(S)";
    }

    const deleteModal = (
      <table
        className={
          this.props.notificationsArray.some(post => post.markedForDeletion) &&
          this.state.toggle
            ? "notifications-modal"
            : "hidden"
        }
      >
        <tr className="tr-Class">
          <td>
            <button
              className="notifications-modal-confirm"
              onClick={this.onDelete}
            >
              {modalText}
            </button>
          </td>
          <td>
            <button
              onClick={() => this.onClick_cancel()}
              className="notifications-modal-cancel"
            >
              CANCEL
            </button>
          </td>
        </tr>
      </table>
    );

    const writeAnnouncement = (
      <div className="announcement-main">
        <div className="announcement-spacing">
          <textarea
            type="text"
            name="name"
            className="announcement-text"
            value={this.state.announceString}
            placeholder="Enter announcement"
            onChange={this.onChange}
          />
        </div>
        <div>
          <button
            id="announcementButton"
            className={
              this.state.announceString !== "" && this.state.adminToggle
                ? "announcement-send"
                : "disabled-button"
            }
            onClick={() => this.submitAnnouncement()}
          >
            SEND ANNOUNCEMENT
          </button>
        </div>
      </div>
    );

    return (
      <Row className="row justify-content-center">
        <Col sm={8} className="createpage-bootstrap-col-center-container">
          <div className="notifications-body-class">
            <div className="styling-for-gun-overlay">
              {this.state.stateCheck === false ? (
                <div>{headingItems}</div>
              ) : (
                <div>{adminHeadingItems}</div>
              )}
              {this.state.adminToggle === true ? (
                <Collapse isOpened={this.state.adminToggle === true}>
                  <div>{writeAnnouncement}</div>
                </Collapse>
              ) : (
                <div
                  className="format-content"
                  style={{ maxHeight: this.getBodyHeight() + "px" }}
                >
                  {postItems}
                </div>
              )}
              <div>{deleteModal}</div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
notification.propTypes = {
  notificationsArray: PropTypes.array.isRequired,
  updateIsReadProperty: PropTypes.func.isRequired,
  updateSelectedCompetition: PropTypes.func.isRequired,
  updateSelectedGroup: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  notificationsArray: state.notificationOBJ.notificationsArray,
  updatedNotification: state.notificationOBJ.updatedNotification,
  awardsSelectedCompetition: state.awardsReducer.selectedCompetition,
  selectedButton: state.landingReducer.selectedLandingPage
});

export default connect(
  mapStateToProps,
  {
    updateSelectedCompetition,
    updateSelectedGroup,
    updateIsReadProperty,
    getNotifications,
    setSelectedCompetition,
    setSelectedLandingPage,
    selectedPage
  }
)(notification);
