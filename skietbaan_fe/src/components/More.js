import React, { Component } from "react";
import "../components/More.css";
import history from "./history";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { checkUserType } from "../actions/adminAction";
import { selectedPage } from "../actions/postActions";
import { pageState } from '../actions/postActions';
import newsfeed from "../components/navbar-icons/newsfeed.png";
import notifications from "../components/navbar-icons/notifications.png";
import messenger from "../components/navbar-icons/messenger.png";
import { fetchNumberOfNotification } from "../actions/notificationAction";

class More extends Component {
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
        return (
            <div className="page-content-scores-page">
                <Row className="row justify-content-center">
                    <Col sm={8} className="createpage-bootstrap-col-center-container">
                        <div className="score-capture-header">
                            <div className="gun-overlay-image">
                                <div className="label-for-score">MORE</div>
                            </div>
                        </div>

                        <div className="padding-top-100"></div>
                        <div className="more-border-line"></div>
                        <div className="more-image-container">
                            <img src={newsfeed} className="more-image"></img>
                            <label className="more-label">NEWSFEED</label>
                        </div>
                        <div className="more-border-line"></div>
                        <div className="more-image-container" onClick={() => this.GoTo("/notify")}>
                            <img src={notifications} className="more-image"></img>
                            <label className="more-label">NOTIFICATIONS</label>
                        </div>
                        <div className="more-border-line"></div>
                        <div className="more-image-container">
                            <img src={messenger} className="more-image"></img>
                            <label className="more-label">MESSENGER</label>
                        </div>
                        <div className="more-border-line"></div>
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
)(More);