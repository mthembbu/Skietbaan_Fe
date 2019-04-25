import React, { Component } from 'react'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend} from 'recharts'
import "../bootstrap/StatisticsPage.css";
import { Row, Col } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { connect } from "react-redux";
import { BASE_URL } from "../actions/types.js";
import { getCookie } from "./cookie.js";

class StatisticsPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            collapse: false,
            selectedCompetition: 0,
            seletectedRanking: 0,
            selectedCompetitionRankToggle: 0,
            selectedGroup: -1,
            graphData: [],
            groupsUsersMap: null,
            competitionsUsersMap: null,
            isFetchDone: false,
            isParticipantsFetchDone: false,
            apiResponse: "",
            errorOccured: false,
            exceptionCaught: false,
        }
        //prevent setState on unmounted component
        this._isMounted = false;
        this.mapCompNameToIndex = {}
    }

    componentDidMount(){
        this._isMounted = true;
        fetch(BASE_URL + "/api/statistics/" + getCookie("token"), {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(_response => {
            if(this._isMounted && typeof _response != "string"){
                _response.forEach((element, index) => {
                    this.mapCompNameToIndex[element.competitionName] = index
                });
                this.setState({graphData : _response, isGraphFetchDone: true });
            }else{
                this.setState({apiResponse : _response, errorOccured : true})
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });

        fetch(BASE_URL + "/api/statistics/participants", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(_response => {
            if(this._isMounted && typeof _response != "string"){
                this.setState({groupsUsersMap : _response, isParticipantsFetchDone: true });
            }else{
                this.setState({apiResponse : _response, errorOccured : true})
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });

        fetch(BASE_URL + "/api/statistics/competition-participants", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(_response => {
            if(this._isMounted && typeof _response != "string"){
                this.setState({competitionsUsersMap : _response, isParticipantsFetchDone: true });
            }else{
                this.setState({apiResponse : _response, errorOccured : true})
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });
    }

    toggle = () =>{
        this.setState({
            collapse: !this.state.collapse
        })
    }

    renderLoader(){
        return(
            <div className={this.state.isFetchDone ? "hidden" : "loader-container-profile"}>
                <div className={this.state.isFetchDone ? "hidden" : "loader"}></div>
                <div className={this.state.isFetchDone ? "hidden" : "target-loader-image"}></div>
                <div className={this.state.isFetchDone ? "hidden" : "loading-message-profile"}>Loading...</div>
            </div>
        )
    }

    setSelectedCompetition(index){
        this.setState({
            selectedCompetition: index
        });
    }

    selectCompetition(element, index){
        return(  
            <div key={index}>
                <Row>
                    <Col>
                        <button className={this.state.selectedCompetition === index ?
                             "stats-competition-button-text-active stats-competition-button-text stats-button-style-active" :
                             "stats-competition-button-text stats-competition-button-text stats-button-style-inactive"}
                             onClick={() => this.setSelectedCompetition(index)}>
                            {element.label}
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }

    renderCompetitionList(){
        let renderArray = []
        this.props.competitions.forEach((element, index) => {
            renderArray.push(this.selectCompetition(element, index))
        })

        return renderArray;
    }

    renderCompetitionToggle(competitionList){
        return(
            <div>
                <label className="stats-select-competition-text">Select Competition</label>
                <div className="stats-competitions-list-buttons-container">{competitionList}</div>
                <div className="scale-white-arrow-up-img" onClick={this.toggle}>
                    <img src={require("../resources/awardIcons/white-arrow-up-icon.png")}></img>
                </div>
            </div>
        )
    }

    setSelectedGroup(index){
        this.setState({
            selectedGroup: index
        })
    }

    selectGroup(element, index){
        return(  
            <div key={index}>
                <Row>
                    <Col>
                        <button className={this.state.selectedGroup === index ?
                             "stats-competition-button-text-active stats-competition-button-text stats-button-style-active" :
                             "stats-competition-button-text stats-competition-button-text stats-button-style-inactive"}
                             onClick={() => this.setSelectedGroup(index)}>
                            {element.label}
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }

    renderGroupList(){
        let renderArray = []
        this.props.groups.forEach((element, index) => {
            renderArray.push(this.selectGroup(element, index))
        })

        return renderArray;
    }

    renderRankToggle(){
        return(
            <div>
                <label className="stats-select-competition-text">Select Ranking</label>
                <div className="margin-bottom-22px">
                    <button className={this.state.selectedGroup === -1 ? 
                        "stats-competition-button-text-active stats-competition-button-text stats-button-style-active" :
                        "stats-competition-button-text stats-competition-button-text stats-button-style-inactive"}
                        onClick={() => this.setSelectedGroup(-1)}>
                        <label>OVERALL</label>
                    </button>
                </div>
                <label className="stats-groups-text">Groups</label>
                <div className="stats-competitions-list-buttons-container">{this.renderGroupList()}</div>
                <div className="scale-white-arrow-up-img" onClick={this.toggle}>
                    <img src={require("../resources/awardIcons/white-arrow-up-icon.png")}></img>
                </div>
            </div>
        )
    }

    setSelectedCompetitionRankingToggle(selected){
        this.setState({
            selectedCompetitionRankToggle: selected
        })
    }

    getGraphData(){
        var compName = this.props.competitions[this.state.selectedCompetition].label
        return this.state.graphData[this.mapCompNameToIndex[compName]].data;
    }

    getMaxScore(){
        var compName = this.props.competitions[this.state.selectedCompetition].label
        return this.state.graphData[this.mapCompNameToIndex[compName]].competitionMaximum;
    }

    getAverage(){
        var compName = this.props.competitions[this.state.selectedCompetition].label;
        return this.state.graphData[this.mapCompNameToIndex[compName]].average;
    }

    getMaximumValue(){
        var compName = this.props.competitions[this.state.selectedCompetition].label;
        return this.state.graphData[this.mapCompNameToIndex[compName]].max;
    }

    getMinimumValue(){
        var compName = this.props.competitions[this.state.selectedCompetition].label;
        return this.state.graphData[this.mapCompNameToIndex[compName]].min;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    
    render() {
        var data = null;
        var maxScore = 0;
        var list = null;
        if(this.state.graphData.length > 0){
            data = this.getGraphData();
            maxScore = this.getMaxScore();
            list = this.renderCompetitionList();
        }
        
        return (
            <div className="stats-container">
                {this.props.competitions.length > 0 && this.state.graphData.length > 0 ?
                    <div>
                        <Collapse isOpened={this.state.collapse} fixedHeight={490}> 
                            <div className="stats-center-content stats-competition-select-rectangle-big">
                                <Row onClick={this.toggle}>
                                    <Col>
                                        <div className="scale-gun-type-img">
                                            {this.props.competitions[this.state.selectedCompetition].label.includes("Rifle") || 
                                                this.props.competitions[this.state.selectedCompetition].label.includes("rifle") ?
                                                <img src={require("../resources/awardIcons/rifle-icon.png")}></img>:
                                                <img src={require("../resources/awardIcons/white-pistol-icon.png")}></img>
                                            }
                                        </div>
                                        <div className="stats-competition-text stats-inline-text">
                                            {this.props.competitions[this.state.selectedCompetition].label}
                                            <div className="white-down-triangle-img-scale stats-margin-left-7px">
                                                <img src={require("../resources/awardIcons/white-down-triangle.png")}
                                                    alt="down-triangle">
                                                </img>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="margin-top-13px">
                                    <Col>
                                        <Row className="competitions-rank-rectangle margin-left-right-12px">
                                            <Col className="stats-remove-left-right-paddings stats-left-button">
                                                <div className={this.state.selectedCompetitionRankToggle == 0 ?
                                                    "stats-white-button-active padding-top-5px" :
                                                    "stats-white-button-inactive padding-top-5px"}
                                                    onClick={() => this.setSelectedCompetitionRankingToggle(0)}>
                                                    <label className={this.state.selectedCompetitionRankToggle == 0 ?
                                                        "competitions-rank-text" : "competitions-rank-text-inactive"}>
                                                        COMPETITIONS</label>
                                                </div>
                                            </Col>
                                            <Col className="stats-remove-left-right-paddings stats-right-button">
                                                <div className={this.state.selectedCompetitionRankToggle == 1 ?
                                                    "stats-white-button-active padding-top-5px" :
                                                    "stats-white-button-inactive padding-top-5px"}
                                                    onClick={() => this.setSelectedCompetitionRankingToggle(1)}>
                                                    <label className={this.state.selectedCompetitionRankToggle == 1 ?
                                                        "competitions-rank-text" : "competitions-rank-text-inactive"}>
                                                        RANKING BY</label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="stats-competition-container">
                                            {this.state.selectedCompetitionRankToggle == 0 ? 
                                                this.renderCompetitionToggle(list) :
                                                this.renderRankToggle()
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Collapse>
                        {!this.state.collapse ? 
                            <Row className={this.state.collapse ? "" :
                                "stats-center-content stats-competition-select-rectangle push-bottom-13px"}
                                onClick={this.toggle}>
                                <Col className="stats-remove-left-padding">
                                    <div className="scale-gun-type-img">
                                        {this.props.competitions[this.state.selectedCompetition].label.includes("Rifle") || 
                                            this.props.competitions[this.state.selectedCompetition].label.includes("rifle") ?
                                            <img src={require("../resources/awardIcons/rifle-icon.png")}></img>:
                                            <img src={require("../resources/awardIcons/white-pistol-icon.png")}></img>
                                        }
                                    </div>
                                    <div className="stats-competition-text stats-inline-text">
                                        {this.props.competitions[this.state.selectedCompetition].label}
                                        <div className="white-down-triangle-img-scale stats-margin-left-7px">
                                            <img src={require("../resources/awardIcons/white-down-triangle.png")}
                                                alt="down-triangle">
                                            </img>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        :null}
                        <Row className="push-bottom-13px">
                            <Col className="align-text-center">
                                <label className="total-title black-text">
                                    MY TOTAL SCORE
                                </label>
                            </Col>
                        </Row>
                        {/* legend rectangle*/}
                        <Row className="push-bottom-16px">
                            <Col className="margin-left-right-8px">
                                <div className="legend-rectangle">
                                    <Row>
                                        <Col>
                                            <div className="font-size-12px red-text padding-left-17px">
                                                {this.state.selectedGroup === -1 ? "Overall" :
                                                    this.props.groups[this.state.selectedGroup].label
                                                }
                                            </div>
                                            <div className="font-size-12px red-text stats-inline padding-left-17px">
                                                <div className="scale-group-img">
                                                    <img src={require("../resources/awardIcons/groups-icon.png")}></img>
                                                </div>
                                                
                                                 {this.state.selectedGroup === -1 ? 
                                                    this.state.competitionsUsersMap
                                                        [this.props.competitions[this.state.selectedCompetition].label] :
                                                    this.state.groupsUsersMap[this.props.groups[this.state.selectedGroup].label]
                                                }
                                                
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="peach-text font-size-12px">Group Total Score</div>
                                            <div className="scale-group-total-img">
                                                <img src={require("../resources/awardIcons/group-total-key.png")}></img>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="black-text font-size-12px">My Total Score</div>
                                            <div className="scale-personal-total-img">
                                                <img src={require("../resources/awardIcons/personal-total-key.png")}></img>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="stats-graph-container">
                                    <ResponsiveContainer  height={300}>
                                        <BarChart 
                                            width={2} 
                                            height={260} 
                                            data={data}
                                            margin={{top: 5, right: 20, left: 20, bottom: 25}}>
                                            <XAxis 
                                                dataKey="label"
                                                fontFamily="helvetica"
                                                fontSize={12}
                                                tickSize={0}
                                                dy={10}
                                            />
                                            <YAxis 
                                                type="number" 
                                                domain={[0, maxScore]}
                                                tickCount={25}
                                            />
                                            <CartesianGrid 
                                                vertical={false}
                                                stroke="#ebf3f0"
                                            />
                                            <Bar 
                                                dataKey="value" 
                                                barSize = {this.getGraphData.length > 10 ? 8 : 30}
                                                    
                                                fontFamily="sans-serif"
                                                >
                                                {
                                                    data.map((entry, index) => (
                                                        <Cell key={index} fill={entry.description === "min" ? "#9D9D9D" :
                                                            entry.description === "max" ? "#BE0000" : "#000000"
                                                            } />
                                                    ))
                                                }
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="last-20-rectangle margin-left-right-8px">
                                    <div className="last-20-container">
                                        <div className="last-20-text">Last 20 Shoots</div>
                                        <hr/>
                                        <div>
                                            <Row>
                                                <Col>
                                                    <div className="stats-inline-flex">
                                                        <div className="red-text font-size-12px font-weight-bold">HIGHEST</div>
                                                        <div className="stats-arrow-up">
                                                            <img src={require("../resources/awardIcons/graph-up-icon.png")}></img>
                                                        </div>
                                                    </div>
                                                    <div className="font-size-16px red-text font-weight-bold">{this.getMaximumValue()}</div>
                                                </Col>
                                                <Col>
                                                    <div className="black-text font-size-12px font-weight-bold">AVERAGE</div>
                                                    <div className="font-size-16px black-text padding-left-15px">{Math.round(this.getAverage())}</div>
                                                </Col>
                                                <Col>
                                                    <div className="grey-color font-size-12px font-weight-bold">LOWEST</div>
                                                    <div className="font-size-16px grey-color padding-left-30px">{this.getMinimumValue()}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                :this.renderLoader()}
            </div>

        )
    }
}

const mapStateToProps = state =>({
    competitions: state.posts.leaderboardCompetitions,
    groups: state.posts.leaderboardGroups
})

export default connect(mapStateToProps)(StatisticsPage);