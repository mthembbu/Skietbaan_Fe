import React, { Component } from "react";
import "../components/ViewMembers.css";
import Collapsible from "react-collapsible";
import { BASE_URL } from "../actions/types.js";
import memberIcon from "../components/assets/greyMembershipIcon.png";
import { getCookie } from "../components/cookie.js";

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
      navbarState: false
    };
    this.getAllMembers = this.getAllMembers.bind(this);
    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.status = this.status.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleNavbar2 = this.toggleNavbar2.bind(this);
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

  componentDidMount() {
    this.getAllMembers();
    this.getTimeLeft();
  }

  getAllMembers() {
    fetch(BASE_URL + "/api/Features/SearchMember", {
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
                      <div className="username-and-email">
                        <div className="view-members-username-email">
                          <b>{post.username}</b>
                          <div className="view-non-members-email">
                            {post.email}
                          </div>
                        </div>
                        <div className="view-members-icon">
                          <img
                            src={memberIcon}
                            className="membership-icon"
                            alt="Is a Member"
                          />
                        </div>
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
                                {this.state.timeLeftOnMembership[index]} Months
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <div className="view-members-membership-details">
                      Membership No: <b>{post.memberID}</b>
                      <div>
                        Start of Membership:{" "}
                        <b>{post.memberStartDate.substring(0, 10)}</b>
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

export default ViewMembers;
