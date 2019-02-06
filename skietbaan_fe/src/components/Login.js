import React, { Component } from 'react';
import {
  Container, Col,
  FormGroup, Label, Input,Button,Form
} from 'reactstrap';
import '../components/LoginStyles.css';

  function validatePassword(str)
    {
      var re = /(?=.*\d)(?=.*[a-z]).{6,}/;
      return re.test(str);
    }

    function validateEmail(email) {
    var re = /.+@.+\..+/;
      return re.test(String(email).toLowerCase());
    }

    function validateUsername(username) {
      var re = /[a-zA-Z]/;
        return !re.test(String(username));
      }
    

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      usernameValue : "",
      emailValue : "",
      passwordValue:"",
      invalidPassword:false,
      invalidEmail:false,
      invalidUsername: false,
      validForm:false
    }
    this.showAlert = this.showAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postData = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
      invalidPassword:false,
      invalidEmail: false,
      invalidUsername: false
    });

    var Valid = true;
    if(!validatePassword(this.state.passwordValue))
    {
        this.setState({
          invalidPassword : true
        });
        Valid = false;
    }
    if(!validateEmail(this.state.emailValue))
    {
        this.setState({
          invalidEmail : true
        });
        Valid = false;
    }
    if(validateUsername(this.state.usernameValue))
    {
        this.setState({
          invalidUsername : true
        });
        Valid = false;
    }
    this.setState({
      validForm:Valid
    });
    
  }
   postData(url = ``, data = {}) {
      return fetch(url, {
          method: "POST", 
          mode: "cors", 
          cache: "no-cache", 
          credentials: "same-origin", 
          headers: {
              "Content-Type": "application/json",
          },
          redirect: "follow", 
          referrer: "no-referrer", 
          body: JSON.stringify(data), 
      })
      .then(response => response.json()); 
  }
  
  showAlert() {
    if(this.state.validForm)
    {
    var RequestObject = {
      "Username":this.state.usernameValue,
      "Password":this.state.emailValue,
      "Surname":this.state.passwordValue
    }
    console.log(RequestObject);

    fetch('http://skietbaan.retrotest.co.za/api/values', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(RequestObject)
      }).then(function(response) {
        console.log('Hit');
        return response.json();
      }).then(function(data) {
        console.log('Backend output', data);
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
                value={ this.state.usernameValue }
                onChange={ this.handleChange }
                className={this.state.invalidUsername ? "invalid":""}
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
                value={ this.state.emailValue }
                onChange={ this.handleChange }
                className={this.state.invalidEmail ? "invalid":""}
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
                value={ this.state.passwordValue }
                onChange={ this.handleChange }
                className={this.state.invalidPassword ? "invalid":""}
              />
              {invalidPasswordMessage}
            </FormGroup>
          </Col>
          <Button onClick={this.showAlert} className={this.state.validForm ? "button-valid":"button-invalid"}>Submit</Button>
          </Form>
          </div >
      </Container>
      
    );
  }
}

export default App;