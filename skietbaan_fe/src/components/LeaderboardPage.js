import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchleaderboadfilterdata } from '../actions/postActions';
import { fetchleaderboadtabledata } from '../actions/postActions';
import { Collapse } from 'react-collapse';
import { Table } from "react-bootstrap";
import { getCookie } from './cookie.js'
import { MDBBtn, MDBIcon } from "mdbreact";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

import '../bootstrap/LeaderboardStyle.css';
/* import '../bootstrap/NavbarMenuStyle.css'; */
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
        console.log("displaying tokken")
        console.log(token);
        const filterSelection = {
            selectedCompetition: this.state.selectedGroup,
            selectedGroups: this.state.selectedCompetition,
            selectedScoreType: this.state.selectedScoreType,
            userToken: token
        }
        this.props.fetchleaderboadtabledata(filterSelection);
        console.log("filter selection");
        console.log(filterSelection);
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
        //this.getLeaderboardData();
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
        console.log("index -->");
        console.log(index);
        if (this.props.tableData[index].showMore) {
            this.props.tableData[index].showMore = false;
        } else {
            this.props.tableData[index].showMore = true;
        }
        console.log("show collapse: " + this.props.tableData[index].showMore);
    }
    onMouseClickFilter() {
        console.log("before: " + this.state.collapseFilter)
        if (this.state.collapseFilter) {
            this.setState({
                collapseFilter: false
            });
        } else {
            this.setState({
                collapseFilter: true
            });
        }
        console.log("after: " + this.state.collapseFilter)
    }
    print() {
        console.log("clicked on list");
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
        const moreScores = (
            <Table striped hover condensed>
                <tbody>
                    <tr>
                        <td>Total</td><td>Average</td><td>Average</td><td>Best</td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        {/* <td>{this.props.tablebody[this.selectedRank].To == total}</td><td>{this.props.tablebody[this.selectedRank].average}}</td><td>{this.props.tablebody[this.selectedRank].bestScore}}</td> */}
                    </tr>
                </thead>
            </Table>
        )

        const tablebody = this.props.tableData.map((post, index) => (
            <tr key={post.rank.toString()} value={post.rank} onChange={() => this.onChange(post.id)}>
                <td className="firstcoll">{post.rank}</td>
                <td >{post.username}</td>
                {/* <td><MDBBtn tag="a" size="lg" floating gradient="black" 
                    onClick={() => this.showMoreScores(index)} >
                    <MDBIcon icon="filter" size="sm" />
                </MDBBtn>
                </td> */}
                {/* <td >{this.displayScoreByType(post)}</td> */}
                <td >{post.average}</td>
                <td >{post.bestScore}</td>
                <td >{post.total}</td>
            </tr>

        ));
        console.log("Table body : ", tablebody)
        console.log("checking competitions array")
        return (
            <div className="leaderboardContainer">
                <div className="row justify-content-center">
                    <div className="competitionSelction">
                        <h2> {this.props.competitions.length > 0 ? this.props.competitions[this.state.selectedCompetition].label : null}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="filterSection">
                        <div className="">
                            <table className="filterTableAlwaysVisible">
                                <thead>
                                    <tr>
                                        <td>
                                            {/*  <Fragment> */}
                                            <MDBBtn tag="a" size="lg" floating gradient="purple" /* onMouseEnter={this.onHover} */
                                                onClick={this.onMouseClickFilter} >
                                                <MDBIcon icon="filter" size="lg" />
                                            </MDBBtn>
                                            {/* </Fragment> */}
                                        </td>
                                        <td>{this.props.groups.length > 0 ? this.props.groups[this.state.selectedGroup].label : null}</td>
                                        {/*  <td>{this.props.scoreTypes[this.state.selectedScoreType].label}</td> */}
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
                                        {/* <div className="col-sm-4">
                                            <p>Select scoreType</p>
                                            <div className="scrollableContainerS">
                                                {scoretypesList}
                                            </div>
                                        </div> */}
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
                                <td className="firstcoll">Rank</td><td></td> <td>Avg</td><td>Best</td><td>Total</td>
                            </tr>
                        </thead>
                        {/* <thead>
                            <tr>
                                <Collapse isOpened={this.state.displayMore}>{moreScores}</Collapse>
                            </tr>

                        </thead> */}
                        <tbody>
                            {tablebody}
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="row">
                <div className="curentMember">
                    <table className="table">
                        <thead>
                            <tr className="filters">
                                <td className="firstcoll">{this.props.userResults.username.length > 0 ? this.props.userResults.rank : null}</td>
                                <td >{this.props.userResults.username.length > 0 ? this.props.userResults.username : null}</td>
                                {/* <td><MDBBtn tag="a" size="lg" floating gradient="black" 
                                    onClick={() => this.showMoreScores(-1)} >
                                    <MDBIcon icon="filter" size="sm" />
                                </MDBBtn>
                                </td>
                                <td >{this.props.userResults.username.length > 0 ? this.displayScoreByType(this.props.userResults) : null}</td> */}
                                <td >{this.props.userResults.username.length > 0 ? this.props.userResults.average : null}</td>
                                <td >{this.props.userResults.username.length > 0 ? this.props.userResults.bestScore : null}</td>
                                <td >{this.props.userResults.username.length > 0 ? this.props.userResults.total : null}</td>
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
