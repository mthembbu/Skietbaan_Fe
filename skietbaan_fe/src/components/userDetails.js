import React, { Component } from "react";
import "../components/userDetails.css";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types";

export default class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      nameValue: "",
      emailValue: "",
      cellphoneValue: "",
      returnValue: ""
    };

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
          nameValue: data.name,
          emailValue: data.email,
          cellphoneValue: data.phoneNumber
        })
      );
  }

  updateUser() {
    this.state.array.name = this.state.nameValue;
    this.state.array.phoneNumber = this.state.cellphoneValue;
    this.state.array.email = this.state.emailValue;
    fetch(BASE_URL + "/api/Features/UpdateDetails/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.array)
    })
      .then(res => res.json())
      .then(data => this.setState({ returnValue: data }));
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
              name="nameValue"
              id="nameValue"
              autoComplete="off"
              className={"userDetails-input-container"}
              value={this.state.nameValue}
              onChange={this.handleChange}
              placeholder="Name And Surname"
            />
          </div>

          <div>
            <input
              type="number"
              name="cellphoneValue"
              id="cellphoneValue"
              autoComplete="off"
              className={"userDetails-input-container"}
              value={this.state.cellphoneValue}
              onChange={this.handleChange}
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

          {this.state.returnValue === "updated" ? (
            <label className="userDetails-member-label">
              user details updated
            </label>
          ) : null}
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
