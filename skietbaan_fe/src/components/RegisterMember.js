import React, { Component } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../components/RegisterMemberStyles.css';

function validateUsername(username) {
  const re = /[a-zA-Z]/;
  return !re.test(String(username));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      membershipID: "",
      invalidUsername: false,
      validForm: false,
      entryDate: "",
      expiryDate: ""
    }
    this.SearchMember = this.SearchMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
      invalidUsername: false,
    });
    var Valid = true;
    if (validateUsername(this.state.usernameValue)) {
      this.setState({
        invalidUsername: true
      });
      Valid = false;
    }
    this.setState({
      validForm: Valid
    });
  }

  SearchMember() {
    if (this.state.validForm) {
      fetch("https://api.skietbaan.retrotest.co.za/api/Features/Search?Username=" + this.state.usernameValue, {
        method: 'Get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      }).then(function (response) {
        return response.json();
      })
        .then(function (data) {
          document.getElementById("membershipID").value = data.memberID;
          let entDate = data.entryDate.split('T');
          let keepDate = data.entryDate.split('T');
          document.getElementById("entrydate").value = entDate[0];
          let dateNew = keepDate[0].split('-');
          let exDateYear = parseInt(dateNew[0], 10) + 1;
          document.getElementById("expdate").value = exDateYear + '-' + dateNew[1] + '-' + dateNew[2];
        })
        .catch(function () { });
    }
  }

  UpdateMember() {
    let RequestObject = {
      "username": document.getElementById("usernameValue").value,
      "memberID": document.getElementById("membershipID").value,
      "entryDate": document.getElementById("entrydate").value + "T00:00:00",
      "memberExpiry": document.getElementById("expdate").value + "T00:00:00"
    }
    fetch("https://api.skietbaan.retrotest.co.za/api/Features/User/Update", {
      method: 'Put',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(RequestObject)
    })
      .then(function (response) {
        return response.json();})
      .then(function (data) {})
      .catch(function (data) {});
  }

  render() {
    let invalidUsernameMessage;

    if (this.state.invalidUsername) {
      invalidUsernameMessage = <div className="invalid-message">Please enter a Username</div>;
    }

    return (
      <Container className="App">
        <div className="centre-register-member">
          <Form className="form">
            <Col>
              <h2>Membership Sign In</h2>
            </Col>
            <Col className="no-padding">
              <FormGroup>
                <Label><b>Username</b></Label>
                <Input
                  type="text"
                  name="usernameValue"
                  id="usernameValue"
                  placeholder="Username"
                  value={this.state.usernameValue}
                  onChange={this.handleChange}
                  className={this.state.invalidUsername ? "invalid" : ""}
                />
                {invalidUsernameMessage}
              </FormGroup>
            </Col>
            <Col>
              <Button onClick={this.SearchMember} className={this.state.validForm ? "button-valid" : "button-invalid"}>Search</Button>
            </Col>
            <br />
            <Col className="no-padding">
              <FormGroup>
                <Label><b>MemberID</b></Label>
                <Input
                  type="text"
                  name="membershipID"
                  id="membershipID"
                  placeholder="Enter Membership ID"
                  value={this.state.membershipID}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
                <Label><b>EntryDate</b></Label><br />
                <input type="date" name="entrydate" id="entrydate" value={this.state.entrysDate} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col className="no-padding">
              <FormGroup>
                <Label><b>ExpireDateMember</b></Label><br />
                <input type="date" name="expdate" id="expdate" value={this.state.expirysDate} onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <Button onClick={this.UpdateMember} >Submit</Button>
            </Col>
          </Form>
        </div >
      </Container>
    );
  }
}

export default App;
