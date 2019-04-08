import React, { Component } from "react";
import "../components/ForgotPassword.css";
import { BASE_URL } from "../actions/types";
import skietbaan from "../components/assets/skietbaanLogo.png";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordValue: "",
      confirmPasswordValue: "",
      returnValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.hanldeReseting = this.hanldeReseting.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  togglePassword() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  componentDidMount() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
      var key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }

  toggleNavbar() {
    let Navbar = document.querySelector(".navbar-admin");
    if (Navbar.classList.contains("hidden")) {
      Navbar.classList.remove("hidden");
    } else {
      Navbar.classList.add("hidden");
    }
  }

  async resetPassword() {
    let user = window.location.pathname.split("/")[2];
    let sha1 = require("sha1");
    let hash = sha1(this.state.confirmPasswordValue);

    await fetch(
      BASE_URL + `/api/Features/Resetpassword?token=${user}&password=${hash}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    )
      .then(res => res.json())
      .then(data => this.setState({ returnValue: data }))
      .catch(err => {
        return Promise.reject();
      });

    {
      setTimeout(() => {
        window.location = "/login";
      }, 2000);
    }
  }

  hanldeReseting() {
    if (
      this.state.confirmPasswordValue.length >= this.state.passwordValue.length
    ) {
      if (this.state.confirmPasswordValue.length !== 0) {
        if (this.state.passwordValue.length !== 0)
          if (this.state.confirmPasswordValue === this.state.passwordValue) {
            this.resetPassword();
          }
      }
    }
  }

  render() {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        this.toggleNavbar();
      },
      false
    );

    return (
      <div className="forgot-password-page-content">
        <div className="container-of-elements">
          <div className="red-background">
            <div className="welcome-header">
              <img src={skietbaan} className="header-image" alt="" />
            </div>
            <div className="header-container">
              <div className="centre-label">
                <label className="header-label">RESET PASSWORD</label>
              </div>
            </div>
          </div>

          <div className="centre-div input-label">
            <div className="input-label  reset-password-textbox">
              <input
                type="text"
                name="passwordValue"
                id="passwordValue"
                autoComplete="off"
                value={this.state.passwordValue}
                onChange={this.handleChange}
                className={
                  this.state.toggle ? "input-password-show" : "input-password"
                }
                placeholder="Password"
              />
              <div
                className={
                  this.state.passwordValue !== ""
                    ? "password-view-icon reset-password-eye"
                    : "password-icon reset-password-eye"
                }
                onClick={this.togglePassword}
                name="eye"
              />
            </div>

            <div className="input-label centre-div reset-password-textbox">
              <input
                type="text"
                name="confirmPasswordValue"
                id="confirmPasswordValue"
                autoComplete="off"
                value={this.state.confirmPasswordValue}
                onChange={this.handleChange}
                className={
                  this.state.toggle ? "input-password-show" : "input-password"
                }
                placeholder="Confirm Password"
              />
              <div
                className={
                  this.state.confirmPasswordValue !== ""
                    ? "password-view-icon reset-password-eye"
                    : "password-icon reset-password-eye"
                }
                onClick={this.togglePassword}
                name="eye"
              />
            </div>

            <div className="input-label centre-div">
              {this.state.confirmPasswordValue.length >=
              this.state.passwordValue.length ? (
                this.state.confirmPasswordValue ===
                this.state.passwordValue ? null : (
                  <label className="forgot-password-error">
                    PASSWORDS DO NOT MATCH
                  </label>
                )
              ) : null}
            </div>
          </div>

          <div className="input-label centre-div">
            {this.state.returnValue === "changed" ? null : (
              <label className="forgot-password-error">
                {this.state.returnValue}
              </label>
            )}
          </div>
          <div className="button-container forgot-password-button">
            <button
              onClick={this.hanldeReseting}
              id="roundButton"
              className={
                this.state.confirmPasswordValue.length >=
                  this.state.passwordValue.length &&
                this.state.confirmPasswordValue.length !== 0 &&
                this.state.passwordValue.length !== 0
                  ? this.state.confirmPasswordValue === this.state.passwordValue
                    ? "round-button"
                    : "buttons-invalid round-button"
                  : "buttons-invalid round-button"
              }
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
