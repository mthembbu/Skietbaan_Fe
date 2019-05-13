import React, { Component } from "react";
import "../scss/navbar.css";
import "font-awesome/css/font-awesome.min.css";
import "../bootstrap/NavbarMenuStyle.css";
import history from "./history";
import { NAV_BAR_ICONS } from "../actions/types.js";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { checkUserType } from "../actions/adminAction";
import { pageState } from '../actions/postActions';
import { fetchNumberOfNotification } from "../actions/notificationAction";

class NavbarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfNotifications: 0,
      isHome: true,
      isCreate: false,
      isAddScore: false,
      isnotify: false,
      isProfile: false,
      pageType: "",
      token: getCookie("token")
    };

    this.isHome = this.isHome.bind(this);
    this.isCreate = this.isCreate.bind(this);
    this.isScoreCapture = this.isScoreCapture.bind(this);
    this.isProfile = this.isProfile.bind(this);
    this.isNotifications = this.isNotifications.bind(this);
    this.GoTo = this.GoTo.bind(this);
  }

  isHome() {
    if (this.props.navSelectedPage === 0) {
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
        />
      );
    }
  }

  isCreate() {
    if (this.props.navSelectedPage === 1) {
      return (
        <img
          src={NAV_BAR_ICONS.CREATE_RED}
          className="icon-same-dimensions"
          alt="Create tab Selected"
        />
      );
    } else {
      this.props.pageState(10);
      return (
        <img
          src={NAV_BAR_ICONS.CREATE_GRAY}
          className="icon-same-dimensions"
          alt="Create tab not Selected"
        />
      );
    }
  }

  isScoreCapture() {
    if (this.props.navSelectedPage === 2) {
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
        />
      );
    }
  }

  isProfile() {
    if (this.props.navSelectedPage === 3) {
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

  isNotifications() {
    if (this.props.navSelectedPage === 4) {
      return (
        <img
          src={
            this.props.numberOfNotifications === 0
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
            this.props.numberOfNotifications === 0
              ? NAV_BAR_ICONS.NOTIFICATIONS_GRAY
              : NAV_BAR_ICONS.NOTIFY_GREY
          }
          className="notifications-icon-grey"
          alt="Notification tab not Selected"
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
    this.props.fetchNumberOfNotification(this.state.token);
    this.props.checkUserType(this.state.token);
  }

  render() {
    return (
      <div className="nav-content">
        <Row className="row justify-content-center">
          <Col sm={8} className="navbar-bootstrap-col-center-container">
            <table className="navbar-admin">
              <tbody>
                <tr className="first-row-navbar">
                  <td className="columns" onClick={() => this.GoTo("/home")}>
                    {this.isHome()}
                  </td>
                  <td
                    className={this.props.isAdmin ? "columns" : "hideAdmin"}
                    onClick={() => this.GoTo("/create")}
                  >
                    {this.isCreate()}
                  </td>
                  <td className="columns" onClick={() => this.GoTo("/scoresPage")}>{this.isScoreCapture()} </td>
                  <td className="columns" onClick={() => this.GoTo("/profile")}>{this.isProfile()}</td>
                  <td className="columns" onClick={() => this.GoTo("/notify")}>{this.isNotifications()}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  navSelectedPage: state.posts.navSelectedPage,
  isAdmin: state.adminReducer.isAdmin,
  numberOfNotifications: state.notificationOBJ.numberOfNotifications
});

export default connect(
  mapStateToProps,
  { checkUserType, fetchNumberOfNotification ,pageState}
)(NavbarMenu);
