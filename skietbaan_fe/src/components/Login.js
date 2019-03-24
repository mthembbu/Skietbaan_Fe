import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  Form
} from 'reactstrap';
import '../components/RegisterStyles.css';
import { validateUsername, validateEmail } from './Validators.js';
import { getCookie } from './cookie.js';
import { URL } from '../actions/types.js';
import back from '../components/assets/Back.png';
import skietbaan from '../components/assets/skietbaanLogo.png';
import history from "./history";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: "",
      validForm: false,
      tokenValue: "",
      users: [],
      passwordFound: true,
      usernameFound: true,
      toggle: false
    }
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
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
    this.disableButton()
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
    this.disableButton();
    let isValid = false;
    let stateUpdate = {
      invalidPassword: this.state.invalidPassword,
      invalidUsername: this.state.invalidUsername,
      usernameFound: true,
      passwordFound: true
    }
    if (target.name === "passwordValue") {
      if (target.value.length > 0)
        stateUpdate.invalidPassword = false;
      else {
        stateUpdate.invalidPassword = true;
      }
    }
    if (target.name === "usernameValue") {
      if (target.value.length > 0)
        stateUpdate.invalidUsername = false;
      else {
        stateUpdate.invalidUsername = true;
      }
    }

    if (this.state.usernameValue
      && this.state.passwordValue
      && !stateUpdate.invalidUsername
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
      invalidUsername: false
    }
    if (this.state.passwordValue.length === 0) {
      stateUpdate.invalidPassword = true;
      isValid = false;
    };
    if (validateUsername(this.state.usernameValue)) {
      stateUpdate.invalidUsername = true;
      isValid = false;
    };
    this.setState({
      ...stateUpdate,
      validForm: isValid
    });
  }

  login() {
    this.validate();
    if (this.state.validForm) {
      let sha1 = require('sha1');
      let hash = sha1(this.state.passwordValue);
      let RequestObject = "";
      if (validateEmail(this.state.usernameValue) === true) {
        RequestObject = {
          "Email": this.state.usernameValue,
          "Password": hash,
        }
      } else {
        RequestObject = {
          "Username": this.state.usernameValue,
          "Password": hash,
        }
      }
      fetch(URL + "/api/features/login", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(response => response.json()).then(data => {
        if (typeof data === "object") {
          document.cookie = "token =" + data.token + "; expires =Wed, 18 Dec 2030 12:00:00 UTC";
          window.location = "/home"
        }

        else if (typeof data === "string") {
          if (data.indexOf("Invalid Password") > -1) {
            this.setState({
              invalidPassword: true,
              passwordFound: false,

            });
          }
          if (data.indexOf("not found") > -1) {
            this.setState({
              invalidUsername: true,
              usernameFound: false
            })
          }
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

  goToRegister() {
    history.push("/registerPage");
  }

  render() {
    document.addEventListener('DOMContentLoaded', () => {
      this.toggleNavbar();

    }, false);
    if (getCookie("token")) {
      window.loction = "/home";
    }

    return (
      <div className="page-content-login">
        <div className="red-background">
          <div className="welcome-header">
            <img src={skietbaan} className="header-image" alt=''></img>
          </div>
          <div className="header-container">
            <div className="centre-label">
              <label className="header-label">LOGIN</label>
            </div>
            <img src={back}
              alt="back button"
              className="back-btn"
              onClick={() => this.goToRegister()}></img>
          </div>
        </div>
        <div className="centre-login">
          <Form className="form" autoComplete="off">

            <div className="spacing-login">
              <FormGroup>
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
                    className={this.state.toggle ? "input-password-show" : "input-password"}
                    placeholder="Password"
                  />
                  <div className={this.state.passwordValue !== "" ? "password-view-icon" : "password-icon"}
                    onClick={this.togglePassword} name="eye">
                  </div>
                </div>
                <div className="error-message-container">
                  <div className={this.state.passwordFound
                    && this.passwordValue !== ""
                    && this.state.usernameFound
                    && this.usernameValue !== ""
                    ? "hidden" : "error-message"}>Invalid Username or Password</div>
                </div>
              </FormGroup>
            </div>
            <div className="button-container">
              <Button onClick={this.login} id="roundButton" className={this.state.validForm ? "round-button"
                : "buttons-invalid round-button"} >Login</Button>
            </div>
            <div className="login-href">
              <a href="/forgotPassword" >Forgot Password?</a>
            </div>
          </Form>

        </div >
      </div>

    );
  }
}

export default Login;