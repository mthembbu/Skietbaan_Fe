import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import '../components/RegisterStyles.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      usernameValue : "",
      emailValue : "",
      passwordValue:"",
      invalid:false
    }
    this.showAlert = this.showAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postData = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
   postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }
  
  showAlert() {


    if(this.state.passwordValue === "" || this.state.passwordValue === null)
    this.setState({
      invalid : true
    });


    var RequestObject = {
        "Username":this.state.usernameValue,
        "Password":this.state.emailValue,
        "Surname":this.state.passwordValue
    }
    console.log(RequestObject);


     fetch('http://skietbaan.retrotest.co.za/api/User', {
     method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(RequestObject)
      }).then(function(response) {
        console.log('Created Gist:');
        return response.json();
      }).then(function(data) {
        console.log('Created Gist:', data.html_url);
      });
      }



  render() {
    return (
      <Container className="App">
        <div className="centre-register">
        <Form className="form">
        <h2>Register</h2>
          <Col className="no-padding">
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="usernameValue"
                id="username"
                placeholder="Username"
                value={ this.state.usernameValue }
                onChange={ this.handleChange }
              />
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
              />
            </FormGroup>
          </Col>

          <Col className="no-padding">
            <FormGroup>
              <Label for="MemberID">MemberID</Label>
              <Input
                type="memberID"
                name="memberValue"
                id="MemberID"
                placeholder="MemberID"
                value={ this.state.emailValue }
                onChange={ this.handleChange }
              />
            </FormGroup>
          </Col>

          <Col className="no-padding">
            <FormGroup>
              <Label for="EntryDate">EntryDate</Label>
              <Input
                type="entryDate"
                name="entryDateValue"
                id="EntryDate"
                placeholder="EntryDate"
                value={ this.state.emailValue }
                onChange={ this.handleChange }
              />
            </FormGroup>
          </Col>

          <Col className="no-padding">
            <FormGroup>
              <Label for="ExpireDateMember">ExpireDateMember</Label>
              <Input
                type="expireDate"
                name="expireDateValue"
                id="ExpireDateMember"
                placeholder="ExpireDateMember"
                value={ this.state.emailValue }
                onChange={ this.handleChange }
              />
            </FormGroup>
          </Col>

          <Col className="no-padding">
            <FormGroup>
              <Label for="Admin">Admin</Label>
              <Input
                type="admin"
                name="adminValue"
                id="Admin"
                placeholder="Admin"
                value={ this.state.emailValue }
                onChange={ this.handleChange }
              />
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
              />
            </FormGroup>
          </Col>
          <Button onClick={this.showAlert}>Submit</Button>
          </Form>
          </div >
      </Container>
    );
  }
}

export default App;