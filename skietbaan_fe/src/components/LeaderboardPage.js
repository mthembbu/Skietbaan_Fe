import React, { Component } from 'react';
import Select from 'react-select';
import '../bootstrap/LeaderboardStyle.css';



class LeaderboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            groups: [],
            competitions: [],
            selectedGroup: "1",
            selectedCompetition: "1",
            selectedST: "1",
            rankingTable: []
        }
        this.setCompetitionValue = this.setCompetitionValue.bind(this);
        this.setGroupValue = this.setGroupValue.bind(this);
        this.setScoreTypeValue = this.setScoreTypeValue.bind(this);
        this.updateLeaderboard = this.updateLeaderboard.bind(this);
    }
    //executed when leaderboard in mounted on main app
    componentWillMount() {
        fetch('http://localhost:63474/api/Leaderboard/GetLeaderboardFilterData?UserID=' + 1)
            .then(res => res.json())
            .then(data => this.setState({ groups: data.groups1, competitions: data.competitions1, id: data.id }, console.log(data.competitions), console.log(data.groups), console.log(this.state.groups)));
            this.updateLeaderboard();
        }


    setCompetitionValue = (event) => {
        this.setState({
            selectedCompetition: event.value
        })
        this.updateLeaderboard();
    }
    setGroupValue = (event) => {
        this.setState({
            selectedGroup: event.value
        });
        this.updateLeaderboard();
    }
    setScoreTypeValue = (event) => {
        this.setState({
            selectedST: event.value
        });
        this.updateLeaderboard();
    }

    updateLeaderboard() {
        fetch('http://localhost:63474/api/Leaderboard/GetLeaderboardRankings?competitionID=' + this.state.selectedCompetition + '&groupID=' + this.state.selectedGroup + '&ScoreType=' + this.state.selectedST)
            .then(res => res.json())
            .then(data => this.setState({ rankingTable: data }, console.log(data), console.log(this.state.rankingTable)));
            console.log("State Has been updated in updateLeaderboard()")
    }





    render() {
        const selectCompetitions = this.state.competitions;
        const selectScoreType = [
            { label: "Average", value: 1 },
            { label: "TOTAL", value: 2 },
            { label: "BEST", value: 3 }
        ];
        const selectGroups = this.state.groups;
        const tablebody =this.state.rankingTable.map((post, index) => (
            <tr key={post.rank.toString()}  value={post.rank} onChange={() => this.onChange(post.id)}>
                <td >{post.rank}</td>
                <td >{post.username}</td>
                <td >{post.value}</td>
            </tr>));
            console.log("Table body : ", tablebody)
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="competitionSelction">
                        <div className="col-md-4">
                            <Select value={selectCompetitions[this.state.selectedCompetition - 1]} options={selectCompetitions} onChange={this.setCompetitionValue} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="filterNav">
                        <div className="col-md-4">
                            <div className="groupFilt">
                                <div className="groupLabel">Groups</div>
                                <div className="groupChoose">
                                    <Select value={selectGroups[this.state.selectedGroup - 1]} options={selectGroups} onChange={this.setGroupValue} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="scoreType">
                                <div className="scoreTypeLabel">ScoreType</div>
                                <div className="row justify-content-center">
                                    <div className="col-md-2">
                                        <div className="scoreTypeChoose"><Select value={selectScoreType[this.state.selectedST - 1]} options={selectScoreType} onChange={this.setScoreTypeValue} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <table className="table">
                        <thead>
                            <tr className="filters">
                                <td>#</td>
                                <td>Username</td>
                                <td>Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tablebody}
                        </tbody>

                    </table>
                </div>
                <hr />
                <div className="curentMember">
                    <table className="table">
                        <thead>
                            <tr className="filters">
                                <td>3</td>
                                <td>MyUsername</td>
                                <td>62</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

        )
    }
}
export default LeaderboardPage;
