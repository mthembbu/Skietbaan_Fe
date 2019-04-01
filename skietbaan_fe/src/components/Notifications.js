import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { getCookie } from "./cookie";
import history from "./history";
import { connect } from "react-redux";
import { BASE_URL } from "../actions/types.js";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import deleteIcon from "../components/Notification-Img/trashcan.png";
import deleteIconChange from "../components/Notification-Img/blacktrashcan.png";
import whiteSelectAll from "../components/Notification-Img/white-select-all.png";
import blackSelectAll from "../components/Notification-Img/black-select-all.png";
import notifySpeakerBlack from "../components/Notification-Img/notifySpeaker.png";
import notifySpeakerWhite from "../components/Notification-Img/notifySpeakerWhite.png";
import {setSelectedCompetition} from "../actions/userProfileActions"
import {
  updateSelectedCompetition,
  updateSelectedGroup
} from "../actions/postActions";
import {
  updateIsReadProperty,
  getNotifications
} from "../actions/notificationAction";

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
      adminToggle: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  onDelete = async () => {
    const deletingarray = [];
    for (var i = 0; i < this.props.notificationsArray.length; i++) {
      if (this.props.notificationsArray[i].markedForDeletion === true) {
        deletingarray.push(this.props.notificationsArray[i]);

        delete this.props.notificationsArray[i];
      }
    }
    try {
      fetch(BASE_URL + "/api/Notification/DeleteNotificationById", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deletingarray)
      });
    } catch (err) {}
    window.location = "/notify";
  };

  onClick_View = (Notification, Message, Id) => {
    this.setState({
      isRead: true
    });
    this.props.updateIsReadProperty(Id);
    if (Notification === "Award" || Notification === "Document") {
      //PUT IN THE CORRECT COMPETITION NAME FROM THE NOTIFICATION MESSAGE
      this.props.awardsSelectedCompetition("Rifle 100m")
      this.props.history.push("/profile");
    } else if (Notification === "Confirmation" || Notification === "Expiry") {
      this.props.history.push("/notify");
    } else if (Notification === "Renewal") {
    } else if (Notification === "Competition") {
      var competitionName = Message.split(",")[0];
      this.props.updateSelectedCompetition(competitionName);
      window.location = "/home";
    } else if (Notification === "Group") {
      var groupName = Message.split(",")[0];
      this.props.updateSelectedGroup(groupName);
      window.location = "/home";
    } else {
      window.location = "/notify";
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

  componentDidMount() {
    if (getCookie("token")) {
      this.props.getNotifications(this.state.token);
    }
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

  adminToggle() {
    this.setState({
      adminToggle: !this.state.adminToggle
    });
  }

  render() {
    if (!getCookie("token")) {
      setTimeout(function() {
        history.push("/registerPage");
      }, 2000);
    }

    let headingItems = (
      <div className="page-heading">
        <div className="outer-header-div">
          <b>Notifications</b>
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
        <div className="outer-header-div">
          <b>Notifications</b>
        </div>
        <div>
          <img
            src={
              this.state.adminToggle ? notifySpeakerBlack : notifySpeakerWhite
            }
            onClick={() => this.adminToggle}
          />
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

    const postItems = (
      <table className="post-items">
        {this.props.notificationsArray.length <= 0 ? (
          <text className="empty-screen">No Notifications Available</text>
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
                  post.markedForDeletion
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
              <Moment fromNow ago className="time-div">
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
          this.props.notificationsArray.some(post => post.markedForDeletion)
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

    return (
      <div className="notifications-body-class">
        <div>{headingItems}</div>
        <div className="format-content">{postItems}</div>
        <div>{deleteModal}</div>
      </div>
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
  awardsSelectedCompetition: state.profile.selectedCompetition
});

export default connect(
  mapStateToProps,
  {
    updateSelectedCompetition,
    updateSelectedGroup,
    updateIsReadProperty,
    getNotifications,
    setSelectedCompetition
  }
)(notification);
