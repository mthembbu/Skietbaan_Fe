import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { getCookie } from "./cookie";
import history from "./history";
import { connect } from "react-redux";
import { BASE_URL } from "../actions/types.js";
import { getName } from "../actions/postActions";

class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      typeOfNotification: "",
      tokenValue: "",
      deleteClicked: false,
      cancelClicked: false,
      isRead: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
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

  onClick_View = (Notification, Message) => {
    if (Notification === "Award") {
    } else if (Notification === "Confirmation") {
    } else if (Notification === "Renewal") {
    } else if (Notification === "Competition") {
      var parts = Message.split(",")[0];
      setTimeout(function() {
        this.props.history.push("/home");
      }, 2000);
    } else if (Notification === "Document") {
    } else if (Notification === "Group") {
      var parts = Message.split(",")[0];
      this.props.getName(parts);
      setTimeout(function() {
        this.props.history.push("/notify");
      }, 2000);
    } else {
      setTimeout(function() {
        this.props.history.push("/notify");
      }, 2000);
      this.setState({
        isRead: true
      });
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
    setTimeout(function() {
      history.push("/notify");
    }, 2000);
  }

  componentDidMount() {
    if (getCookie("token")) {
      const token = document.cookie;
      fetch(BASE_URL + "/api/Notification/GetNotificationsByUser?" + token)
        .then(response => response.json())
        .then(data => {
          const newArray = data.map(notification => {
            notification.markedForDeletion = false;
            return notification;
          });
          this.setState({
            array: newArray
          });
        });
    }
  }

  render() {
    if (!getCookie("token")) {
      setTimeout(function() {
        history.push("/registerPage");
      }, 2000);
    }
    const headingItems = (
      <div>
        <div className="page-heading">
          <div>
            <a className="notifications-a-class" href="" />
          </div>
          <b>Notifications</b>
        </div>
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
              <a
                className={post.markedForDeletion ? "selected-text" : "text"}
                href=""
                onClick={() =>
                  this.onClick_View(
                    post.typeOfNotification,
                    post.notificationMessage
                  )
                }
              >
                {post.notificationMessage}
              </a>
            </td>
            <td className="td-Delete">
              <div
                onClick={() => this.markForDeletion(post.id)}
                className={
                  post.markedForDeletion
                    ? "selected notifications-slider"
                    : "notifications-images"
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

    const modalText = "Delete " + markedItemsCount + " Notifications?";

    const deleteModal = (
      <table
        className={
          this.state.array.some(post => post.markedForDeletion)
            ? "notifications-modal notifications-slider"
            : "hidden"
        }
      >
        <tr className="tr-Class">
          <td>
            <p className="text notifications-text">{modalText}</p>
          </td>
          <td>
            <button
              className="notifications-modal-confirm"
              onClick={this.onDelete}
            >
              Confirm
            </button>
          </td>
          <td>
            <button
              onClick={() => this.onClick_cancel()}
              className="notifications-modal-cancel"
            >
              Cancel
            </button>
          </td>
        </tr>
      </table>
    );

    return (
      <div className="body-class">
        <div>{headingItems}</div>
        <div>
          <div className="format-content">{postItems}</div>
        </div>
        <div>{deleteModal}</div>
      </div>
    );
  }
}

export default connect(
  null,
  { getName }
)(notification);