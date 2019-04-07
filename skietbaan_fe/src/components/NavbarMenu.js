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
      nav: null,
      numberOfNotifications: 0,
      isHome: true,
      isCreate: false,
      isAddScore: false,
      isnotify: false,
      isProfile: false,
      pageType: ""
    };

    this.isHome = this.isHome.bind(this);
    this.isCreate = this.isCreate.bind(this);
    this.isScoreCapture = this.isScoreCapture.bind(this);
    this.isProfile = this.isProfile.bind(this);
    this.isNotifications = this.isNotifications.bind(this);
    this.GoTo = this.GoTo.bind(this);
    this.checkUserType = this.checkUserType.bind(this);
    this.fetchNumberOfNotification = this.fetchNumberOfNotification.bind(this);
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
      .catch(err =>  {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  isHome() {
    if (window.location.pathname.endsWith("/home")) {
      return (
        <img
          src={NAV_BAR_ICONS.LEADERBOARD_RED}
          className="icon-same-dimensions"
          alt="Leaderboard tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.LEADERBOARD_GRAY}
          className="icon-same-dimensions"
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
      window.location.pathname.endsWith("/createComp") ||
      window.location.pathname.endsWith("/viewComp")
    ) {
      return (
        <img
          src={NAV_BAR_ICONS.CREATE_RED}
          className="icon-same-dimensions"
          alt="Create tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.CREATE_GRAY}
          className="icon-same-dimensions"
          alt="Create tab not Selected"
          onClick={() => this.GoTo("/create")}
        />
      );
    }
  }

  isScoreCapture() {
    if (window.location.pathname.endsWith("/scoreCapture")) {
      return (
        <img
          src={NAV_BAR_ICONS.SCORE_CAPTURE_RED}
          className="icon-same-dimensions"
          alt="ScoreCapture tab Selected"
        />
      );
    } else {
      return (
        <img
          src={NAV_BAR_ICONS.SCORE_CAPTURE_GRAY}
          className="icon-same-dimensions"
          alt="ScoreCapture tab not Selected"
          onClick={() => this.GoTo("/scoreCapture")}
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

  fetchNumberOfNotification() {
    const token = document.cookie;
    fetch(BASE_URL + "/api/Notification/GetNumberOfNotifications?" + token)
      .then(response => response.json())
      .then(data =>
        this.setState({
          numberOfNotifications: data
        })
      ).catch(err =>  {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      })
  }

  isNotifications() {
    if (this.state.pageType.endsWith("/notify")) {
      return (
        <img
          src={
            this.state.numberOfNotifications === 0
              ? NAV_BAR_ICONS.NOTIFICATIONS_RED
              : NAV_BAR_ICONS.NOTIFY_RED
          }
          className="notifications-icon-grey"
          alt="Notification tab Selected"
        />
      );
    } else {
      return (
        <img
          src={
            this.state.numberOfNotifications === 0
              ? NAV_BAR_ICONS.NOTIFICATIONS_GRAY
              : NAV_BAR_ICONS.NOTIFY_GREY
          }
          className="notifications-icon-grey"
          alt="Notification tab not Selected"
          onClick={() => this.GoTo("/notify")}
        />
      );
    }
  }

  GoTo(page) {
    this.setState({
      pageType: page
    });
    history.push(page);
  }

  componentDidMount() {
    this.fetchNumberOfNotification();
    this.checkUserType();
  }

  render() {
    return (
          <div className="nav-content">
            <table className="navbar-admin">
              <tbody>
                <tr className="first-row-navbar">
                  <td className="columns">{this.isHome()}</td>
                  <td className={this.state.nav  ? "columns" : "hideAdmin"}>{this.isCreate()}</td>
                  <td className="columns">{this.isScoreCapture()}</td>
                  <td className="columns">{this.isProfile()}</td>
                  <td className="columns">{this.isNotifications()}</td>
                </tr>
              </tbody>
            </table>
          </div>
    );
  }
}

export default NavbarMenu;
