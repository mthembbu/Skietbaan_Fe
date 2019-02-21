import React, { Component } from 'react';
import { Container, Col,FormGroup, Label, Input, Button, Form} from 'reactstrap';
import '../components/RegisterStyles.css';
import {  validateUsername } from './Validators.js';
import { getCookie } from './cookie.js';
import {URL} from '../actions/types.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: "",
      validForm: false,
      tokenValue : "",
    }
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Validate = this.Validate.bind(this);

  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
    let isValid = true;
    let stateUpdate = {
      invalidPassword: this.state.invalidPassword,
      invalidUsername: this.state.invalidUsername
     }
    if (target.name === "passwordValue" ) {
      stateUpdate.invalidPassword= false;
    };
    if (target.name === "usernameValue" ) {
      stateUpdate.invalidUsername= false;
    };
    this.setState({
      ...stateUpdate ,
      validForm: isValid
    });
  };
  Validate()
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

  Login() {
    this.Validate();
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
        }
      }).catch(function(data) {
      });
    }
  }
  render() {
    if(getCookie("token")){
      window.location = "/home";
    }
    let invalidPasswordMessage;
    let invalidUsernameMessage;

    if (this.state.invalidPassword) {
      invalidPasswordMessage = <div className="invalid-message">Please choose a password</div>;
    }
    if (this.state.invalidUsername) {
      invalidUsernameMessage = <div className="invalid-message">Please enter your username</div>;
    }
    return (
      <Container className="App">
        <div className="centre-login">
          <Form className="form" autoComplete="off">
            <h2>Login</h2>
            <Col className="no-padding">
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="usernameValue"
                  id="us"
                  placeholder="username"
                  value={this.state.usernameValue}
                  onChange={this.handleChange}
                  className={this.state.invalidUsername ? "invalid" : ""}
                />
                {invalidUsernameMessage}
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
                <Label for="examplePassword">Password</Label>
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
            <Button onClick={this.Login} className={this.state.validForm ? "button-valid" : "button-invalid"} >Submit</Button>
          </Form>
          <div className="register-anchhor"> Not registered? <a href="/register-page">Register here</a></div> 
        </div >
      </Container>

    );
  }
}

export default App;
