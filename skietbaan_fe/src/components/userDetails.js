import React, { Component } from "react";
import "../components/userDetails.css";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types";

export default class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { array: [], usernameValue: "", emailValue: "" };

    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Features/GetUserByToken/" + token)
      .then(res => res.json())
      .then(data =>
        this.setState({
          array: data,
          usernameValue: data.username,
          emailValue: data.email
        })
      );
  }

  updateUser() {
    this.state.array.email = this.state.emailValue;
    this.state.array.username = this.state.usernameValue;
    fetch(BASE_URL + "/api/Features/UpdateDetails/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.array)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <div className="userDetails-main-container">
        <div className="userDetails-main-container userDetails-container">
          <div className="userDetails-heading-container">
            {this.state.array.username}
          </div>

          <div>
            <label className="userDetails-heading-container">
              member number:
            </label>

            <label className="userDetails-member-label">
              {this.state.array.memberID}
            </label>
          </div>

          <div>
            <input
              type="text"
              name="usernameValue"
              id="usernameValue"
              autoComplete="off"
              className={"userDetails-input-container"}
              value={this.state.usernameValue}
              onChange={this.handleChange}
              placeholder="Username"
            />
          </div>

          <div>
            <input
              className={"userDetails-input-container"}
              placeholder="Cell Number"
            />
          </div>

          <div>
            <input
              type="text"
              name="emailValue"
              id="emailValue"
              autoComplete="off"
              className={"userDetails-input-container"}
              value={this.state.emailValue}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </div>
          <div className="userDetails-button-contain ">
            <button
              className={"userDetails-button-container"}
              onClick={this.updateUser}
            >
              Update Details
            </button>
          </div>
        </div>
      </div>
    );
  }
}
