import React, { Component } from "react";
import "../components/Newsfeed.css";
import history from "./history";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { checkUserType } from "../actions/adminAction";
import { selectedPage } from "../actions/postActions";
import { pageState } from '../actions/postActions';
import { fetchNumberOfNotification } from "../actions/notificationAction";
import backButton from "../components/assets/back-button-white.png";
import skietbaanLogo from "../components/assets/skietbaanLogo.png";
import downArrow from "../components/assets/downArrow.png";
import memberIcon from "../components/Notification-Img/confirmation.png";

class Newsfeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfNotifications: 0,
            pageType: "",
            token: getCookie("token")
        };
        this.GoTo = this.GoTo.bind(this);
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
        this.props.selectedPage(4);
    }

    render() {
        let aboveMembers = []
        aboveMembers.push(
            <div className="above-members-container padding-top-80">
                <img src={skietbaanLogo} className="newsfeed-skietbaan-logo" alt="skietbaan"></img>
                <div className="label-container-welcome-text">
                    <label className="newsfeed-welcome-text"> Welcome to our new members this month. </label>
                </div>
                <img src={downArrow} className="newsfeed-down-arrow" alt="down-arrow"></img>
            </div>
        )
        let newMembersContainer = []
        newMembersContainer.push(
            <div className="newsfeed-new-member-container">
                <div className="circle-member-icon">
                    <img src={memberIcon} className="newsfeed-member-icon"></img>
                </div>
                <div className="newsfeed-username-container">
                    <label className="newsfeed-username">Shareece Doe</label>
                </div>
            </div>
        )

        return (
            <div className="page-content-scores-page">
                <Row className="row justify-content-center">
                    <Col sm={8} className="createpage-bootstrap-col-center-container">
                        <div className="score-capture-header">
                            <div className="gun-overlay-image">
                                <img src={backButton} className="newsfeed-back-button"
                                    onClick={() => this.GoTo("/more")} alt="back-button"></img>
                                <div className="label-for-newsfeed">NEWSFEED</div>
                            </div>
                        </div>
                        {aboveMembers}
                        {newMembersContainer}
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
    {
        checkUserType, fetchNumberOfNotification, pageState, selectedPage,
    }
)(Newsfeed);