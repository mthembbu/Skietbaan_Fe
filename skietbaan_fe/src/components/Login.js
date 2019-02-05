import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import '../components/LoginStyles.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      usernameValue : "",
      emailValue : "",
      passwordValue:""
    }
    this.showAlert = this.showAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }
  
  showAlert() {
    console.log(this.state.usernameValue);
    console.log(this.state.emailValue);
    console.log(this.state.passwordValue);
  }



  render() {
    return (
      <Container className="App">
        <div className="centre-login">
        <Form className="form">
        <h2>Login</h2>
          <Col className="no-padding">
            <FormGroup>
              <Label>UserName</Label>
              <Input
                type="text"
                name="usernameValue"
                id="us"
                placeholder="username"
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