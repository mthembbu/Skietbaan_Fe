import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchleaderboadfilterdata } from '../actions/postActions';
import { fetchleaderboadtabledata } from '../actions/postActions';
import { Collapse } from 'react-collapse';
import { Table } from "react-bootstrap";
import { Img } from 'react-image'
import { getCookie } from './cookie.js'
import { MDBBtn, MDBIcon } from "mdbreact";
import '../bootstrap/LeaderboardStyle.css';
import { runInThisContext } from 'vm';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individual: "Individual Ranking",
            selectedGroup: -1,
            selectedCompetition: 1,
            selectedScoreType: 1,
            selectedRank: null,
            collapseFilter: false,
            listType: 'competitions'
        }
        this.setCompetitionValue = this.setCompetitionValue.bind(this);
        this.setGroupValue = this.setGroupValue.bind(this);
        this.setScoreTypeValue = this.setScoreTypeValue.bind(this);
        this.onMouseClickFilter = this.onMouseClickFilter.bind(this);
        this.getCurentUserRankNumber = this.getCurentUserRankNumber.bind(this);
        this.top3Display = this.top3Display.bind(this);
        this.closeMain = this.closeMain.bind(this);
        this.displaySelectedGroup = this.displaySelectedGroup.bind(this);
        this.setListType = this.setListType.bind(this);
        this.displayList = this.displayList.bind(this);
    }
    //executed when leaderboard in mounted on main app
    componentWillMount() {
        
        //get function to get filter data from api
        this.props.fetchleaderboadfilterdata();
        this.getLeaderboardData(this.state.selectedCompetition,this.state.selectedGroup);
    }
    getLeaderboardData = (competition,group) => {
        let token = getCookie("token");
        var CompNum = competition +1;
        var GroupNum = group;
        if(this.state.selectedGroup != -1){
            GroupNum = this.state.selectedGroup +1;
        }
        const filterSelection = {
            selectedCompetition: CompNum,
            selectedGroup: GroupNum,
            selectedScoreType: this.state.selectedScoreType,
            userToken: token
        }
        this.props.fetchleaderboadtabledata(filterSelection);
    }

    setCompetitionValue = (value) => {
        this.setState({
            selectedCompetition: value
        });
        this.getLeaderboardData(value,this.state.selectedGroup);
    }
    setGroupValue = (value) => {
        this.setState({
            selectedGroup: value
        });
        this.getLeaderboardData(this.state.selectedCompetition,value);
    }
    setScoreTypeValue = (value) => {
        this.setState({
            selectedScoreType: value
        });
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
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tbody>
                            <tr className="upArrow">

                            </tr>
                            <tr className="Icon">
                                <td className="firstCol">
                                    <img src={require('../resources/rank1.png')} />
                                </td>
                            </tr>
                            <tr className="downArrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else if (object.rank == 2) {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tbody>
                            <tr className="upArrow">

                            </tr>
                            <tr className="Icon">
                                <td className="firstCol">
                                    <img src={require('../resources/rank2.png')} />
                                </td>
                            </tr>
                            <tr className="downArrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else if (object.rank == 3) {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tbody>
                            <tr className="upArrow">

                            </tr>
                            <tr className="Icon">
                                <td className="firstCol">
                                    <img src={require('../resources/rank3.png')} />
                                </td>
                            </tr>
                            <tr className="downArrow">

                            </tr>
                        </tbody>
                    </table>
                </div>;
            } else {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tbody>
                            <tr className="upArrow">
                                <td></td>
                            </tr>
                            <tr className="Icon">
                                <td className="firstCol">
                                    {object.rank != 0 ? object.rank : '--'}
                                </td>
                            </tr>
                            <tr className="downArrow">
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
        if(!getCookie("token")){
            window.location = "/registerPage";
        }
        const groupsList = (
            <Table className="SelectionTable">
                <tbody>
                    {this.props.groups.map((group, index) => (
                        <tr key={group.value.toString()} onClick={() => this.setGroupValue(index)}
                            value={group.value}>
                            <td className={this.state.selectedGroup == index ? "td-Active" : "td-Inactive"}>{group.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const competitionsList = (
            <Table className="SelectionTable" >
                <tbody>
                    {this.props.competitions.map((competition, index) => (
                        <tr key={competition.value.toString()} onClick={() => this.setCompetitionValue(index)}
                            value={competition.value}>
                            <td className={this.state.selectedCompetition == (competition.value - 1) ? "td-Active" : "td-Inactive"}>{competition.label}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
        const tablebody = this.props.tableData.map((post, index) => (
            <tr className="rankRow" key={index.toString()} value={index} onChange={() => this.onChange(post.id)}>
                <td className="RankIconCol">
                    {this.top3Display(post)}
                </td>
                <td className="RankLabelsCol">
                    <table className="HeadTableLabels">
                        <tbody>
                            <tr>
                                <td className="ExtraNameCOl">{post.username}</td>
                                <td className="ScoreColTotal">{post.total != 0 ? post.total : '--'}</td>
                                <td className="ScoreColAverage">{post.average != 0 ? post.average : '--'}</td>
                                <td className="ScoreColBest">{post.best != 0 ? post.best : '--'}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

        ));
        return (
            /* Leaderboard Page Main Container */
            <div className="leaderboardContainer">
                <div className="row justify-content-center">
                    <div className="col-sm-8 text-left">
                        <div className="ClosedFilterSection">
                            <table className="FilterTable1">
                                <tbody>
                                    <tr className="HeaderRow1">
                                        <td className="FilterIconCol">
                                            <div className="FilterIcon">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/filter.png')} />
                                                </MDBBtn>
                                            </div>
                                        </td>
                                        <td className="CompetitionNameCol">
                                            {this.props.competitions.length != 0 ? this.props.competitions[this.state.selectedCompetition].label : "-------"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="FilterTable2">
                                <tbody>
                                    <tr className="HeaderRow2">
                                        <td colSpan="2" className="GroupingLabelCOl">
                                            {this.state.selectedGroup == -1 ? "Overal rank" : (this.props.groups.length != 0 ? this.props.groups[this.state.selectedGroup].label : "-------")}
                                        </td>
                                        <td colSpan="1" className="totalLabelCOl">
                                            Total
                                        </td>
                                        <td colSpan="1" className="AverageLabelCOl">
                                            Average
                                        </td>
                                        <td colSpan="1" className="BestLabelCOl">
                                            Best
                                       </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Collapse isOpened={this.state.collapseFilter}>
                            <div className="FilterSelections">
                                <MobileView>
                                    <div className="CategorySelection">
                                        <div className={this.state.listType == "competitions" ? "chooseComps-active" : "chooseComps"}  >
                                            <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                onClick={() => this.setListType("competitions")} >
                                                Competitions
                                            </MDBBtn>
                                        </div>
                                        <div className={this.state.listType == "groups" ? "chooseGroups-active" : "chooseGroups"}>
                                            <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                onClick={() => this.setListType("groups")} >
                                                Rankings by
                                            </MDBBtn>
                                        </div>
                                    </div>
                                    <div className="catVisibleLabel">
                                        {this.state.listType == "competitions" ? "Select Competition" : "Select Ranking"}
                                    </div>
                                    <div className={this.state.listType == "competitions" ? "hideMyDiv" : (this.state.selectedGroup == -1 ? "individual-Active" : "individual-Inactive")}>
                                        <MDBBtn tag="a" size="lg" floating gradient="purple"
                                            onClick={() => this.setGroupValue(-1)} >
                                            Overall ranking
                                        </MDBBtn>
                                    </div>
                                    <div className={this.state.listType == "groups" ? "catVisibleGroupsLabel" : "hideMyDiv"}>
                                        Groups
                                   </div>
                                </MobileView>
                                <div className="SelectionsContainer">
                                    <div className="row justify-content-center">
                                        <BrowserView>
                                            <div className="LeftCompetitions">
                                                <div className="competitionsL">
                                                    Select Competition
                                               </div>
                                                <div className="Choose">
                                                    {competitionsList}
                                                </div>
                                            </div>
                                            <div className="rightGroups">
                                                 <div className="rankinL">
                                                     Select ranking
                                                 </div>
                                                <div className={this.state.selectedGroup == -1 ? "individual-Active" : "individual-Inactive"}>
                                                    <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                        onClick={() => this.setGroupValue(-1)} >
                                                        Individual rank
                                                    </MDBBtn>
                                                </div>
                                                <div className="groupL">
                                                    Groups
                                               </div>
                                                <div className="Choose">
                                                    {groupsList}
                                                </div>
                                            </div>

                                        </BrowserView>
                                        <MobileView>
                                            <div className="Choose">
                                                {this.state.listType == "competitions" ? competitionsList : groupsList}
                                            </div>
                                        </MobileView>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <div className="RankingTableSection">
                            <table className="RankingTable">
                                <tbody>
                                    {tablebody}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Current User Section*/}
                <div className="userWrapper">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 text-left">
                            <div className="CurrentUserTableSection">
                                <table className="RankingTable">
                                    <tbody>
                                        <tr className="rankRow">
                                            <td className="RankIconCol">
                                                {this.top3Display(this.props.userResults)}
                                            </td>
                                            <td className="RankLabelsCol">
                                                <table className="HeadTableLabels">
                                                    <tbody>
                                                        <tr>
                                                            <td className="ExtraNameCOl">{this.props.userResults == null ? 'Something went wrong' : (this.props.userResults != null ? this.props.userResults.username : '--')}</td>
                                                            <td className="ScoreColTotal">{this.props.userResults == null ? '--' : (this.props.userResults.total != 0 ? this.props.userResults.total : '--')}</td>
                                                            <td className="ScoreColAverage">{this.props.userResults == null ? '--' : (this.props.userResults.average != 0 ? this.props.userResults.average : '--')}</td>
                                                            <td className="ScoreColBest">{this.props.userResults == null ? '--' : (this.props.userResults.best != 0 ? this.props.userResults.best : '--')}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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

