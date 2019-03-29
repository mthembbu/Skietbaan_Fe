import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import memberIcon from "../components/assets/membership-icon.png";
import { getCookie } from "../components/cookie.js";

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
      indexNumber: 0
    };
    this.getNonMembers = this.getNonMembers.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.status = this.status.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateMember = this.updateMember.bind(this);
  }

  componentDidMount() {
    this.getNonMembers();
    this.getTimeLeft();
  }

  getNonMembers() {
    fetch(BASE_URL + "/api/Features/SearchNonMember", {
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
    fetch(BASE_URL + "/api/Features/TimeLeft", {
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
      "username": this.state.array[index].username,
      "memberID": this.state.membershipsID,
      "memberExpiryDate": this.getCurrentDate() + "T00:00:00"
    }
    fetch(BASE_URL + "/api/Features/Update", {
      method: 'Post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(RequestObject)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { })
      .catch(function (data) { });
  
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
    curr.setDate(curr.getDate() + 365);
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  handleChange(event) {
    this.setState({ membershipsID: event.target.value });
}

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    console.log(this.state.filterText)
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
                  .startsWith(this.state.filterText.toLowerCase())
              );
            })
            .map((post, index) => (
              <tr className="view-members-user" key={post.id}>
                <td className="first-column">
                  <Collapsible
                    trigger={
                      <div className="username-and-email">
                        <b>{post.username}</b>
                        <div>{post.email}</div>
                      </div>
                    }
                  >
                    <div className="membership-details">
                      <div>
                        <input
                          type="text"
                          className="view-non-members-text-boxes"
                          id="membershipID"
                          placeholder="Membership Number"
                          value={this.state.membershipsID}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          className="view-non-members-text-boxes"
                          id="expdate"
                          value={this.getCurrentDate()}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div>
                        <button
                          className="view-non-members-confirm"
                          onClick={() => this.updateMember(index)}
                        >
                          CONFIRM MEMBERSHIP
                        </button>
                      </div>
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
              id="usernameValue"
              placeholder="Enter Username"
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

export default ViewNonMembers;
