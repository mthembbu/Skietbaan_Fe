import React, { Component } from "react";
import "../scss/navbar.css";
import "font-awesome/css/font-awesome.min.css";
import "../bootstrap/NavbarMenuUserStyles.css";
import { NAV_BAR_ICONS, BASE_URL } from "../actions/types.js";

class NavbarMenuUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      numberOfNotifications: 0
    };

    this.isHome = this.isHome.bind(this);
    this.isScoreCapture = this.isScoreCapture.bind(this);
    this.isProfile = this.isProfile.bind(this);
    this.isDocuments = this.isDocuments.bind(this);
    this.isNotifications = this.isNotifications.bind(this);
    this.expand = this.expand.bind(this);
    this.isMore = this.isMore.bind(this);
    this.GoTo = this.GoTo.bind(this);
  }

  expand() {
    this.setState({ expanded: !this.state.expanded });
  }

  componentWillMount() {
    const token = document.cookie;
    fetch(BASE_URL + "/api/Notification/GetNumberOfNotifications?" + token)
      .then(response => response.json())
      .then(data =>
        this.setState({
          numberOfNotifications: data
        })
      );
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
        />
      );
    }
  }

  isDocumentsv2() {
    if (window.location.pathname.endsWith("/documents")) {
      return (
        <img
          src={NAV_BAR_ICONS.DOCS_RED}
          className="docs-icon-grey-v2"
          alt="Document tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.DOCS_GRAY}
          className="docs-icon-grey-v2"
          alt="Document tab not Selected"
        />
      );
    }
  }

  isNotificationsv2() {
    if (window.location.pathname.endsWith("/notify")) {
      return (
        <img
          src={NAV_BAR_ICONS.NOTIFICATIONS_RED}
          className="notifications-icon-grey-v2"
          alt="Notification tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.NOTIFICATIONS_GRAY}
          className="notifications-icon-grey-v2"
          alt="Notification tab not Selected"
        />
      );
    }
  }

  isMore() {
    return (
      <img
        src={NAV_BAR_ICONS.MORE_GRAY}
        className="more-icon-grey"
        alt="More icon to expand tray"
      />
    );
  }

  GoTo(page) {
    window.location = page;
  }
  render() {
    // rendering the basic navbar within the render class
    return (
      <div>
        <table className="navbar-admin">
          <tbody>
            <tr className="first-row-navbar">
              <td className="columns" onClick={() => this.GoTo("/home")}>
                {this.isHome()}
              </td>
              <td
                className="columns"
                onClick={() => this.GoTo("/scorecapture")}
              >
                {this.isScoreCapture()}
              </td>
              <td className="columns" onClick={() => this.GoTo("/profile")}>
                {this.isProfile()}
              </td>
              <td className="columns-more" onClick={this.expand}>
                {this.isMore()}
              </td>
              <td
                className="columns-v2"
                onClick={() => this.GoTo("/documents")}
              >
                {this.isDocumentsv2()}
              </td>
              <td className="columns-v2" onClick={() => this.GoTo("notify")}>
                {this.isNotificationsv2()}
              </td>
            </tr>
            <tr
              className={
                this.state.expanded
                  ? "second-row-navbar expand"
                  : "second-row-navbar"
              }
            >
              <td className="columns" onClick={() => this.GoTo("/documents")}>
                {this.isDocuments()}
              </td>
              <td className="columns" onClick={() => this.GoTo("/notify")}>
                {this.isNotifications()}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default NavbarMenuUser;
