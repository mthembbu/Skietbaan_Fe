import React, { Component } from 'react';
import { Container, Label, Table } from 'reactstrap';
import '../components/RegisterMemberStyles.css';

function validateUsername(username) {
  const re = /[a-zA-Z]/;
  return !re.test(String(username));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
      usernameValue: "",
      membershipID: "",
      invalidUsername: false,
      validForm: false,
      entryDate: "",
      expiryDate: ""
    }
    this.SearchMember = this.SearchMember.bind(this);
    this.SearchAllMember = this.SearchAllMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.GetDate = this.GetDate.bind(this);
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

  dateChange() {
    let entDate = document.getElementById("entrydate").value.split('-');
    let newDate = parseInt(entDate[0], 10) + 1;
    document.getElementById("expdate").value = newDate + "-" + entDate[1] + "-" + entDate[2];
  }

  SearchAllMember() {
    fetch("http://localhost:63474/api/User", {
      method: 'Get',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        return data;
      }).then(data => this.setState({
        arrayUsers: data.filter(function (datas) {
          return (datas.username).startsWith(document.getElementById("usernameValue").value);
        })
      }))
      .catch(function () { });
  }

  SearchMember(user) {
    this.setState({
      usernameValue: user
    });
    let name = this.state.arrayUsers[user].username;
    fetch("http://localhost:63474/api/Features/Search?Username=" + name, {
      method: 'Get',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        document.getElementById("membershipID").value = data.memberID;
        document.getElementById("usernameValue").value = name;
        if (data.memberExpiryDate !== null) {
          document.getElementById("expdate").value = data.memberExpiryDate.substring(0, 10);
        }
      })
      .catch(function () { });
  }

  UpdateMember() {
    let RequestObject = {
      "username": document.getElementById("usernameValue").value,
      "memberID": document.getElementById("membershipID").value,
      "memberExpiryDate": document.getElementById("expdate").value + "T00:00:00"
    }
    fetch("http://localhost:63474/api/Features/Update", {
      method: 'Post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(RequestObject)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { })
      .catch(function (data) { });
  }

  GetDate() {
    let curr = new Date();
    curr.setDate(curr.getDate() + 365);
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  render() {
    const postItems = (
      <Table striped hover condensed
        className="table-member">
        <tbody>
          {this.state.arrayUsers.map((post, index) => (
            <tr key={post.id} onClick={() => this.SearchMember(index)}>
              <td >
                <b>{post.username}</b>
                <p>{post.email}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
    return (
      <Container className="App">
        <div className="centre-register-member">
          <div className="page-name">
            <h2>Create Member</h2>
          </div>
          <div className="search-name">
            <input
              type="text"
              className="usernameValue"
              id="usernameValue"
              placeholder="Search By Username"
              value={this.state.usernamesValue}
              onChange={this.SearchAllMember} />
          </div>
          <div className="table-search-users">
            {this.SearchAllMember}
            {postItems}
          </div>
          <div className="rest-body">
            <div className="membership-number">
              <Label><b>Membership Number</b></Label>
              <div className="input-member-number">
                <input
                  type="text"
                  className="membershipID"
                  id="membershipID"
                  placeholder="Enter Membership Number"
                  value={this.state.membershipsID}
                  onChange={this.handleChange}
                />
              </div>
              <br />
            </div>
            <div className="expiry-date-member">
              <Label><b>Membership Expiry Date</b></Label><br />
              <input type="date" className="expdate" id="expdate" value={this.GetDate()} onChange={this.handleChange} />
              <br />
              <br />
              <br />
            </div>
            <div className="create-member">
              <button className="create-button" onClick={this.UpdateMember} >CreateMember</button>
            </div>
          </div>
        </div >
      </Container>
    );
  }
}

export default App;
