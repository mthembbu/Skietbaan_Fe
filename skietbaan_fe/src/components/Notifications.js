import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { getCookie } from "./cookie";
import history from "./history";
import { connect } from "react-redux";
import { BASE_URL } from "../actions/types.js";
import PropTypes from "prop-types";
import deleteIcon from "../components/Notification-Img/trashcan.png";
import deleteIconChange from "../components/Notification-Img/blacktrashcan.png";
import {
  updateSelectedCompetition,
  updateSelectedGroup
} from "../actions/postActions";
import { updateIsReadProperty } from "../actions/notificationAction";

class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      typeOfNotification: "",
      tokenValue: "",
      deleteClicked: false,
      cancelClicked: false,
      isRead: false,
      toggle: false,
      markedForDeletion: false,
      updatedNotification: {}
    };
    this.onDelete = this.onDelete.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
  }

  onDelete = async () => {
    setTimeout(function() {
      window.location = "/notify";
    }, 2000);
    const deleteNotification = async id => {
      try {
        await fetch(
          BASE_URL + "/api/Notification/DeleteNotificationById/" + id,
          {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
          }
        );
      } catch (err) {}
    };

    const deletedIds = this.state.array
      .filter(notification => notification.markedForDeletion)
      .map(notification => notification.id);

    const newArray = this.state.array.filter(
      notification => !notification.markedForDeletion
    );

    const deletions = deletedIds.map(deleteNotification);
    await Promise.all(deletions);

    this.setState({
      array: newArray
    });
  };

  onClick_View = (Notification, Message, Id) => {
    this.setState({
      isRead: true
    });
    this.props.updateIsReadProperty(Id);
    if (Notification === "Award" || Notification === "Document") {
      this.props.history.push("/profile");
    } else if (Notification === "Confirmation") {
      this.props.history.push("/notify");
    } else if (Notification === "Renewal") {
    } else if (Notification === "Competition") {
      var competitionName = Message.split(",")[0];
      this.props.updateSelectedCompetition(competitionName);
      setTimeout(function() {
        window.location = "/home";
      }, 2000);
    } else if (Notification === "Group") {
      var groupName = Message.split(",")[0];
      this.props.updateSelectedGroup(groupName);
      setTimeout(function() {
        window.location = "/home";
      }, 2000);
    } else {
      setTimeout(function() {
        window.location = "/notify";
      }, 2000);
    }
  };

  markForDeletion(id) {
    const newArray = [...this.state.array];
    const index = newArray.findIndex(notification => notification.id === id);
    newArray[index].markedForDeletion = !newArray[index].markedForDeletion;
    this.setState({
      array: newArray
    });
  }

  onClick_cancel() {
    this.setState({
      toggle: false
    });
    history.go(0);
  }

  componentDidMount() {
    if (getCookie("token")) {
      const token = document.cookie;
      fetch(BASE_URL + "/api/Notification/GetNotificationsByUser?" + token)
        .then(response => response.json())
        .then(data => {
          const newArray = data.map(notification => {
            notification.markedForDeletion = false;
            this.state.isRead = notification.isRead;
            return notification;
          });
          this.setState({
            array: newArray
          });
        });
    }
  }

  changeIcon() {
    this.setState({
      toggle: !this.state.toggle
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
          <b className="notification-heading">Notifications</b>
        </div>
        <div className="trash-spacing">
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
        <b className="notification-heading">Notifications</b>
        <img
          src={deleteIcon}
          className="delete-icon"
          onClick={() => this.changeIcon()}
          alt=""
        />
      </div>
    );

    const postItems = (
      <table className="post-items">
        {this.state.array.length <= 0 ? (
          <text className="empty-screen">No Notifications Available</text>
        ) : (
          ""
        )}
        {this.state.array.map((post, i) => (
          <tr className="tr-class" key={i}>
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
            </td>
            <td className="td-Delete">
              <div
                onClick={() => this.markForDeletion(post.id)}
                className={
                  this.state.toggle
                    ? post.markedForDeletion
                      ? "notifications-selected notifications-slider"
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

    this.state.array.forEach(function(notifications) {
      if (notifications.markedForDeletion) {
        markedItems.push(notifications);
      }
    });
    let markedItemsCount = markedItems.length;

    const modalText = "DELETE " + markedItemsCount + " NOTIFICATION(S)";

    const deleteModal = (
      <table
        className={
          this.state.array.some(post => post.markedForDeletion)
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
  notificationOBJ: PropTypes.array.isRequired,
  updateIsReadProperty: PropTypes.func.isRequired,
  updateSelectedCompetition: PropTypes.func.isRequired,
  updateSelectedGroup: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  notificationOBJ: state.compOBJ.notificationsArray,
  updatedNotification: state.compOBJ.updatedNotification
});

export default connect(
  mapStateToProps,
  {
    updateSelectedCompetition,
    updateSelectedGroup,
    updateIsReadProperty
  }
)(notification);
