import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchleaderboadfilterdata } from '../actions/postActions';
import { fetchleaderboadtabledata } from '../actions/postActions';
import { updateSelectedCompetition } from '../actions/postActions';
import { updateSelectedGroup } from '../actions/postActions';
import Collapsible from 'react-collapsible';
import { Collapse } from 'react-collapse';
import { Table } from "react-bootstrap";
import { getCookie } from './cookie.js'
import { MDBBtn } from "mdbreact";
import { Motion, spring } from "react-motion";
import '../bootstrap/LeaderboardStyle.css';

class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individual: "Individual Ranking",
            selectedGroup: -1,
            selectedCompetition: 1,
            selectedScoreType: 1,
            selectedRank: "total",
            collapseFilter: false,
            listType: 'competitions',
            height: window.innerHeight,
            width: window.innerWidth,
            ranktableHeight: 500
        }
        this.setCompetitionValue = this.setCompetitionValue.bind(this);
        this.setGroupValue = this.setGroupValue.bind(this);
        this.setSelectedRank = this.setSelectedRank.bind(this);
        this.setScoreTypeValue = this.setScoreTypeValue.bind(this);
        this.onMouseClickFilter = this.onMouseClickFilter.bind(this);
        this.getCurentUserRankNumber = this.getCurentUserRankNumber.bind(this);
        this.top3Display = this.top3Display.bind(this);
        this.closeMain = this.closeMain.bind(this);
        this.displaySelectedGroup = this.displaySelectedGroup.bind(this);
        this.setListType = this.setListType.bind(this);
        this.displayList = this.displayList.bind(this);
        this.validatedInitialLeaderboardFilterSelection = this.validatedInitialLeaderboardFilterSelection.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.checkFilterMobile = this.checkFilterMobile.bind(this);
        this.displayMember = this.displayMember.bind(this);
        this.displayCompetitive = this.displayCompetitive.bind(this);
        this.getRankTableHeight = this.getRankTableHeight.bind(this);
        this.getFilterTableHeight = this.getFilterTableHeight.bind(this);
        this.getclickableSpaceSize = this.getclickableSpaceSize.bind(this);
    }
    componentDidMount() {
        // Additionally I could have just used an arrow function for the binding `this` to the component...
        window.addEventListener("resize", this.updateDimensions);
    }
    //executed when leaderboard in mounted on main app
    componentWillMount() {
        this.updateDimensions();
        //get function to get filter data from api
        this.props.fetchleaderboadfilterdata();
        this.validatedInitialLeaderboardFilterSelection();
        this.getLeaderboardData(this.state.selectedCompetition, this.state.selectedGroup, this.state.selectedRank);
    }
    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
            ranktableHeightMobile: (this.state.height - 236),
            ranktableHeightDesktop: (this.state.height - (193 + 0))
        });
    }
    getLeaderboardData = (competition, group, rank) => {
        let token = getCookie("token");
        var CompNum = competition + 1;
        var GroupNum = group;
        if (group != -1) {
            GroupNum = group + 1;
        }
        const filterSelection = {
            selectedCompetition: CompNum,
            selectedGroup: GroupNum,
            selectedRank: rank,
            userToken: token
        }
        this.props.fetchleaderboadtabledata(filterSelection);
    }
    getclickableSpaceSize(){
        if(this.state.listType == "competitions"){ //if currently showing competitions list on filter screen
          return (46 * this.props.competitions.length) +10;
        }else{
          return (46 * this.props.groups.length) + 10;
        }
    }
    checkFilterMobile() {
        if (this.state.width < 575 && this.state.collapseFilter == false) {
            return true;
        } else if (this.state.width > 575) {
            return true;
        } else {
            return false;
        }
    }
    validatedInitialLeaderboardFilterSelection() {
        if (this.props.selectedCompetitionName != undefined && this.props.selectedGroupName != undefined) {
            if (this.props.selectedCompetitionName.length > 0) {
                for (var i = 0; i < this.props.competitions.length; i++) {
                    if (this.props.competitions[i] == this.props.selectedCompetitionName) {
                        this.setState({
                            selectedCompetition: i
                        });
                    }
                }
            }

            if (this.props.selectedGroupName.length > 0) {
                for (var i = 0; i < this.props.groups.length; i++) {
                    if (this.props.groups[i] == this.props.selectedGroupName) {
                        this.setState({
                            selectedGroup: i
                        });
                    }
                }
            }
        }
    }

    setCompetitionValue = (value) => {
        this.setState({
            selectedCompetition: value
        });
        this.props.updateSelectedCompetition(this.props.competitions[value].label)
        this.validatedInitialLeaderboardFilterSelection();
        this.getLeaderboardData(value, this.state.selectedGroup, this.state.selectedRank);
    }
    setGroupValue = (value) => {
        this.setState({
            selectedGroup: value
        });
        if (value == -1) {
            this.props.updateSelectedGroup(this.state.individual);
        } else {
            this.props.updateSelectedGroup(this.props.groups[value].label);
        }
        this.validatedInitialLeaderboardFilterSelection();
        this.getLeaderboardData(this.state.selectedCompetition, value, this.state.selectedRank);
    }
    setSelectedRank = (value) => {
        this.setState({
            selectedRank: value
        });
        this.getLeaderboardData(this.state.selectedCompetition, this.state.selectedGroup, value);
    }
    setScoreTypeValue = (value) => {
        this.setState({
            selectedScoreType: value
        });
    }
    displayMember = (isMember) => {
        if (isMember) {
            return <div className="member-container">
                <div className="status-icon"><img src={require('../resources/member.png')} /></div>
                <div className="label">Member</div>
            </div>
        } else {
            return <div className="member-container">
                <div className="status-icon"><img src={require('../resources/guest.png')} /></div>
                <div className="label">User</div>
            </div>
        }
    }
    displayCompetitive = (isCompetitive) => {
        if (isCompetitive) {
            return <div className="competitive-shooter-conatiner">
                <div className="status-icon"></div>
                <div className="label">Competition Shooter</div>
            </div>
        } else {
            return <div className="competitive-shooter-conatiner">
                <div className="status-icon"></div>
                <div className="label">Standard Shooter</div>
            </div>
        }
    }
    getRankTableHeight() {
        if (this.state.width < 575) {
            return (this.state.ranktableHeightMobile + 80);
        } else {
            return this.state.ranktableHeightMobile;
        }
    }
    getFilterTableHeight() {
        if (this.state.width < 575) {
            return ((this.state.height / 2) + -100);
        } else {
            return 315;
        }
    }
    getCurentUserRankNumber(rankingList) {
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
    closeMain(isopen) {
        if (isopen === true) {
            return false;
        } else {
            return true;
        }
    }
    displaySelectedGroup(value) {
        if (value == -1) {
            return this.state.individual;
        } else {
            if (this.props.competitions.length > 0) {
                return this.props.groups[this.state.selectedGroup].label;
            } else {
                return null;
            }
        }
    }
    setListType(type) {
        if (type === "competitions") {
            this.setState({
                listType: "competitions"
            })
        } else if (type === "groups") {
            this.setState({
                listType: "groups"
            })
        }
    }
    displayList(competitionsList, groupsList) {
        if (this.state.listType === "competitions") {
            return competitionsList;
        } else if (this.state.listType === "groups") {
            return groupsList;
        }
    }
    top3Display(object) {
        if (object != null) {
            if (object.rank == 1) {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">

                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                </td>
                            </tr>
                            <tr className="down-arrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else if (object.rank == 2) {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">

                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                </td>
                            </tr>
                            <tr className="down-arrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else if (object.rank == 3) {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">

                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                </td>
                            </tr>
                            <tr className="down-arrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else {
                return <div className="rank-number-container">
                    <table className="rank-num-table">
                        <tbody>
                            <tr className="up-arrow">
                                <td></td>
                            </tr>
                            <tr className="icon">
                                <td className="firstCol">
                                    {object.rank != 0 ? object.rank : '--'}
                                </td>
                            </tr>
                            <tr className="down-arrow">
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>;
            }
        } else {
            return null;
        }
    }
    render() {

        if (!getCookie("token")) {
            window.location = "/registerPage";
        }
        const groupsList = (
            <Table className="selection-table" >
                <tbody>
                    {this.props.groups.map((group, index) => (
                        <tr key={group.value.toString()} onClick={() => this.setGroupValue(index)}
                            value={group.value}>
                            <td className={this.state.selectedGroup == index ? "td-active" : "td-inactive"}>{group.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const competitionsList = (
            <Table className="selection-table" >
                <tbody>
                    {this.props.competitions.map((competition, index) => (
                        <tr key={competition.value.toString()} onClick={() => this.setCompetitionValue(index)}
                            value={competition.value}>
                            <td className={this.state.selectedCompetition == index ? "td-active" : "td-inactive"}>{competition.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const tablebody = this.props.tableData.map((post, index) => (
            <tr className="rank-row" key={index.toString()} value={index} onChange={() => this.onChange(post.id)}>
                <Collapsible trigger={<table className="user-details-table">
                    <tr className="user-details-row">
                        <td className="rank-icon-col">
                            <div className="rank-number-container">
                                <div className="member-status-icons">
                                    <div className="membership-icon">
                                        {post.isMember
                                            ? <img src={require('../resources/member.png')} />
                                            : null}
                                    </div>
                                    <div className="dedication-icon">
                                        {post.isCompetitiveShooter
                                            ? <img src={require('../resources/dedicatedShooter.png')} />
                                            : <img src={require('../resources/standardShooter.png')} />}
                                    </div>
                                </div>
                                <div className="member-rank-icons">
                                    <div className="up-arrow">
                                        <div className="up-arrow-icon">
                                        </div>
                                    </div>
                                    <div className="ranking">
                                        {post.rank > 3
                                            ? <div className="number">{post.rank}</div>
                                            : (post.rank === 1
                                                ? <img src={require('../resources/rank1.png')} />
                                                : (post.rank === 2
                                                    ? <img src={require('../resources/rank2.png')} />
                                                    : (post.rank === 3
                                                        ? <img src={require('../resources/rank3.png')} />
                                                        : null)))}
                                    </div>
                                    <div className="down-arrow">
                                        <div className="down-arrow-icon">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="rank-labels-col">
                            <table className="head-table-labels">
                                <tbody>
                                    <tr>
                                        <td className={(post.rank > 0 && post.rank < 4) ? "extra-name-col-top" : "extra-name-col"}><div>{post.displayName == null ? post.username : post.displayName}</div></td>
                                        <td className={this.state.selectedRank == "best" ? "score-col-active" : "score-col"}>{post.best != 0 ? post.best : '--'}</td>
                                        <td className={this.state.selectedRank == "average" ? "score-col-active" : "score-col"}>
                                            <div className="member-rank-icons">
                                                <div className="up-arrow">
                                                    <div className="up-arrow-icon">
                                                        {post.rankStatus === "up"
                                                            ? <img src={require('../resources/upArrow.png')} />
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className="ranking">
                                                    <div className="number">{post.average != 0 ? post.average : '--'}</div>
                                                </div>
                                                <div className="down-arrow">
                                                    <div className="down-arrow-icon">
                                                        {post.rankStatus === "down"
                                                            ? <img src={require('../resources/downArrow.png')} />
                                                            : null}
                                                    </div>
                                                </div>
                                            </div>

                                        </td>
                                        <td className={this.state.selectedRank == "total" ? "score-col-active" : "score-col"}>{post.total != 0 ? post.total : '--'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>}>
                </Collapsible>
                <div className="underline"></div>
            </tr>
        ));
        return (
            /* Leaderboard Page Main Container */
            <div className="leaderboard-container">
                <div className="row justify-content-center">
                    <div className="col-sm-8 text-left" style={{backgroundColor:"#F5F5F5"}}>
                        <div className="closed-filter-section">
                            <table className="filter-table1">
                                <tbody>
                                    <tr className="header-row1">
                                        <div className="competition-name-col">
                                            <div className="gun-icon">
                                                <Motion
                                                    defaultStyle={{ x: -200, opacity: 0 }}
                                                    style={{
                                                        x: spring(0),
                                                        opacity: spring(1)
                                                    }}>
                                                    {style => (
                                                        <div className="competition-name" style={{
                                                            transform: `translateX(${style.x}px)`,
                                                            opacity: style.opacity
                                                        }} >
                                                            {this.props.competitions.length != 0 ? this.props.competitions[this.state.selectedCompetition].label : "-------"}
                                                        </div>
                                                    )}
                                                </Motion>
                                            </div>
                                        </div>
                                        <td className="filter-icon-col">
                                            <div className="filter-icon">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/filter.png')} />
                                                </MDBBtn>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Collapse isOpened={this.state.collapseFilter}>
                            <div className="filter-selections" >
                                <div className="category-selection">
                                    <div className={this.state.listType == "competitions" ? "choose-comps-active" : "choose-comps"}  >
                                        <MDBBtn tag="a" size="lg" floating gradient="purple"
                                            onClick={() => this.setListType("competitions")} >
                                            COMPETITIONS
                                            </MDBBtn>
                                    </div>
                                    <div className={this.state.listType == "groups" ? "choose-groups-active" : "choose-groups"}>
                                        <MDBBtn tag="a" size="lg" floating gradient="purple"
                                            onClick={() => this.setListType("groups")} >
                                            RANKINGS BY
                                            </MDBBtn>
                                    </div>
                                </div>
                                <div className="cat-visible-label">
                                    {this.state.listType == "competitions" ? "Select Competition" : "Select Ranking"}
                                </div>
                                <div className={this.state.listType == "competitions" ? "hide-my-div" : (this.state.selectedGroup == -1 ? "individual-active" : "individual-inactive")}>
                                    <MDBBtn tag="a" size="lg" floating gradient="purple"
                                        onClick={() => this.setGroupValue(-1)} >
                                        Overall ranking
                                        </MDBBtn>
                                </div>
                                <div className={this.state.listType == "groups" ? "cat-visible-groups-label" : "hide-my-div"}>
                                    Groups
                                   </div>
                                <div className="selections-container" >
                                    <div className="row justify-content-center">
                                        <div className="choose" style={{ height: "fit-content", maxHeight: this.getFilterTableHeight() + "px" }}>
                                            <div className="left-choose" style={{ height: this.getclickableSpaceSize() + "px" }} onClick={this.onMouseClickFilter} >
                                            </div>
                                            {this.state.listType == "competitions" ? competitionsList : groupsList}
                                            <div className="right-choose" style={{ height: this.getclickableSpaceSize() + "px" }} onClick={this.onMouseClickFilter} >
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="closefilter" onClick={this.onMouseClickFilter} >
                                            <MDBBtn tag="a" size="lg" floating gradient="purple">
                                                <img src={require('../resources/closefilter.png')} />
                                            </MDBBtn>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="empty-div" onClick={this.onMouseClickFilter} >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <Collapse isOpened={this.checkFilterMobile()}>
                            <table className="ranking-table-head">
                                <tr className="header-row2">
                                    <td className="col-empty"></td>
                                    <Motion
                                        defaultStyle={{ x: -200, opacity: 0 }}
                                        style={{
                                            x: spring(0),
                                            opacity: spring(1)
                                        }}>
                                        {style => (
                                            <td colSpan="2" className="grouping-label-col" style={{
                                                transform: `translateX(${style.x}px)`,
                                                opacity: style.opacity
                                            }} >
                                                {this.state.selectedGroup == -1 ? "Overall rank" : (this.props.groups.length != 0 ? this.props.groups[this.state.selectedGroup].label : "-------")}
                                            </td>
                                        )}
                                    </Motion>
                                    <td colSpan="1" className={this.state.selectedRank == "best" ? "active-label-col" : "inactive-label-col"} onClick={() => this.setSelectedRank("best")}>
                                        Best
                                       </td>
                                    <td colSpan="1" className={this.state.selectedRank == "average" ? "active-label-col" : "inactive-label-col"} onClick={() => this.setSelectedRank("average")}>
                                        Average
                                        </td>
                                    <td colSpan="1" className={this.state.selectedRank == "total" ? "active-label-col" : "inactive-label-col"} onClick={() => this.setSelectedRank("total")}>
                                        Total
                                        </td>
                                </tr>
                            </table>
                            <div className="ranking-table-section" style={{ height: this.getRankTableHeight() + "px" }}>
                                <table className="ranking-table" >
                                    <tbody>
                                        {tablebody}
                                    </tbody>
                                </table>
                            </div>
                        </Collapse>
                    </div>
                </div>
                {/* Current User Section*/}
                <Motion defaultStyle={{ x: -200, opacity: 0 }}
                    style={{
                        x: spring(this.state.collapseFilter ? -400 : 0),
                        opacity: spring(this.state.collapseFilter ? 0 : 1, { stiffness: 6, damping: 6, precision: 0.1 })
                    }}>
                    {style => (<div className="userWrapper" style={{
                        transform: `translateX(${style.x}px)`,
                        opacity: style.opacity
                    }}>
                        <div className="row justify-content-center">
                            <div className="col-sm-8 text-left">
                                <div className="current-user-table-section">
                                    <table className="ranking-table">
                                        <thead>
                                            <tr className="rank-row">
                                                <table className="user-details-table">
                                                    <tr className="user-details-row">
                                                        <td className="rank-icon-col">
                                                            <div className="rank-number-container">
                                                                <div className="member-status-icons">
                                                                    <div className="membership-icon">
                                                                        {this.props.userResults.isMember
                                                                            ? <img src={require('../resources/memberW.png')} />
                                                                            : null}
                                                                    </div>
                                                                    <div className="dedication-icon">
                                                                        {this.props.userResults.isCompetitiveShooter
                                                                            ? <img src={require('../resources/dedicatedShooterW.png')} />
                                                                            : <img src={require('../resources/standardShooterW.png')} />}
                                                                    </div>
                                                                </div>
                                                                <div className="member-rank-icons">
                                                                    <div className="up-arrow">
                                                                        <div className="up-arrow-icon">
                                                                        </div>
                                                                    </div>
                                                                    <div className="ranking">
                                                                        {this.props.userResults.rank > 3
                                                                            ? <div className="number">{this.props.userResults.rank}</div>
                                                                            : (this.props.userResults.rank === 1
                                                                                ? <img src={require('../resources/rank1.png')} />
                                                                                : (this.props.userResults.rank === 2
                                                                                    ? <img src={require('../resources/rank2.png')} />
                                                                                    : (this.props.userResults.rank === 3
                                                                                        ? <img src={require('../resources/rank3.png')} />
                                                                                        : null)))}
                                                                    </div>
                                                                    <div className="down-arrow">
                                                                        <div className="down-arrow-icon">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="rank-labels-col">
                                                            <table className="head-table-labels">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="extra-name-col">{this.props.userResults == null ? 'Something went wrong' : (this.props.userResults != null ? this.props.userResults.username : '--')}</td>
                                                                        <td className={this.state.selectedRank == "best" ? "score-col-active" : "score-col"}>{this.props.userResults == null ? '--' : (this.props.userResults.best != 0 ? this.props.userResults.best : '--')}</td>
                                                                        <td className={this.state.selectedRank == "average" ? "score-col-active" : "score-col"}>
                                                                            <div className="member-rank-icons">
                                                                                <div className="up-arrow">
                                                                                    <div className="up-arrow-icon">
                                                                                        {this.props.userResults.rankStatus === "up"
                                                                                            ? <img src={require('../resources/accuracyUp.png')} />
                                                                                            : null}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ranking">
                                                                                    <div className="number">{this.props.userResults == null ? '--' : (this.props.userResults.average != 0 ? this.props.userResults.average : '--')}</div>
                                                                                </div>
                                                                                <div className="down-arrow">
                                                                                    <div className="down-arrow-icon">
                                                                                        {this.props.userResults.rankStatus === "down"
                                                                                            ? <img src={require('../resources/accuracyDown.png')} />
                                                                                            : null}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className={this.state.selectedRank === "total" ? "score-col-active" : "score-col"}>{this.props.userResults === null ? '--' : (this.props.userResults.total != 0 ? this.props.userResults.total : '--')}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </Motion>
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
    selectedGroupName: state.posts.leaderboardSelectedGroupName,
    selectedCompetitionName: state.posts.leaderboardSelectedCompetitionName,
    selectedScoreType: state.posts.leaderboardSelectedScoreType
});
export default connect(mapStateToProps, { fetchleaderboadfilterdata, fetchleaderboadtabledata, updateSelectedCompetition, updateSelectedGroup })(LeaderboardPage);

