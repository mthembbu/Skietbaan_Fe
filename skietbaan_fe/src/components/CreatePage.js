import React, { Component } from "react";
import "../scss/create-page.css";
import { getCookie } from "../components/cookie.js";
import { URL } from "../actions/types.js";
import history from "./history";
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToken: true
    };

    this.GoComps = this.GoComps.bind(this);
    this.GoMembers = this.GoMembers.bind(this);
    this.GoGroups = this.GoGroups.bind(this);
    this.ViewComps = this.ViewComps.bind(this);
    this.ViewMembers = this.ViewMembers.bind(this);
    this.ViewGroups = this.ViewGroups.bind(this);
  }

  GoComps() {
    history.push("/createComp");
  }

  GoMembers() {
    history.push("/registerMember");
  }

  GoGroups() {
    history.push("/AddGroup");
  }

  ViewComps() {
    history.push("/viewComp");
  }

  ViewMembers() {
    history.push("/viewMembers");
  }

  ViewGroups() {
    history.push("/ViewGroups");
  }

  componentDidMount() {
    let found = false;
    if (getCookie("token")) {
      let token = getCookie("token");
      fetch(URL + "/api/features/getuserbytoken/" + token, {
        method: "Get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(function(data) {
          if (data === undefined || data === null) {
            this.setState({
              isToken: true
            });
            found = true;
          }
        })
        .then(data => {
          if (data === undefined || data === null) {
            this.setState({
              isToken: true
            });
            found = true;
          }
        })
        .catch(function(data) {
          if (!getCookie("token") || found === false) {
            var res = document.cookie;
            var multiple = res.split(";");
            for (var i = 0; i < multiple.length; i++) {
              var key = multiple[i].split("=");
              document.cookie =
                key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
            window.location = "/registerPage";
          }
        });
    } else {
      window.location = "/registerPage";
    }
  }

  render() {
    return (
      <div className="create-page-container">
        <div class="page-name-create-page">
          <label className="create-menu-header">Create</label>
        </div>
        <div class="container centre">
          <div className="container-of-buttons">
            <div className="buttons-create">
              <div className="create-spacing">
                <button
                  className="button-create-competitions"
                  onClick={this.GoComps}
                >
                  Competitions
                </button>
              </div>
              <div className="create-spacing">
                <button
                  className="button-create-members"
                  onClick={this.GoMembers}
                >
                  Members
                </button>
              </div>
              <div className="create-spacing">
                <button
                  className="button-create-groups"
                  onClick={this.GoGroups}
                >
                  Groups
                </button>
              </div>
            </div>
            <div className="buttons-view">
              <div className="view-spacing">
                <button
                  className="button-view-competitions"
                  onClick={this.ViewComps}
                >
                  View
                </button>
              </div>
              <div className="view-spacing">
                <button
                  className="button-view-members"
                  onClick={this.ViewMembers}
                >
                  View
                </button>
              </div>
              <div className="view-spacing">
                <button
                  className="button-view-groups"
                  onClick={this.ViewGroups}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreatePage;
