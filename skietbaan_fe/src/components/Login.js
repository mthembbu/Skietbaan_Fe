import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  Button,
  Form
} from 'reactstrap';
import '../components/RegisterStyles.css';
import { validateUsername } from './Validators.js';
import { getCookie } from './cookie.js';
import { BASE_URL, URL } from '../actions/types.js';
import header from '../components/assets/header.png';
import back from '../components/assets/back.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: "",
      validForm: false,
      tokenValue: "",
      users: [],
      passwordFound: true
    }
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.goToRegister = this.goToRegister.bind(this);

  }

  componentDidMount() {
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
      })).then(function (data) {
        console.log(data);
      })
      .catch(function (data) {
        console.log("error")
      });
    console.log(this.state.users);
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
      invalidUsername: this.state.invalidUsername,
      usernameFound: true,
      passwordFound: true
    }
    if (target.name === "passwordValue" && target.value.length > 0) {
      stateUpdate.invalidPassword = false;
    };
    if (target.name === "usernameValue") {
      stateUpdate.invalidUsername = true;
      for (var i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].username == target.value) {
          stateUpdate.usernameFound = true;
          stateUpdate.invalidUsername = false;
          break;
        }
        stateUpdate.usernameFound = false;
      }

    }
    if (this.state.usernameValue
      && this.state.passwordValue
      && !stateUpdate.invalidUsername) {
      isValid = true;
    }
    this.setState({
      ...stateUpdate,
      validForm: isValid
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
      let RequestObject = {
        "Username": this.state.usernameValue,
        "Password": hash,
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
          window.location = "/home";
        }
        else if (typeof data === "string" && data.indexOf("Invalid Password") > -1) {
          this.setState({
            invalidPassword: true,
            passwordFound:false
          });
        }
      }).catch(function (data) {
      });
    }
  }

  togglePassword() {
    let password = document.getElementById("passwordValue");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }

  goToRegister() {
    window.location = "/Register-page"
  }

  render() {
    document.addEventListener('DOMContentLoaded', () => {
      this.toggleNavbar();
    }, false);
    if (getCookie("token")) {
      window.location = "/home";
    }

    return (
      <div className="page-content-login">
        <div className="red-background">
          <div className="welcome-header">
            <img src={header}
              className="header-image"></img>
          </div>
          <div className="header-container">
            <div className="centre-label">
              <label className="header-label">Login</label>
            </div>
            <img src={back}
              className="back-btn"
              onClick={() => this.goToRegister()}></img>
          </div>
        </div>
        <div className="centre-login">
          <Form className="form" autoComplete="off">

            <Col className="no-padding">
              <FormGroup>
                <label className="front-white input-label">Enter Username <div
                  className={this.state.invalidUsername ? "invalid-icon" : "hidden"}></div></label>

                <div className="input-container">
                  <input
                    type="text"
                    name="usernameValue"
                    id="us"
                    value={this.state.usernameValue}
                    onChange={this.handleChange}
                    className="input-user"
                  />
                </div>
                <div className={typeof this.state.usernameFound !== "undefined" 
                && !this.state.usernameFound ? "" : "hidden"} > Username not found</div>
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
                <label className="front-white input-label" for="examplePassword">
                  Password <div className={this.state.invalidPassword ? "invalid-icon" : "hidden"}></div></label>
                <div className="input-container">
                  <div className="input-label centre-div">
                    <input
                      type="password"
                      name="passwordValue"
                      id="passwordValue"
                      value={this.state.passwordValue}
                      onChange={this.handleChange}
                      className="input-Password"
                    />
                    <div className={this.state.passwordValue !== "" ? "password-view-icon" : "hidden"}
                      onClick={this.togglePassword}>
                    </div>
                  </div>
                </div>
                <div className={this.state.passwordFound 
                  && this.passwordValue !=="" ? "hidden":""}>Invalid Password</div>
              </FormGroup>
            </Col>
            <div className="button-container">
              <Button onClick={this.login} className={this.state.validForm ? "round-button"
                : "buttons-invalid round-button"} >Join</Button>
            </div>
          </Form>
        </div >
      </div>

    );
  }
}

export default Login;
