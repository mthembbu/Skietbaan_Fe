import React, { Component } from "react";
import "../components/ForgotPassword.css";
import { BASE_URL } from "../actions/types";
import back from "../components/assets/Back.png";
import skietbaan from "../components/assets/skietbaanLogo.png";
import history from "./history";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      isSent: ""
    };
    this.sendEmail = this.sendEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }
  sendEmail() {
    fetch(
      BASE_URL + "/api/Features/ForgotPassword?user=" + this.state.emailValue,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.emailValue)
      }
    )
      .then(res => res.json())
      .then(data => this.setState({ isSent: data }));
  }

  goToLogin() {
    history.push("/Login");
  }

  toggleNavbar() {
    let Navbar = document.querySelector(".navbar-admin");
    if (Navbar.classList.contains("hidden")) {
      Navbar.classList.remove("hidden");
    } else {
      Navbar.classList.add("hidden");
    }
  }

  handleChange(event) {
    this.setState({ emailValue: event.target.value });
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
                <label className="header-label">FORGOT PASSWORD</label>
              </div>
              <img
                src={back}
                alt="back button"
                className="back-btn"
                onClick={() => this.goToLogin()}
              />
            </div>
          </div>

          <div className="spacing-login forgot-password-textbox">
            <input
              type="text"
              name="usernameValue"
              id="usernameValue"
              autoComplete="off"
              value={this.state.usernameValue}
              onChange={this.handleChange}
              className="input-user"
              placeholder="Username or Email"
            />

            <div>
              <label className="forgot-password-error">
                {this.state.emailValue.length !== 0
                  ? this.state.isSent
                  : this.state.isSent === "user not registered"
                  ? this.setState({ isSent: "" })
                  : this.state.isSent}
              </label>
            </div>
          </div>

          <div className="forgot-password-text">
            <p className="forgot-password-paragragh">
              Forgot your password? No problem!
            </p>
            Provide your username or email and we’ll send you a link in your
            email so you can reset your password.
          </div>

          <div className="button-container forgot-password-button">
            <button
              onClick={
                this.state.emailValue.length !== 0 ? this.sendEmail : null
              }
              id="roundButton"
              className={
                this.state.emailValue.length !== 0
                  ? "round-button"
                  : "buttons-invalid round-button"
              }
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
