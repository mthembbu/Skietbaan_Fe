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

class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individual:"Individual Ranking",
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
        this.getCurentUserRankNumber = this.getCurentUserRankNumber.bind(this);
        this.top3Display = this.top3Display.bind(this);
        this.closeMain = this.closeMain.bind(this);
        this.displaySelectedGroup = this.displaySelectedGroup.bind(this);
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
    displaySelectedGroup(value){
        if(value == -1){
            return this.state.individual;
        }else{
            if(this.props.competitions.length > 0){
                return this.props.competitions[this.state.selectedCompetition].label;
            }else{
                return null;
            }
        }
    }
    top3Display(object) {
        console.log("object",object);
        if(object !=null){
            if (object.rank == 1) {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tr className="upArrow">
    
                        </tr>
                        <tr className="Icon">
                            <td className="firstCol">
                                <img src={require('../resources/rank1.png')} />
                            </td>
                        </tr>
                        <tr className="downArrow">
    
                        </tr>
                    </table>
                </div>;
            } else if (object.rank == 2) {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tr className="upArrow">
    
                        </tr>
                        <tr className="Icon">
                            <td className="firstCol">
                                <img src={require('../resources/rank2.png')} />
                            </td>
                        </tr>
                        <tr className="downArrow">
    
                        </tr>
                    </table>
                </div>;
            } else if (object.rank == 3) {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tr className="upArrow">
    
                        </tr>
                        <tr className="Icon">
                            <td className="firstCol">
                                <img src={require('../resources/rank3.png')} />
                            </td>
                        </tr>
                        <tr className="downArrow">
    
                        </tr>
                    </table>
                </div>;
            } else {
                return <div className="rankNumberContainer">
                    <table className="rankNumTable">
                        <tr className="upArrow">
    
                        </tr>
                        <tr className="Icon">
                            <td className="firstCol">
                                {object.rank}
                            </td>
                        </tr>
                        <tr className="downArrow">
    
                        </tr>
                    </table>
                </div>;
            }
        }else{
            return null;
        }
    }
    render() {
        const groupsList = (
            <Table className="groupsTable">
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
            <Table className="competitionsTable" >
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
        const tablebody = this.props.tableData.map((post, index) => (
            <tr className="rankRow" key={post.rank.toString()} value={post.rank} onChange={() => this.onChange(post.id)}>
                <td className="RankIconCol">
                    {this.top3Display(post)}
                </td>
                <td className="RankLabelsCol">
                    <table className="HeadTableLabels">
                        <tr>
                            <td className="UsernameCol" colSpan="3">
                                {post.username}
                            </td>
                        </tr>

                        <tr>
                            <td className="ScoreColLeft">{post.total}</td>
                            <td className="ScoreColCenter">{post.average}</td>
                            <td className="ScoreColCenter">{post.best}</td>
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
            </tr>

        ));
        return (
            /* Leaderboard Page Main Container */
            <div className="leaderboardContainer">
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        <div className="CompetitionName">
                            {this.props.competitions.length > 0 ? this.props.competitions[this.state.selectedCompetition].label : null}
                        </div>
                    </div>
                </div>
                {/* filter collapsed section styles */}
                <Collapse isOpened={this.state.collapseFilter}>
                    <div className="row justify-content-center">
                        <div className="col-sm-8">
                            <div className="OpenFilterSection">
                                <table className="FilterTable">
                                    <tr>
                                        <td className="FilterIconCol" >
                                            <div className="FilterIcon">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <i className="fa fa-angle-left"></i>
                                                </MDBBtn>
                                            </div>
                                        </td>
                                        <td className="FilterLabelsCol" >
                                            <div className="selectCompetition"> Select Competition</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Filter Selections section*/}
                    <div className="row justify-content-center">
                        <div className="col-sm-8">
                            <div className="FilterSelections">
                                <div className="row justify-content-center">
                                    {competitionsList}
                                </div>
                                <div className="row justify-content-center">
                                    <div className="Groups">
                                        <div className="row justify-content-center">
                                            <div className="rakingsLabel">Ranking in</div>
                                        </div>
                                        <div className="row">
                                            <div className="categoriesLabels">
                                                <div className="groupsLabel">Groups</div>
                                                <div className="singleLabel">Single</div>
                                            </div>
                                        </div>
                                        <div className="groupsSlection">
                                            <div className="GroupsList">
                                                {groupsList}
                                            </div>
                                            <div className="Single" key={-1} onClick={() => this.setGroupValue(-1)}
                                                value={-1}>
                                                Individual rank
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
                {/* filter closed(collapsed->fasle) section styles */}
                <Collapse isOpened={this.closeMain(this.state.collapseFilter)}>
                    <div className="row justify-content-center">
                        <div className="col-sm-8 text-left">
                            <div className="ClosedFilterSection">
                                <table className="FilterTable">
                                    <tr>
                                        <td className="FilterIconCol">
                                            <div className="FilterIcon">
                                                <MDBBtn tag="a" size="lg" floating gradient="purple"
                                                    onClick={this.onMouseClickFilter} >
                                                    <img src={require('../resources/filter.png')} />
                                                </MDBBtn>
                                            </div>
                                        </td>
                                        <td className="FilterLabelsCol">
                                            <table className="HeadTableLabels">
                                                <tr>
                                                    <td className="GroupNameCol" colSpan="3">
                                                        {this.displaySelectedGroup(this.state.selectedGroup)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ScoreColLeft">Total</td>
                                                    <td className="ScoreColCenter">Average</td>
                                                    <td className="ScoreColCenter">Best</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Ranking table Section*/}
                    <div className="row justify-content-center">
                        <div className="col-sm-8 text-left">
                            <div className="RankingTableSection">
                                <table className="RankingTable">
                                    {tablebody}
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Current User Section*/}
                    <div className="row justify-content-center">
                        <div className="col-sm-8 text-left">
                            <div className="CurrentUserTableSection">
                                <table className="RankingTable">
                                    <tr className="rankRow">
                                        <td className="RankIconCol">
                                            {this.top3Display(this.props.userResults)}
                                        </td>
                                        <td className="RankLabelsCol">
                                            <table className="HeadTableLabels">
                                                <tr>
                                                    <td className="UsernameCol" colSpan="3">
                                                        {this.props.userResults != null ? this.props.userResults.username : null}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="ScoreColLeft">{this.props.userResults != null ? this.props.userResults.total : null}</td>
                                                    <td className="ScoreColCenter">{this.props.userResults != null ? this.props.userResults.average : null}</td>
                                                    <td className="ScoreColCenter">{this.props.userResults != null ? this.props.userResults.best : null}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
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

