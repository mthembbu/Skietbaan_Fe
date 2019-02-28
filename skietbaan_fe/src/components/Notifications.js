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
      notificationMsg: "",
      typeOfNotification: "",
      tokenValue: "",
      isRead: false,
      showDelete: false,
      deleteClicked: false,
      viewClicked: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete = key => {
    let id = this.state.array[key].id;
    let newArray = this.state.array;
    newArray.splice(key, 1);
    this.setState({ array: newArray });

    fetch(URL + `/api/Notification/${id}`, {
      method: "Delete"
    }).catch(err => {
      console.error("err", err);
    });
  };

  initialState() {
    return this.setState({
      showDelete: false
    });
  }

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

  componentDidMount() {
    if (getCookie("token")) {
      var token = document.cookie;
      fetch(URL + "/api/Notification?" + token)
        .then(response => response.json())
        .then(data => {
          this.setState({
            array: data
          });
        });
    }
  }

  render() {
    const headingItems = (
      <div className="PageHeading">
        <b>Notifications</b>
      </div>
    );

    const postItems = (
      <table className="postItems">
        <tbody className="">
          {this.state.array.map((post, i) => (
            <tr className="trClass" key={i}>
              <td className="tdNotification">
                <a
                  className="text"
                  href=""
                  onClick={() => this.onClick_View(post.typeOfNotification)}
                >
                  {post.notificationMessage}
                </a>
              </td>
              <td className="tdDelete">
                <img
                  onClick={() => {
                    this.onDelete(i);
                  }}
                  className="images"
                  src={require("./Notification-Img/delete.png")}
                  alt="redirect"
                />
              </td>
              <hr />
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div className="bodyClass">
        <div>{headingItems}</div>
        <div>{postItems}</div>
      </div>
    );
  }
}
export default notification;
