import React, { Component } from "react";
import "../components/userDetails.css";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types";
import { validateEmail, validateNumber } from "./Validators.js";

export default class userDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      nameValue: "",
      surnameValue: "",
      emailValue: "",
      cellphoneValue: "",
      returnValue: "",
      checkNumberValid: false,
      inputchanged: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.mounted = false;
    this.handErrorValue = this.handErrorValue.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    let token = getCookie("token");
    fetch(BASE_URL + "/api/Features/GetUserByToken/" + token)
      .then(res => res.json())
      .then(data =>
        this.setState({
          array: data,
          nameValue: data.name,
          surnameValue: data.surname,
          emailValue: data.email,
          cellphoneValue: data.phoneNumber
        })
      )
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  updateUser() {
    if (
      this.state.array.name === this.state.nameValue &&
      this.state.array.phoneNumber === this.state.cellphoneValue &&
      this.state.array.email === this.state.emailValue &&
      this.state.array.surname === this.state.surnameValue
    ) {
      this.setState({ inputchanged: false });
    } else if (!validateEmail(this.state.emailValue)) {
      this.setState({ inputchanged: false });
    } else {
      this.state.array.name = this.state.nameValue;
      this.state.array.phoneNumber = this.state.cellphoneValue;
      this.state.array.email = this.state.emailValue;
      this.state.array.surname = this.state.surnameValue;
      fetch(BASE_URL + "/api/Features/UpdateDetails/", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.array)
      })
        .then(res => res.json())
        .then(data => this.setState({ returnValue: data }))
        .catch(err => {
          /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
        });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
      inputchanged: true
    });
  }
  handErrorValue() {
    this.setState({ checkNumberValid: true });
  }

  render() {
    return (
      <div className="document-center">
        {this.state.array.length === 0 ? null : (
          <div className="user-details-main-container user-details-container">
            <div className="user-details-scrolls">
              <div className="member-details-container">
                <div className="user-details-heading-container user-details-member-name">
                  {this.state.array.username.toUpperCase()}
                </div>
                {this.state.array.memberID === null ||
                this.state.array.memberID === undefined ? null : (
                  <div>
                    <label className="user-details-heading-container user-details-member-number">
                      MEMBERSHIP NUMBER:
                    </label>

                    <label className="user-details-member-label">
                      {this.state.array.memberID}
                    </label>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="nameValue"
                  id="nameValue"
                  autoComplete="off"
                  className={"user-details-input-container"}
                  value={this.state.nameValue}
                  onChange={this.handleChange}
                  placeholder="Name"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="surnameValue"
                  id="surnameValue"
                  autoComplete="off"
                  className={"user-details-input-container"}
                  value={this.state.surnameValue}
                  onChange={this.handleChange}
                  placeholder="Surname"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="cellphoneValue"
                  id="cellphoneValue"
                  autoComplete="off"
                  className={"user-details-input-container"}
                  value={this.state.cellphoneValue}
                  onChange={this.handleChange}
                  placeholder="Cell Number"
                />
              </div>

              {this.state.checkNumberValid === false ? null : this.state
                  .cellphoneValue === null ? null : this.state.cellphoneValue
                  .length === 0 ? null : validateNumber(
                  this.state.cellphoneValue
                ) ? null : (
                <label className="user-details-Errors">
                  invalid Cellphone Number
                </label>
              )}

              <div>
                <input
                  type="text"
                  name="emailValue"
                  id="emailValue"
                  autoComplete="off"
                  className={"user-details-input-container"}
                  value={this.state.emailValue}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>

              {validateEmail(this.state.emailValue) ? null : (
                <label className="user-details-Errors">invalid email</label>
              )}
              {this.state.returnValue === "updated"
                ? (setTimeout(() => {
                    this.setState({ returnValue: "" });
                  }, 5000),
                  (
                    <label className="user-details-Errors">
                      User Details Updated
                    </label>
                  ))
                : null}

              <div className="user-details-button-contain ">
                <button
                  className={
                    this.state.array.name === this.state.nameValue &&
                    this.state.array.surname === this.state.surnameValue &&
                    this.state.array.phoneNumber ===
                      this.state.cellphoneValue &&
                    this.state.array.email === this.state.emailValue
                      ? "user-details-button-container-active"
                      : "user-details-button-container"
                  }
                  onClick={
                    this.state.inputchanged === true
                      ? this.updateUser
                      : this.handErrorValue
                  }
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
