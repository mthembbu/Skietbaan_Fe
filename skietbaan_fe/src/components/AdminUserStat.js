import React, { Component } from 'react'
import { connect } from 'react-redux'
import { adminstat } from '../actions/postActions'
import PropTypes from "prop-types";
import StatPage from '../components/StatPage';
import StatisticsPage from "./StatisticsPage";
import './AdminStat.css';
export class AdminUserStat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSelected: 0
        }
    }
    componentDidMount() {
        this.props.adminstat();
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
                     {this.state.buttonSelected===0?<StatPage />:this.state.buttonSelected===1?<StatisticsPage />:null}
            </div>
        )
    }
}
AdminUserStat.propTypes = {
    groupDict: PropTypes.shape({
        Id: PropTypes.arrayOf(PropTypes.number),
        count: PropTypes.arrayOf(PropTypes.number)
    })
};

const mapStateToProps = (state) => ({
    adminstats: state.posts.adminstats
})

export default connect(mapStateToProps, { adminstat })(AdminUserStat)
