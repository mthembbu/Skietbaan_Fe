import React, { Component } from 'react';
import Select from 'react-select';
import '../bootstrap/LeaderboardStyle.css';



class LeaderboardPage extends Component {
    constructor(props){
        super(props);
        this.state ={
            user:{},
            groups:["1","2"],
            competitions:[],
            selectedGroup:"",
            selectedCompetition:"",
            selectedST:""
        }
        this.checkselected = this.checkselected.bind(this);
        this.checkselected2 = this.checkselected2.bind(this);
    }
    //executed when leaderboard in mounted on main app
    componentWillMount(){
       console.log("retrieving leaderboard data");
       fetch('http://localhost:63474/api/Leaderboard/GetLeaderboardFilterData?UserID='+1)
       .then(res => res.json())
       .then(data => this.setState({groups:data.groups1,competitions:data.competitions1,id:data.id},console.log(data.competitions),console.log(data.groups),console.log(this.state.groups)));
    }

    
    checkselected(){
       console.log("changed");
    }
    checkselected2(){
        //console.log("changed2");
     }
   

    
    render() {
        const selectCompetitions = this.state.competitions;
        const selectScoreType = [
            { label: "Average", value: 1 },
            { label: "Best", value: 2 },
            { label: "Total", value: 3 }
        ];
        const selectGroups = this.state.groups;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="competitionSelction">
                        <div className="col-md-4">
                            <Select options={selectCompetitions} onChange={this.checkselected} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="filterNav">
                        <div className="col-md-4">
                            <div className="groupFilt">
                                <div className="groupLabel">Groups</div>
                                   <div className="groupChoose">
                                      <Select options={selectGroups} onChange={this.checkselected} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                        <div className="scoreType">
                             <div className="scoreTypeLabel">ScoreType</div>
                             <div className="row justify-content-center">
                                 <div className="col-md-2">
                                    <div className="scoreTypeChoose"><Select options={selectScoreType} onChange={this.checkselected}/></div>
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>80</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>66</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry</td>
                                <td>57</td>
                            </tr>
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
