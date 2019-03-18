import React, { Component } from "react";
import "../scss/navbar.css";
import "font-awesome/css/font-awesome.min.css";
import "../bootstrap/NavbarMenuStyle.css";
import history from "./history";
import { NAV_BAR_ICONS } from "../actions/types.js";
import { BASE_URL } from "../actions/types.js";
import { getCookie } from "../components/cookie.js";

class NavbarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nav: null
    };

    this.isHome = this.isHome.bind(this);
    this.isCreate = this.isCreate.bind(this);
    this.isScoreCapture = this.isScoreCapture.bind(this);
    this.isProfile = this.isProfile.bind(this);
    this.isDocuments = this.isDocuments.bind(this);
    this.isNotifications = this.isNotifications.bind(this);
    this.GoTo = this.GoTo.bind(this);
    this.checkUserType = this.checkUserType.bind(this);
  }

  checkUserType() {
    let token = getCookie("token");
    fetch(BASE_URL + "/api/features/getuserbytoken/" + token, {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          nav: data.admin
        });
      })
      .catch(function(data) {});

    if (this.state.nav) {
      return (
        <div className="nav-content">
          <table className="navbar-admin">
            <tbody>
              <tr className="first-row-navbar">
                <td className="columns">
                  {this.isHome()}
                </td>
                <td className="columns">
                  {this.isCreate()}
                </td>
                <td
                  className="columns">
                  {this.isScoreCapture()}
                </td>
                <td className="columns">
                  {this.isProfile()}
                </td>
                <td className="columns">
                  {this.isNotifications()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="nav-content">
          <table className="navbar-admin">
            <tbody>
              <tr className="first-row-navbar">
                <td className="columns-v2">
                  {this.isHome()}
                </td>
                <td
                  className="columns-v2">
                  {this.isScoreCapture()}
                </td>
                <td className="columns-v2">
                  {this.isProfile()}
                </td>
                <td className="columns-v2">
                  {this.isNotifications()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

  isHome() {
    if (window.location.pathname.endsWith("/home")) {
      return (
        <img
          src={NAV_BAR_ICONS.LEADERBOARD_RED}
          className="leaderboard-icon-grey"
          alt="Leaderboard tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.LEADERBOARD_GRAY}
          className="leaderboard-icon-grey"
		  alt="Leaderboard tab not Selected"
		  onClick={() => this.GoTo("/home")}
        />
      );
    }
  }

  isCreate() {
    if (
      window.location.pathname.endsWith("/create") ||
      window.location.pathname.endsWith("/registerMember") ||
      window.location.pathname.endsWith("/viewMembers") ||
      window.location.pathname.endsWith("/create-comp") ||
      window.location.pathname.endsWith("/view-comp")
    ) {
      return (
        <img
          src={NAV_BAR_ICONS.CREATE_RED}
          className="create-icon-grey"
          alt="Create tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.CREATE_GRAY}
          className="create-icon-grey"
		  alt="Create tab not Selected"
		  onClick={() => this.GoTo("/create")}
        />
      );
    }
  }

  isScoreCapture() {
    if (window.location.pathname.endsWith("/scorecapture")) {
      return (
        <img
          src={NAV_BAR_ICONS.SCORE_CAPTURE_RED}
          className="add-score-icon-grey"
          alt="ScoreCapture tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.SCORE_CAPTURE_GRAY}
          className="add-score-icon-grey"
		  alt="ScoreCapture tab not Selected"
		  onClick={() => this.GoTo("/scorecapture")}
        />
      );
    }
  }

  isProfile() {
    if (window.location.pathname.endsWith("/profile")) {
      return (
        <img
          src={NAV_BAR_ICONS.PROFILE_RED}
          className="profile-icon-grey"
          alt="Profile tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.PROFILE_GRAY}
          className="profile-icon-grey"
		  alt="Profile tab not Selected"
		  onClick={() => this.GoTo("/profile")}
        />
      );
    }
  }

  isDocuments() {
    if (window.location.pathname.endsWith("/documents")) {
      return (
        <img
          src={NAV_BAR_ICONS.DOCS_RED}
          className="docs-icon-grey"
          alt="Document tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.DOCS_GRAY}
          className="docs-icon-grey"
          alt="Document tab not Selected"
        />
      );
    }
  }

  isNotifications() {
    if (window.location.pathname.endsWith("/notify")) {
      return (
        <img
          src={NAV_BAR_ICONS.NOTIFICATIONS_RED}
          className="notifications-icon-grey"
          alt="Notification tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.NOTIFICATIONS_GRAY}
          className="notifications-icon-grey"
		  alt="Notification tab not Selected"
		  onClick={() => this.GoTo("/notify")}
        />
      );
    }
  }

  GoTo(page) {
    history.push(page);
  }

  render() {
    return <div>{this.checkUserType()}</div>;
  }
}

export default NavbarMenu;
