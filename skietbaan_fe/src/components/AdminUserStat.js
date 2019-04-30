import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './AdminStat.css';
export class AdminUserStat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSelected: 0
        }
    }
    selectButtonUserStat = () => {
        this.setState({ buttonSelected: 0 })
    }
    selectButtonAdminStat = () => {
        this.setState({ buttonSelected: 1 })
    }
    render() {
        return (
            <div className="admin-stat-main-container">
                <div className="admin-stat-toddle-bar-container">
                    <div className="toddle-bar-bar">
                        <label className={this.state.buttonSelected === 0 ? "user-stat-label-active" : "user-stat-label"} onClick={() => this.selectButtonUserStat()} >USER STATS</label>
                        <label className={this.state.buttonSelected === 1 ? "admin-stat-as-user-active" : "admin-stat-as-user"} onClick={() => this.selectButtonAdminStat()}>SHOOTING STATS</label>
                    </div>
                </div>
                <div className="admin-new-user-container">
                    <div>
                        <div className="stat-number-of-new-users">50</div>
                        <div className="new-user-label">NEW USERS</div>
                    </div>
                    <div>
                        <div className="stat-number-of-new-member">50</div>
                        <div className="new-member-label">NEW</div>
                        <div>MEMBERS</div>
                    </div>
                </div>
                <div className="new-memeber-label">

                </div>
                <div className="admin-charts-container">
                    <label className="users-chart" />
                    <label className="users-chart" style={{ height: "20px" }} />
                    <label className="users-chart">
                        <label className="user-percentange"></label>
                    </label>
                </div>
                <div className="admin-total-users"></div>
                <div className="admin-dedicated-shooter-list">
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserStat)
