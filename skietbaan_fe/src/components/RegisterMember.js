import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import '../components/RegisterMemberStyles.css';

function validatePassword(str) {
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
    this.RegisterMember = this.RegisterMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      validForm: Valid
    });
  }

  RegisterMember() {
   if(this.state.validForm)
   {
    var RequestObject = {
        "Username":this.state.usernameValue,
        "Password":this.state.emailValue,
        "Surname":this.state.passwordValue
    }
    console.log(RequestObject);

      fetch('http://skietbaan.retrotest.co.za/api/User', {
      method: 'put',	
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
       }).catch(function() {
         console.log("error");
       });
       }	    
     }

  render() {
    let invalidUsernameMessage;

    if (this.state.invalidUsername) {
      invalidUsernameMessage = <div className="invalid-message">Please enter a Username</div>;
    } 

    return (
      <Container className="App">
        <div className="centre-registermember">
        <Form className="form">
        <h2>Membership Sign In</h2>
        <Col className="no-padding">
            <FormGroup>
              <Label><b>Username</b></Label>
              <Input
                type="text"
                name="usernameValue"
                id="username"
                placeholder="Username"
                value={ this.state.usernameValue }
                onChange={ this.handleChange }
              className={this.state.invalidUsername ? "invalid":""}
              />
              {invalidUsernameMessage}
            </FormGroup>
          </Col>
          <p></p>
          <p></p>
          <Button >Search</Button>
          <p></p>
          <p></p>
          <Col className="no-padding">
            <FormGroup>
              <Label><b>Email</b></Label>
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
          <Label><b>Member</b></Label>
            <div>
              <input type="checkbox" id="member" name="member" value="True"/>
              <Label for="member">Allow Membership</Label>
            </div>
          </Col>
          <p></p>
          <Col className="no-padding">
            <FormGroup>
              <Label><b>EntryDate</b></Label><br/>
              <input type="date" name="entrydate" id="entrydate"/>
            </FormGroup>
          </Col>
          <Col className="no-padding">
            <FormGroup>
              <Label><b>ExpireDateMember</b></Label><br/>
              <input type="date" name="expdate" id="expdate"/>
            </FormGroup>
          </Col>
          <Col className="no-padding">
          <Label><b>Admin</b></Label>
          <div>
              <input type="checkbox" id="admin" name="admin" value="True"/>
              <Label for="admin">Make Admin</Label>
            </div>
          </Col>
          <p></p>
          <p></p>
          <Button onClick={this.showAlert}>Submit</Button>
          </Form>
          </div >
      </Container>
    );
  }
}

export default App;