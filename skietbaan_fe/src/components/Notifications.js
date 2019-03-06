import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { getCookie } from "./cookie";
import history from "./history";
import { URL } from "../actions/types.js";

class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      typeOfNotification: "",
      tokenValue: "",
      deleteClicked: false,
      deleted: true,
      cancelClicked: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.markForDeletion = this.markForDeletion.bind(this);
  }

  onDelete = async () => {
    const deleteNotification = async id => {
      try {
        await fetch(URL + `/api/Notification/${id}`, {
          method: "Delete"
        });
      } catch (err) {
        console.error("err", err);
      }
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

  onClick_View = Notification => {
    if (Notification === "Award") {
    } else if (Notification === "Confirmation") {
    } else if (Notification === "Renewal") {
    } else if (Notification === "Competition") {
      history.push("/home");
    } else if (Notification === "Document") {
    } else if (Notification === "Group") {
    } else {
      history.push("/notify");
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
    window.location = "/notify";
  }

  componentDidMount() {
    if (getCookie("token")) {
      const token = document.cookie;
      fetch(URL + "/api/Notification?" + token)
        .then(response => response.json())
        .then(data => {
          const newArray = data.map(notification => {
            notification.markedForDeletion = false;
            return notification
          });
          this.setState({
            array: newArray
          });
        });
    }
  }

  render() {
    const headingItems = (
      <div>
        <div className="pageHeading">
          <div>
            <a className="notifications-aClass" href="" />
          </div>
          <b>Notifications</b>
        </div>
      </div>
    );

    const postItems = (
      <table className="postItems">
        <tbody className="">
          {this.state.array.map((post, i) => (
            <tr className="trClass" key={i}>
              <td className="tdNotification">
                <a
                  className={
                    post.markedForDeletion ? "selected-text" : "text"
                  }
                  href=""
                  onClick={() => this.onClick_View(post.typeOfNotification)}
                >
                  {post.notificationMessage}
                </a>
              </td>
              <td className="tdDelete">
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
        </tbody>
      </table>
    );

    const markedItems = this.state.array.filter(post => post.markForDeletion);
    const markedItemsCount = markedItems.length;
    const modalText = `Delete ${markedItemsCount > 1 ? `${markedItemsCount} ` : ''}Notification${markedItemsCount > 1 ? 's' : ''}?`;

    const deleteModal = (
      <table
        className={
          this.state.array.some(post => 
              post.markedForDeletion
            )
            ? "notifications-modal notifications-slider"
            : "hidden"
        }
      >
      
          <tr className="trClass">
            <td>
              <p>{modalText}</p>
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
      <div className="bodyClass">
        <div>{headingItems}</div>
        <div>{postItems}</div>
        <div>{deleteModal}</div>
      </div>
    );
  }
}
export default notification;
