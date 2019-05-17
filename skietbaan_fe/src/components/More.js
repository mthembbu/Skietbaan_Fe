import React, { Component } from "react";
import "../components/More.css";
import history from "./history";
import { getCookie } from "../components/cookie.js";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { checkUserType } from "../actions/adminAction";
import { selectedPage } from "../actions/postActions";
import { pageState } from '../actions/postActions';
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
                    </Col>
                </Row>
                <div className="padding-top-100"></div>
                    <div className="border-line"></div>
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