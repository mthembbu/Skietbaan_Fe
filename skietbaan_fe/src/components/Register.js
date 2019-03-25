import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  Form
} from 'reactstrap';
import '../components/RegisterStyles.css';
import { validateEmail, validateUsername } from './Validators.js';
import { getCookie } from './cookie.js';
import { URL } from '../actions/types.js';
import skietbaan from '../components/assets/skietbaanLogo.png';
import history from "./history";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      emailValue: "",
      passwordValue: "",
      validForm: false,
      tokenValue: "",
      users: [],
      toggle: false
    }
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  disableButton() {
    if (this.state.validForm === true) {
      document.getElementById("roundButton").disabled = false;
    }
    else
      document.getElementById("roundButton").disabled = true;

  }

  componentDidMount() {
    this.disableButton();
    fetch(URL + "/api/User", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        users: data,
      }))
      .catch(function (data) {
      });
  }

  toggleNavbar() {
    let Navbar = document.querySelector(".navbar-admin");
    if (Navbar.classList.contains("hidden")) {
      Navbar.classList.remove("hidden");
    }
    else {
      Navbar.classList.add("hidden");
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    let isValid = false;
    let stateUpdate = {
      invalidPassword: this.state.invalidPassword,
      invalidEmail: this.state.invalidEmail,
      invalidUsername: this.state.invalidUsername,
      usernameTaken: false,
      emailTaken: false
    }
    if (target.name === "passwordValue") {
      if (target.value.length > 0)
        stateUpdate.invalidPassword = false;
      else {
        stateUpdate.invalidPassword = true;
      }
    }
    if (target.name === "emailValue") {
      stateUpdate.invalidEmail = false;
      for (var i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].email.toLowerCase() == target.value.toLowerCase()) {
          stateUpdate.emailTaken = true;
          stateUpdate.invalidEmail = true;
          break;
        }

      };
    };
    if (target.name === "usernameValue" && target.value.length > 0) {
      stateUpdate.invalidUsername = false;
      for (var i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].username.toLowerCase() == target.value.toLowerCase()) {
          stateUpdate.usernameTaken = true;
          stateUpdate.invalidUsername = true;
          break;
        }

      };
    }
    else if (target.name === "usernameValue") {
      stateUpdate.invalidUsername = true;
    }
    if (this.state.usernameValue
      && this.state.passwordValue
      && this.state.emailValue
      && validateEmail(this.state.emailValue)
      && !stateUpdate.invalidUsername
      && !stateUpdate.invalidEmail
      && !stateUpdate.invalidPassword) {
      isValid = true;
    }
    this.setState({
      ...stateUpdate,
      validForm: isValid
    }, () => {
      this.disableButton();
    });
  };

  validate() {
    let isValid = true;
    let stateUpdate = {
      invalidPassword: false,
      invalidEmail: false,
      invalidUsername: false
    }
    if (this.state.passwordValue.length === 0) {
      stateUpdate.invalidPassword = true;
      isValid = false;
    };
    if (!validateEmail(this.state.emailValue)) {
      stateUpdate.invalidEmail = true;
      isValid = false;
    };
    if (validateUsername(this.state.usernameValue)) {
      stateUpdate.invalidUsername = true;
      isValid = false;
    };
    this.setState({
      ...stateUpdate,
      validForm: isValid,
    });
  }

  register() {
    this.validate();
    if (this.state.validForm) {
      let sha1 = require('sha1');
      let hash = sha1(this.state.passwordValue);
      let RequestObject = {
        "Username": this.state.usernameValue.toLowerCase(),
        "Email": this.state.emailValue.toLowerCase(),
        "Password": hash,
      }
      fetch(URL + "/api/user", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (typeof data === "object") {
          document.cookie = "token =" + data.token + "; expires =Wed, 18 Dec 2030 12:00:00 UTC";
          window.location = "/home";
        }
      }).catch(function (data) {
      });
    }
  }

  togglePassword() {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  goToLogin() {
    window.location = '/login';
  }

  render() {
     if (getCookie("token")) {
      window.location = "/home";
     }
    document.addEventListener('DOMContentLoaded', () => {
      this.toggleNavbar();
    }, false);

    return (
      <div className="page-content-login">
        <div className="red-background">
          <div className="welcome-header">
          <img src={skietbaan} className="header-image" alt=''></img>
          </div>
          <div className="header-container">
            <label className="header-label">REGISTER</label>
            <button className="button-login" onClick={() => this.goToLogin()}>Login</button>
          </div>
        </div>
        <div className="centre-login">
          <Form className="form" autoComplete="off">

            <div className="spacing-login">
              <FormGroup>
                  <input
                    type="text"
                    name="usernameValue"
                    id="us"
                    value={this.state.usernameValue}
                    onChange={this.handleChange}
                    autoComplete="off"
                    className="input-user"
                    placeholder="Username"
                  />
                  <div className="error-message-container">
                    <div className={this.state.usernameTaken ? "error-message" : "hidden"} > Username already exists</div>
                    </div>
                
              </FormGroup>
            </div>
            <div className="spacing-login">
              <FormGroup>
                  <input
                    type="text"
                    name="emailValue"
                    id="email"
                    autoComplete="off"
                    value={this.state.emailValue}
                    onChange={this.handleChange}
                    className="input-user"
                    placeholder="Email"
                  />
                  <div className="error-message-container">
                <div className={this.state.emailTaken ? "error-message" : "hidden"} > Email address already in use</div>
                </div>
              </FormGroup>
            </div>
            <div className="spacing-login">
              <FormGroup>
                  <div className="input-label centre-div">
                    <input
                      type="text"
                      name="passwordValue"
                      id="passwordValue"
                      autoComplete="off"
                      value={this.state.passwordValue}
                      onChange={this.handleChange}
                      className={this.state.toggle ? "input-password-show": "input-password"}
                      placeholder="Password"
                    />
                    <div className={this.state.passwordValue !== "" ? "password-view-icon" : "password-icon"}
                      onClick={this.togglePassword}>
                    </div>

                  </div>
              </FormGroup>
            </div>
            <div className="button-container">
              <Button onClick={this.register} id="roundButton" className={this.state.validForm ? "round-button" :
                "buttons-invalid round-button"} >Join</Button>
            </div>
          </Form>
        </div>
      </div>
    );

  }
}

export default Register;

