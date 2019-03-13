import React, { Component } from 'react';
import '../components/RegisterMemberStyles.css';
import { BASE_URL } from '../actions/types.js';
import { getCookie } from '../components/cookie.js';

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
      expiryDate: "",
      clicked: false,
      hideButton: true
    }
    this.SearchMember = this.SearchMember.bind(this);
    this.SearchAllMember = this.SearchAllMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.GetDate = this.GetDate.bind(this);
    this.ChangeColor = this.ChangeColor.bind(this);
    this.HideCreateButton = this.HideCreateButton.bind(this);
    this.BackToCreate = this.BackToCreate.bind(this);
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
    let entDate = document.getElementById("expdate").value.split('/');
    let newDate = parseInt(entDate[0], 10) + 1;
    document.getElementById("expdate").value = newDate + "-" + entDate[1] + "-" + entDate[2];
  }

  SearchAllMember() {
    this.setState({
      clicked: false
    });
    fetch(BASE_URL + "/api/User", {
      method: 'Get',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        return data;
      }).then(data => this.setState({
        arrayUsers: data.filter(function (datas) {
          if(document.getElementById("usernameValue").value === null 
            || document.getElementById("usernameValue").value === ""){
              return "";
            }else{
              return (datas.username.toLowerCase().startsWith(document.getElementById("usernameValue").value.toLocaleLowerCase())
                || datas.email.toLowerCase().startsWith(document.getElementById("usernameValue").value.toLocaleLowerCase()))
          }
        })
      }))
      .catch(function () { });
  }

  SearchMember(user) {
    this.setState({
      clicked: true,
      hideButton: false
    });
    let name = this.state.arrayUsers[user].username;
    fetch(BASE_URL + "/api/Features/Search?Username=" + name, {
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
      .catch(function () { console.log("Failed") });
  }

  UpdateMember() {
    let RequestObject = {
      "username": document.getElementById("usernameValue").value,
      "memberID": document.getElementById("membershipID").value,
      "memberExpiryDate": document.getElementById("expdate").value + "T00:00:00"
    }
    fetch(BASE_URL + "/api/Features/Update", {
      method: 'Post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(RequestObject)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { })
      .catch(function (data) { });

      setTimeout(function () { window.location = "/viewMembers"; }, 2000);
  }

  GetDate() {
    let curr = new Date();
    curr.setDate(curr.getDate() + 365);
    let date = curr.toISOString().substr(0, 10);
    return date;
  }

  ChangeColor() {
    this.setState({
      clicked: "actives"
    });
  }

  HideCreateButton() {
    if (document.getElementById("membershipID").value === "") {
      this.setState({
        hideButton: true
      });
    }
    else {
      this.setState({
        hideButton: false
      });
    }
  }

  BackToCreate() {
    window.location = "/create";
  }

  render() {
    if(!getCookie("token")){
      window.location = "/registerPage";
      }
    const postItems = (
      <table striped hover condensed
        className="table-register-member">
        <tbody className="table-body-create-members">
          {this.state.arrayUsers.map((post, index) => (
            <tr className="register-member-user-column" key={post.id} 
                onClick={() => this.SearchMember(index)}>
              <td className={this.state.clicked ? "actives" : "register-member-user-column"} 
                onClick={() => this.ChangeColor()}>
                <b>{post.username}</b>
                <p>{post.email}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return (
      <div className="content-of-page">
        <div className="centre-register-member">
          <div className="page-name-create-members">
            <div className="image-comtainer">
              <img src={require('../components/assets/back-button-white.png')} onClick={this.BackToCreate}
                className="go-back-to-create-page-from-create-member" alt=''></img>
            </div>
            <div>
              <label className="create-members">Create Member</label>
            </div>
          </div>
          <div className="div-label-enter-user-name">
            <label className="label-enter-user-name">Enter Username</label>
          </div>
          <div className="input-container">
            <div className="search-name">
              <input
                autoComplete="off"
                type="text"
                className="username"
                id="usernameValue"
                value={this.state.usernamesValue}
                onChange={this.SearchAllMember} />
            </div>
            <div className="table-search-users">
              {this.SearchAllMember}
              {postItems}
            </div>
            <div className="rest-body">
              <div className="container-labels">
                <div className={this.state.hideButton ? "hide-membership-number":"membership-number"}>
                  <div className="input-spacing">
                    <label className="membership-id-number">Membership No.</label>
                    <div className="input-member-number">

                      <input
                        type="text"
                        className="membershipID"
                        id="membershipID"
                        value={this.state.membershipsID}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={this.state.hideButton ? "hide-expiry-date-member":"expiry-date-member"}>
                  <div className="input-spacing">
                    <label className="membership-expiry-date">Membership Expiry Date</label><br />
                    <input type="date" className="expdate" id="expdate"
                      value={this.GetDate()} onChange={this.handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="create-member">
              <button className={this.state.hideButton ? "hide-create-button" : "create-button"} onClick={this.UpdateMember} >CreateMember</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
