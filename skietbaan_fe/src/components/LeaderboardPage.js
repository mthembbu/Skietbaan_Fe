import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchleaderboadfilterdata } from '../actions/postActions';
import { fetchleaderboadtabledata } from '../actions/postActions';
import { Collapse } from 'react-collapse';
import { Table } from "react-bootstrap";
import { getCookie } from './cookie.js'
import { MDBBtn, MDBIcon } from "mdbreact";
import '../bootstrap/LeaderboardStyle.css';
import { runInThisContext } from 'vm';

class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ["name 1",
                "name 2",
                "name 3",
                "name 4",
                "name 5",
                "name 6",
                "name 7",],
            selectedGroup: "1",
            selectedCompetition: "1",
            selectedScoreType: "1",
            selectedRank: null,
            collapseFilter: false
        }
        this.setCompetitionValue = this.setCompetitionValue.bind(this);
        this.setGroupValue = this.setGroupValue.bind(this);
        this.setScoreTypeValue = this.setScoreTypeValue.bind(this);
        this.getLeaderboardData = this.getLeaderboardData.bind(this);
        this.onMouseClickFilter = this.onMouseClickFilter.bind(this);
        this.print = this.print.bind(this);
        this.displayScoreByType = this.displayScoreByType.bind(this);
        this.getCurentUserRankNumber = this.getCurentUserRankNumber.bind(this);
        this.showMoreScores = this.showMoreScores.bind(this);
    }
    //executed when leaderboard in mounted on main app
    componentWillMount() {
        //get function to get filter data from api
        this.props.fetchleaderboadfilterdata();
        this.getLeaderboardData();
    }
    getLeaderboardData() {
        let token = getCookie("token");
        const filterSelection = {
            selectedCompetition: this.state.selectedGroup,
            selectedGroups: this.state.selectedCompetition,
            selectedScoreType: this.state.selectedScoreType,
            userToken: token
        }
        this.props.fetchleaderboadtabledata(filterSelection);
    }

    setCompetitionValue = (value) => {
        this.setState({
            selectedCompetition: value
        })
        this.getLeaderboardData();
    }
    setGroupValue = (value) => {
        this.setState({
            selectedGroup: value
        });
        this.getLeaderboardData();
    }
    setScoreTypeValue = (value) => {
        this.setState({
            selectedScoreType: value
        });
    }
    displayScoreByType = (result) => {

        if (this.state.selectedScoreType == 0) {//average
            return result.average;
        } else if (this.state.selectedScoreType == 1) {//total
            return result.total;
        } else if (this.state.selectedScoreType == 2) {//best
            return result.bestScore;
        }
    }
    getCurentUserRankNumber(rankingList) {
        console.log(rankingList);
        if (rankingList != undefined) {
            for (var i = 0; i < rankingList.length; i++) {
                if (rankingList[i].username === this.props.userResults.username) {
                    return rankingList[i].rank;
                }
            }
            return null;
        } else {
            return null;
        }
    }
    showMoreScores(index) {
        if (this.props.tableData[index].showMore) {
            this.props.tableData[index].showMore = false;
        } else {
            this.props.tableData[index].showMore = true;
        }
    }
    onMouseClickFilter() {
        if (this.state.collapseFilter) {
            this.setState({
                collapseFilter: false
            });
        } else {
            this.setState({
                collapseFilter: true
            });
        }
    }
    render() {
        const groupsList = (
            <Table>
                <tbody>
                    {this.props.groups.map((group, index) => (
                        <tr key={group.value.toString()} onClick={() => this.setGroupValue(index)}
                            value={group.value}>
                            <td>{group.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )

        const competitionsList = (
            <Table striped hover condensed>
                <tbody>
                    {this.props.competitions.map((competition, index) => (
                        <tr key={competition.value.toString()} onClick={() => this.setCompetitionValue(index)}
                            value={competition.value}>
                            <td>{competition.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const scoretypesList = (
            <Table striped hover condensed>
                <tbody>
                    {this.props.scoreTypes.map((scoreType, index) => (
                        <tr key={scoreType.value.toString()} onClick={() => this.setScoreTypeValue(index)}
                            value={scoreType.value}>
                            <td>{scoreType.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const tablebody = this.props.tableData.map((post, index) => (
            <tr key={post.rank.toString()} value={post.rank} onChange={() => this.onChange(post.id)}>
                <td>
                    <table className="rankUsernameRowTable">
                        <tr>
                            <td className="rankingNumberCol"><h6>{post.rank}</h6></td><td className="usernameCol"><h6>{post.username}</h6></td>
                        </tr>
                    </table>
                    <table className="rankScoresRowTable">
                        <tr>
                            <td className="invisibleCol">rank</td><td><h5>{post.total}</h5></td><td><h5>{post.average}</h5></td><td><h5>{post.best}</h5></td>
                        </tr>
                    </table>
                    <hr />
                </td>
            </tr>

        ));
        return (
            <div className="leaderboardContainer">
                <div className="CompetitionName">
                    <div className="row justify-content-center">
                        <div className="competitionSelction">
                            <h2> {this.props.competitions.length > 0 ? this.props.competitions[this.state.selectedCompetition].label : null}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="filterSection">
                        <div>
                            <table className="filterTableAlwaysVisible">
                                <thead>
                                    <tr>
                                        <td>
                                            <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                onClick={this.onMouseClickFilter} >
                                                <MDBIcon icon="filter" size="lg" />
                                            </MDBBtn>
                                        </td>
                                        <td>{this.props.groups.length > 0 ? this.props.groups[this.state.selectedGroup].label : null}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="filterContent">
                            <Collapse isOpened={this.state.collapseFilter}>
                                <hr />
                                <div className="container text-center">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <p>Select Competition</p>
                                            <div className="scrollableContainerC">
                                                {competitionsList}
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <p>Select Group</p>
                                            <div className="scrollableContainerG">
                                                {groupsList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </Collapse>
 
                        </div>
                    </div>
                </div>
                <div className="row">

                    <table className="table">
                        <thead className="rankTableHead">
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td className="invisibleCol">rank</td><td className="invisibleCol">rank</td><td>Total</td><td>Average</td><td>Best</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <table className="rankTableBody">
                        <tbody>
                            {tablebody}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="curentMember">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>
                                        <table className="rankUsernameRowTable">
                                            <tr>
                                                <td className="rankingNumberCol">{this.props.userResults.username.length > 0 ? this.props.userResults.rank : null}</td><td className="usernameCol">{this.props.userResults.username.length > 0 ? this.props.userResults.username : null}</td>
                                            </tr>
                                        </table>
                                        <table className="rankScoresRowTable">
                                            <tr>
                                                <td className="invisibleCol">rank</td><td>{this.props.userResults.username.length > 0 ? this.props.userResults.total : null}</td><td>{this.props.userResults.username.length > 0 ? this.props.userResults.average : null}</td><td>{this.props.userResults.username.length > 0 ? this.props.userResults.best : null}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    groups: state.posts.leaderboardGroups,
    competitions: state.posts.leaderboardCompetitions,
    scoreTypes: state.posts.leaderboardScoreTypes,
    userResults: state.posts.leaderboardUserData,
    tableData: state.posts.leaderboardTableData,
    selectedGroup: state.posts.leaderboardSelectedGroup,
    selectedCompetition: state.posts.leaderboardSelectedCompetition,
    selectedScoreType: state.posts.leaderboardSelectedScoreType
});
export default connect(mapStateToProps, { fetchleaderboadfilterdata, fetchleaderboadtabledata })(LeaderboardPage);
