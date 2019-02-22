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
  render() {
    if (getCookie("token")) {
      window.location = "/home";
    }
    let invalidPasswordMessage;
    let invalidEmailMessage;
    let invalidUsernameMessage;

    if (this.state.invalidPassword) {
      invalidPasswordMessage = <div className="invalid-message">Please choose a password</div>;
    }
    if (this.state.invalidEmail) {
      invalidEmailMessage = <div className="invalid-message">Invalid email</div>;
    }
    if (this.state.invalidUsername) {
      invalidUsernameMessage = <div className="invalid-message">Please enter your username</div>;
    }
    return (
      <Container className="App">
        <div className="header-container">
          <h2>Register</h2>
        </div>
        <div className="centre-login">
          <Form className="form" autoComplete="off">

            <Col className="no-padding">
              <FormGroup>
              <Label className="front-white"> Type <strong>Username</strong></Label>
              <Input
                  type="text"
                  name="usernameValue"
                  id="usernamerValue"
                  placeholder="Username"
                  value={this.state.usernameValue}
                  onChange={this.handleChange}
                  className={this.state.invalidUsername ? "invalid" : ""}
                />
                {invalidUsernameMessage}
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
              <Label className="front-white"> Type <strong>Email Address</strong></Label>
                <Input
                  type="email"
                  name="emailValue"
                  id="LoginEmail"
                  placeholder="Email"
                  value={this.state.emailValue}
                  onChange={this.handleChange}
                  className={this.state.invalidEmail ? "invalid" : ""}
                />
                {invalidEmailMessage}
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
              <Label className="front-white"> Type <strong>Password</strong></Label>
                <Input
                  type="password"
                  name="passwordValue"
                  id="examplePassword"
                  placeholder="********"
                  value={this.state.passwordValue}
                  onChange={this.handleChange}
                  className={this.state.invalidPassword ? "invalid" : ""}
                />
                {invalidPasswordMessage}
              </FormGroup>
            </Col>
            <div className="button-container">
            <Button onClick={this.Register} className={this.state.validForm ? "round-button" : "button-invalid round-button"} >Join</Button>
            </div>
          </Form>
          <div className="register-anchhor"> Already Registered? <a className="front-white" href="/login">Login here</a></div> 

        </div >
      </Container>

    );
  }
}

export default Register;
