import React, { Component } from 'react';
import { Container, Col,FormGroup, Label, Input, Button, Form} from 'reactstrap';
import '../components/LoginStyles.css';
import { validatePassword, validateEmail, validateUsername } from './Validators.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      emailValue: "",
      passwordValue: "",
      invalidPassword: false,
      invalidEmail: false,
      invalidUsername: false,
      validForm: false
    }
    this.Login = this.Login.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
      invalidPassword: false,
      invalidEmail: false,
      invalidUsername: false
    });
  let stateUpdate ={};
    var isValid = true;
    if (!validatePassword(this.state.passwordValue)) {
      this.setState({
        invalidPassword: true
      });
      isValid = false;
    }
    if (!validateEmail(this.state.emailValue)) {
      this.setState({
        invalidEmail: true
      });
      isValid = false;
    }
    if (validateUsername(this.state.usernameValue)) {
      this.setState({
        invalidUsername: true
      });
      isValid = false;
    }
    this.setState({
      validForm: isValid
    });
  }

  Login() {
    if (this.state.validForm) {
      var RequestObject = {
        "Username": this.state.usernameValue,
        "Password": this.state.emailValue,
        "Surname": this.state.passwordValue
      }
      const BASE_URL = 'http://skietbaan.retrotest.co.za/';
      fetch(`${BASE_URL}`,"/api/values", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(function(response) {
        return response.json();
      }).then( function(data) {
      }).catch(function() {
      });
    }
  }

  render() {
    let invalidPasswordMessage;
    let invalidEmailMessage;
    let invalidUsernameMessage;

    if (this.state.invalidPassword) {
      invalidPasswordMessage = <div className="invalid-message">Atleast one number and one letter and 6 characters</div>;
    }
    if (this.state.invalidEmail) {
      invalidEmailMessage = <div className="invalid-message">Invalid email</div>;
    }
    if (this.state.invalidUsername) {
      invalidUsernameMessage = <div className="invalid-message">Please enter your username</div>;
    }

    return (
      <Container className="App">
        <div className="centre-login">
          <Form className="form">
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
                <Label for="examplePassword">Email</Label>
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
            <Button onClick={this.Login} className={this.state.validForm ? "button-valid" : "button-invalid"}>Submit</Button>
          </Form>
        </div >
      </Container>

    );
  }
}

export default App;