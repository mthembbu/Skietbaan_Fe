import React, { Component } from "react";
import "./Create.css";
import { getCookie } from "../components/cookie.js";
import { URL } from "../actions/types.js";
import history from "./history";
import RegisterMember from '../components/RegisterMember';
import ViewMembers from '../components/ViewMembers';
import Button from '@material-ui/core/Button';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToken: true
    };
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
      <div className="create-container">
        <div class="page-name-create-all">
          <label className="create-all-menu-header">Create</label>
        </div>
        <div className="create-feature-buttons">
          <div className="create-all-btn1">
            <Button className="create-all-groups-btn">GROUPS</Button>
          </div>
          <div className="create-all-btn2">
            <Button className="create-all-competitions-btn">
              COMPETITIONS
            </Button>
          </div>
          <div className="create-all-btn3">
            <Button className="create-all-members-btn">MEMBERS</Button>
          </div>
        </div>
        
      </div>
    );
  }
}
export default Create;
