import React, { Component } from 'react';
import { Container, Col, FormGroup, Label, Input, Button, Form } from 'reactstrap';
import '../components/RegisterStyles.css';
import { validateEmail, validateUsername } from './Validators.js';
import { getCookie } from './cookie.js';
import { URL } from '../actions/types.js';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      emailValue: "",
      passwordValue: "",
      validForm: false,
      tokenValue: "",
    }
    this.Register = this.Register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Validate = this.Validate.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.ToggleNavbar = this.ToggleNavbar.bind(this);
    this.goToLogin = this.goToLogin.bind(this);

  }

  ToggleNavbar() {
    var Navbar = document.querySelector(".navbar-custom");
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
    console.log("here");
    let isValid = true;
    let stateUpdate = {
      invalidPassword: this.state.invalidPassword,
      invalidEmail: this.state.invalidEmail,
      invalidUsername: this.state.invalidUsername
    }
    if (target.name === "passwordValue") {
      stateUpdate.invalidPassword = false;
    };
    if (target.name === "emailValue" && !validateEmail(this.state.emailValue)) {
      stateUpdate.invalidEmail = false;
    };
    if (target.name === "usernameValue") {
      stateUpdate.invalidUsername = false;
    };
    this.setState({
      ...stateUpdate,
      validForm: isValid
    });
  };
  Validate() {
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
      validForm: isValid
    });
  }

  Register() {
    this.Validate();
    if (this.state.validForm) {
      let sha1 = require('sha1');
      let hash = sha1(this.state.passwordValue);
      let RequestObject = {
        "Username": this.state.usernameValue,
        "Email": this.state.emailValue,
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
    var x = document.getElementById("PasswordValue");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
  goToLogin() {
    window.location = "/Login"
  }

  render() {
    if (getCookie("token")) {
      window.location = "/home";
    }
    document.addEventListener('DOMContentLoaded', () => {
      this.ToggleNavbar();
   }, false);

    return (
      <div className="Page-content">
      <div className = "welcome-header"><label className="welcome-label">Welcome to skietbaan</label>
      <img src={require('../components/assets/bullet.png')}
                  className="bullet-button" alt=''></img></div>
      <div className="header-container">
      <label className = "header-label">Register</label>
      <button className="button-login">Login</button>
      </div>
        <div className="centre-login">
          <Form className="form" autoComplete="off">

            <Col className="no-padding">
              <FormGroup>
              <label className="front-white input-label">Username <div 
                className={this.state.invalidUsername ? "invalid-icon" :"hidden"}></div></label>
                
                <div className="input-container">
                <input
                  type="text"
                  name="usernameValue"
                  id="us"
                  value={this.state.usernameValue}
                  onChange={this.handleChange}
                  className= "input"
                />
                </div>
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
              <label className="front-white input-label">Email Address <div 
                className={this.state.invalidUsername ? "invalid-icon" :"hidden"}></div></label>
                <div className="input-container">
                <input
                  type="text"
                  name="emailValue"
                  id="email"
                  value={this.state.emailValue}
                  onChange={this.handleChange}
                  className= "input"
                />
                </div>
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
              <label className="front-white input-label" for="examplePassword">
                Password <div className={this.state.invalidPassword ? "invalid-icon":"hidden"}></div></label>
                <div className="input-container">
                <input
                  type="password"
                  name="passwordValue"
                  id="PasswordValue"
                  value={this.state.passwordValue}
                  onChange={this.handleChange}
                  onClick={this.togglePassword}
                  className= "input-Password"
                />
                </div>
              </FormGroup>
            </Col>
            <div className="button-container">
            <Button onClick={this.Register} className={this.state.validForm ? "round-button" : "buttons-invalid round-button"} >Join</Button>
            </div>
          </Form>
         </div>
         </div>
    );

  }
}

export default Register;
