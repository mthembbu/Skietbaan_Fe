import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import './AdminStat.css';
import { adminstat } from '../actions/postActions'
export class StatPage extends Component {
    static propTypes = {
        prop: PropTypes
    }
    componentDidMount() {
        this.props.adminstat();
    }

    getBodyHeight() {
        return "57vh";
    }
    render() {
        return (
            <div className="stat-page-main-container" style={{ height: this.getBodyHeight() }}>
                <Row className="admin-new-user-container">
                    <Col className="admin-first-row-container">
                        <Row className="total-user-container">
                            <Col className="total-container-col">
                                <Row className="number-of-users-and-total-number-container">
                                    <Col className="total-number-label">
                                        {this.props.adminstats["total users"]}
                                    </Col>
                                </Row>
                                <Row className="total-number-text-cont">
                                    <Col className="total-number-text">
                                        TOTAL USERS
                            </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="new-user-percentage-container">
                            <Col className="number-of-the-incresing-container">
                                <Row className="left-col-container">
                                    <Col className="number-of-new-users">
                                        <div className="no-user">
                                            {this.props.adminstats["new user"]}
                                        </div>
                                        <div className="the-container-for-the-text">
                                            <div className="new-label">NEW</div>
                                            <div className="admin-user-label">USERS</div>
                                            <div className="this-month-label">THIS MONTH</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="percentang-of-the-increase-of-user">
                                +{this.props.adminstats["new user percentage"]}%
                    </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="admin-second-row">
                    <Col className="the-main-col">
                        <Row className="member-first-row">
                            <Col className="member-number-container">
                                <div className="member-label">{this.props.adminstats["total members"]}</div>
                                <div className="member-total-text">TOTAL MEMBERS</div>
                            </Col>
                        </Row>
                        <Row className="admin-member-row">
                            <Col className="admin-member-first-col">
                                <div className="number-of-new-members">
                                    {this.props.adminstats["new member"]}
                                </div>
                                <div className="new-member-text-container">
                                    <div className="member-new-text">NEW</div>
                                    <div className="members-member-text">MEMBERS</div>
                                    <div className="member-this-month">THIS MONTH</div>
                                </div>
                            </Col>
                            <Col className="admin-member-second-col">
                                +{this.props.adminstats["new member percentage"]}%
                    </Col>
                        </Row>
                        <Row className="admin-expiring-third-row">
                            <Col className="admin-expiring-first-col">
                                <div className="admin-number-of-expiring-users">{this.props.adminstats["expiring members"]}</div>
                                <div className="admin-expiring-member-container">
                                    EXPIRING
                                    MEMBERS
                            </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }
}

StatPage.propTypes = {
    groupDict: PropTypes.shape({
        Id: PropTypes.arrayOf(PropTypes.number),
        count: PropTypes.arrayOf(PropTypes.number)
    })
};

const mapStateToProps = (state) => ({
    adminstats: state.posts.adminstats,
    isAdmin: state.adminReducer.isAdmin
})

export default connect(mapStateToProps, { adminstat })(StatPage)
