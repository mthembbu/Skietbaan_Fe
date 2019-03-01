import React, { Component } from 'react';
import { Col,FormGroup, Button, Form } from 'reactstrap';
import '../components/RegisterStyles.css';
import {  validateUsername } from './Validators.js';
import { getCookie } from './cookie.js';
import {URL} from '../actions/types.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: "",
      validForm: false,
      tokenValue : "",
    }
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
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
      invalidUsername: this.state.invalidUsername
     }
    if (target.name === "passwordValue" ) {
      stateUpdate.invalidPassword= false;
    }
    if (target.name === "usernameValue" ) {
      stateUpdate.invalidUsername= false;
      isValid = false;
    }
    if(this.state.usernameValue && this.state.passwordValue){
      isValid = true;
    }
    this.setState({
      ...stateUpdate ,
      validForm: isValid
    });
  };

  validate()
  {
    let isValid = true;
    let stateUpdate = {
      invalidPassword: false,
      invalidUsername: false
     }
    if (this.state.passwordValue.length === 0) {
      stateUpdate.invalidPassword= true;
      isValid = false;
    };
    if (validateUsername(this.state.usernameValue)) {
      stateUpdate.invalidUsername= true;
      isValid = false;
    };
    this.setState({
      ...stateUpdate ,
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
      fetch( URL +"/api/features/login", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(function(response) {
        return response.json();
      }).then( function(data) {
        if(typeof data === "object")
        {
          document.cookie = "token =" +data.token+"; expires =Wed, 18 Dec 2030 12:00:00 UTC";
          window.location = "/home";
        }
      }).catch(function(data) {
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

  render() {
    document.addEventListener('DOMContentLoaded', () => {
      this.toggleNavbar();
   }, false);
    if(getCookie("token")){
      window.location = "/home";
    }

    return (
      <div className="Page-content">
      <div className = "welcome-header"><label className="welcome-label">Welcome back to skietbaan</label></div>
      <div className="header-container">
      <label className = "header-label">Login</label>
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
                <label className="front-white input-label" for="examplePassword">
                Password <div className={this.state.invalidPassword ? "invalid-icon":"hidden"}></div></label>
                <div className="input-container">
                <div className="input-label centre-div">
                <input
                  type="password"
                  name="passwordValue"
                  id="passwordValue"
                  value={this.state.passwordValue}
                  onChange={this.handleChange}
                  className= "input-Password"
                />
                <div onClick={this.togglePassword} className="password-view-icon"></div>
                </div>
                </div>
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
