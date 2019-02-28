import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { getCookie } from "./cookie";
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

    fetch(`http://localhost:63474/api/Notification/${id}`, {
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
    if (!this.state.viewClicked) {
        if (Notification === "Award") {
          window.location("./Leaderboard");
        } else if (Notification === "Confirmation") {
          window.location("");
        } else if (Notification === "Renewal") {
          window.location("");
        } else if (Notification === "Competition") {
          window.location("./Competition");
        } else if (Notification === "Document") {
          window.location("");
        } else if (Notification === "Group") {
          window.location("./Group");
        }else{
          return null;
        }
    }
    this.setState({
      typeOfNotification:Notification
    })
  }

  componentDidMount() {
    if (getCookie("token")) {
      var token = document.cookie;
      fetch("http://localhost:63474/api/Notification?" + token)
        .then(response => response.json())
        .then(data => {
          this.setState({
            array: data
          });
        })
        .catch(function(data) {});
    }
  }

  // redirect() {
  //   history.push("/notify");
  // }

  render() {
    const headingItems = (
      <div className="PageHeading">
        <b className="pageheading">Notifications</b>
      </div>
    );

    const postItems = (
      <table className="postItems">
        <tbody className="">
          {this.state.array.map((post, i) => (
            <tr className="trClass" key={i}>
              <td className="tdNotification text">
                <a 
                  className="text"
                  href=""
                  onClick={() => {
                    this.onClick_View(post.typeOfNotification);
                  }}
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
