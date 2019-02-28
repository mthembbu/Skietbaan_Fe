import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchleaderboadfilterdata } from '../actions/postActions';
import { fetchleaderboadtabledata } from '../actions/postActions';
import { Collapse } from 'react-collapse';
import { Table } from "react-bootstrap";
import Img from 'react-image'
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
        this.displayScoreByType = this.displayScoreByType.bind(this);
        this.getCurentUserRankNumber = this.getCurentUserRankNumber.bind(this);
        this.showMoreScores = this.showMoreScores.bind(this);
        this.top3Display = this.top3Display.bind(this);
        this.accuracyUpDisplay = this.accuracyUpDisplay.bind(this);
        this.accuracyDownDisplay = this.accuracyDownDisplay.bind(this);
        this.responsiveStyle = this.responsiveStyle.bind(this);
        this.closeMain = this.closeMain.bind(this);
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
    closeMain(isopen){
        if(isopen === true){
            return false;
        }else{
            return true;
        }
    }
    accuracyUpDisplay(show) {
        if (show) {
            return <img className="rankNumberIcon" src={require('../resources/accuracyUp.png')} />;
        } else {
            return null
        }
    }
    accuracyDownDisplay(show) {
        if (show) {
            return <img className="rankNumberIcon" src={require('../resources/accuracyDown.png')} />;
        } else {
            return null
        }
    }

    top3Display(object) {
        if (object.rank == 1 || object.rank == 2 || object.rank == 3) {
            return <div className="visibleStar">
                <img className="rankNumberIcon" src={require('../resources/Star.png')} />
                <div className="rankPading">{object.rank}</div>
            </div>
        } else {
            return <div className="invisibleStar">
                <label className="rankNumberIcon">{object.rank}</label>
            </div>
        }
    }
    responsiveStyle(phoneStyles, desktopStyles) {
        console.log("checking screen size")
        if (window.innerWidth < 600) {
            console.log("mobile")
            return phoneStyles;
        } else {
            console.log("desktop")
            return desktopStyles;
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
        var centerContainerStyles = {
            margin: 'auto',
            padding: '0%',
            height: '75%',
        }
        var centerRow = {
            height: '100% !important'
        }
        var footer = {
            margin: 'auto',
            padding: '0%',
        };
        var ranktableStyle = {
            height: '100% !important'
        }
        var pStyle = {
            margin: 'auto',
            paddingTop:'5%'
        }
        var rankingIn={
            fontWeight:'bolder'
        }

        const competitionsList = (
            <Table >
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
            <Table >
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

            <tr className="rankRows" key={post.rank.toString()} value={post.rank} onChange={() => this.onChange(post.id)}>
                <td colSpan="4">
                    <table>
                        <tr>
                            <td className="userNames" colSpan="1">{this.top3Display(post)}
                            </td>
                            <td className="userNames2" colSpan="3">
                                <div className="usernameContainer">{post.username}</div>
                            </td>
                        </tr>
                    </table>
                    <table className="rankingListTable">
                        <tr className="rowLast">
                            <td className="rankScoreList" colSpan="1"></td> 
                            <td className="rankScoreList" colSpan="1" >{post.total}</td>
                            <td className="rankScoreList2" colSpan="1" >{post.average}</td>
                            <td className="rankScoreList2" colSpan="1" >{post.best}</td>
                        </tr>
                    </table>
                    <table className="rowUnderline">
                        <tr>
                            <td colSpan="4">
                                <div className="Underline"></div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr >

        ));
        return (
            <div className="leaderboardContainer">
                <div className="CompetitionName">
                    <div className="row justify-content-center">
                        <div className="competitionSelction">
                            {this.props.competitions.length > 0 ? this.props.competitions[this.state.selectedCompetition].label : null}
                        </div>
                    </div>
                </div>
                <div className="col-sm-8 text-left" style={centerContainerStyles}>
                    <div className="centerContainerResponsive">
                        <Collapse isOpened={this.state.collapseFilter}>
                            <div className="row justify-content-center"                                     >
                                <table className="collapsedFilter">
                                    <tr>
                                        <td className="filterIconCOl" colSpan="1">
                                            <div className="tableIcons">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/filterback.png')} />
                                                </MDBBtn>
                                            </div>
                                        </td>
                                        <td colSpan="3">
                                            <div className="selectCompetition"> Select Competition</div>
                                        </td>
                                    </tr>
                                </table>
                                <div className="col-sm-8">
                                </div>
                                <div className="col-sm-8">
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="filterContent">
                                    <Collapse isOpened={this.state.collapseFilter}>
                                        <hr />
                                        <div className="container text-center">
                                            <div className="row justify-content-center" >
                                                <div className="col-sm-4">
                                                    <div className="scrollableContainerC">
                                                        {competitionsList}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <p style={pStyle}>Rankings in</p>

                                                    
                                                    <div className="scrollableContainerG">
                                                       <div className="row justify-content-center" style={rankingIn}>
                                                             Groups
                                                       </div>
                                                        {groupsList}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </Collapse>
                                </div>
                            </div>
                        </Collapse>
                        <Collapse isOpened={this.closeMain(this.state.collapseFilter)}>
                        <div className="row justify-content-center" style={ranktableStyle}>
                            <table className="table">
                                <thead >
                                    <tr>
                                        <td className="filterIconCOl" colSpan="1">
                                            <div className="tableIcons">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/filter.png')} />
                                                </MDBBtn>
                                            </div>
                                        </td>
                                        <td className="LabelsCol" colSpan="3">
                                            <div className="tableText">
                                                <table className="tableTextContainer">
                                                    <tr>
                                                        <td className="GroupLabelCol" colSpan="3">
                                                            {this.props.groups.length > 0 ? this.props.groups[this.state.selectedGroup].label : null}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="ScoreColLabel" colSpan="1">Total</td>
                                                        <td className="ScoreColLabel2" colSpan="1">Average</td>
                                                        <td className="ScoreColLabel2" colSpan="1">Best</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">

                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="rankTableBody">
                                    {tablebody}
                                </tbody>
                            </table>
                        </div>
                        </Collapse>
                    </div>
                </div>
                <Collapse isOpened={this.closeMain(this.state.collapseFilter)}>
                <div className="col-sm-8 text-left" style={footer}>
                    <div className="row justify-content-center">
                        <div className="curentMember">
                            <table className="table">
                                <tr className="rankRows">
                                    <td colSpan="4">
                                        <table>
                                            <tr>
                                                <td className="userNames" colSpan="1">
                                                    {this.top3Display(this.props.userResults.rank)}<div className="rankPading">{this.props.userResults.rank}</div>
                                                </td>
                                                <td className="userNames2" colSpan="3">
                                                    <div className="usernameContainer">{this.props.userResults.username}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <table className="rankingListTable">
                                            <tr className="rowLast">
                                                <td className="rankScoreList" colSpan="1"></td> 
                                                <td className="rankScoreList" colSpan="1" >{this.props.userResults.total}</td>
                                                <td className="rankScoreList2" colSpan="1" >{this.props.userResults.average}</td>
                                                <td className="rankScoreList2" colSpan="1" >{this.props.userResults.best}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr >

                            </table>
                        </div>
                    </div>
                </div>
                </Collapse>
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
