import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import memberIcon from "../components/assets/membership-icon.png";
import { getCookie } from "../components/cookie.js";
import Radio from "@material-ui/core/Radio";

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
      dateValue: ""
    };
    this.getExpiringMembers = this.getExpiringMembers.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.status = this.status.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  componentDidMount() {
    this.getExpiringMembers();
    this.getTimeLeft();
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
          array: data
        })
      );
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
      );
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
      .then(function(data) {})
      .catch(function(data) {});
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

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    const postItems = (
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
                      <div>
                        <div className="view-members-exp-username-and-email">
                          <b>{post.username}</b>
                          <img
                            src={memberIcon}
                            className="membership-icon"
                            alt="Is a Member"
                          />
                          <div>{post.email}</div>
                        </div>
                        <div className="view-members-exp-expiry-time-column">
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
                              {post.memberExpiryDate
                                .substring(0, 10)
                                .split("-")
                                .join("/")}
                              <div>
                                {this.state.timeLeftOnMembership[index]} Months
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  >
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
    );
    return (
      <div className="centre-view-member">
        <div className="username-search">
          <div className="search">
            <input
              autoComplete="off"
              type="text"
              className="user-value"
              placeholder="Enter Username"
              id="usernameValue"
              value={this.state.filterText}
              onChange={this.onChangeText}
            />
          </div>
        </div>
        <div className="table-search-members">{postItems}</div>
      </div>
    );
  }
}

export default ViewMembersExpiring;
