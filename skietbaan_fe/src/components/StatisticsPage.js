import React, { Component } from 'react'
import {ResponsiveContainer, Bar, XAxis, YAxis, Cell, CartesianGrid, ComposedChart} from 'recharts'
import "../bootstrap/StatisticsPage.css";
import { Row, Col } from "react-bootstrap";
import { Collapse } from "react-collapse";
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
            accuracyData: [],
            groupsUsersMap: {},
            competitionsUsersMap: {},
            isGraphFetchDone: false,
            isParticipantsFetchDone: false,
            isAccuracyDataDone: false,
            apiResponse: "",
            apiAccuracyResponse: "",
            errorOccured: false,
            errorOccuredOnAccuracyData: false,
            exceptionCaught: false,
        }
        //prevent setState on unmounted component
        this._isMounted = false;
        this.fetchOnce = true;
        this.mapCompNameToIndex = {}
        this.competitions = []
        this.groups = []
        this.userAccuracyData = []
        this.groupAccuracyData = []
        this.prevSelectedComp = -2
        this.prevSelectedGroup = -2
    }

    componentDidMount(){
        this._isMounted = true;
        this.fetchAllScoresData();
        this.fetchParticipants();
        this.fetchCompetitionParticipants();
    }

    fetchAllScoresData(){
        fetch(BASE_URL + "/api/statistics/" + getCookie("token"), {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(_response => {
            if(this._isMounted){
                if(typeof _response !== "string"){
                    _response.forEach((element, index) => {
                        this.mapCompNameToIndex[element.competitionName] = index
                        this.competitions.push(element.competitionName) 
                    });
                    this.setState({graphData : _response, isGraphFetchDone: true });
                }else{
                    this.setState({apiResponse : _response, errorOccured : true})
                }
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });
    }

    fetchParticipants(){
        fetch(BASE_URL + "/api/statistics/participants", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(_response => {
            if(this._isMounted){
                Object.keys(_response).forEach((element) =>{
                    this.groups.push(element);
                });
                if(typeof _response !== "string"){
                    this.setState({groupsUsersMap : _response, isParticipantsFetchDone: true });
                }else{
                    this.setState({apiResponse : _response, errorOccured : true})
                }
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });
    }

    fetchCompetitionParticipants(){    
        fetch(BASE_URL + "/api/statistics/competition-participants", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(_response => {
            if(this._isMounted){
                if(typeof _response !== "string"){
                    this.setState({competitionsUsersMap : _response});
                }else{
                    this.setState({apiResponse : _response, errorOccured : true})
                }
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });
        
    }

    fetchAccuracyData(){
        if(this.state.isGraphFetchDone && this.state.isParticipantsFetchDone && this.fetchOnce){
            this.fetchOnce = false;
            var token = getCookie("token");
            var compName = this.competitions[this.state.selectedCompetition]
            var groupName = this.groups[this.state.selectedGroup]
            if(groupName === undefined) groupName = "overall"
            fetch(BASE_URL + "/api/statistics/accuracy-data?token=" + token
                 + "&competitionName=" + compName + "&groupName=" + groupName, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(_response => {
                if(this._isMounted){
                    for(var i = 0; i < _response.length; i += 2){
                        this.userAccuracyData.push(_response[i]);
                    }
                    for(var i = 0; i < _response.length; i += 3){
                        this.groupAccuracyData.push(_response[i]);
                    }
                    this.prevSelectedComp = this.state.selectedCompetition;
                    this.prevSelectedGroup = this.state.selectedGroup;
                    if(typeof _response !== "string"){
                        this.setState({accuracyData: _response, isAccuracyDataDone : true
                            , errorOccuredOnAccuracyData: false})
                    }else{
                        this.setState({apiAccuracyResponse : _response, errorOccuredOnAccuracyData : true})
                    }
                }
            }).catch(() => {
                this.setState({exceptionCaught: true})
            })
        }
    }

    toggle = () =>{
        this.setState({
            collapse: !this.state.collapse
        }, () => { this.fetchDataIfChanged() })
        
        setTimeout(() => {
            this.setSelectedCompetitionRankingToggle(0);
        }, 500);
    }

    fetchDataIfChanged(){
        if(this.prevSelectedComp !== this.state.selectedCompetition || this.prevSelectedGroup !== this.state.selectedGroup){
            this.fetchOnce = true;
            this.fetchAccuracyData();
        }
    }

    setSelectedCompetition(index){
        this.setState({
            selectedCompetition: index
        });

        this.setSelectedCompetitionRankingToggle(1);   
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
                            {element}
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }

    setSelectedGroup(index){
        this.setState({
            selectedGroup: index
        })   
        this.toggle()
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
                            {element}
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }

    setSelectedCompetitionRankingToggle(selected){
        this.setState({
            selectedCompetitionRankToggle: selected
        })
    }

    getGraphData(){
        var compName = this.competitions[this.state.selectedCompetition]
        return this.state.graphData[this.mapCompNameToIndex[compName]].data;
    }

    getMaxScore(){
        var compName = this.competitions[this.state.selectedCompetition]
        return this.state.graphData[this.mapCompNameToIndex[compName]].competitionMaximum;
    }

    getAverage(){
        var compName = this.competitions[this.state.selectedCompetition]
        return this.state.graphData[this.mapCompNameToIndex[compName]].average;
    }

    getMaximumValue(){
        var compName = this.competitions[this.state.selectedCompetition]
        return this.state.graphData[this.mapCompNameToIndex[compName]].max;
    }

    getMinimumValue(){
        var compName = this.competitions[this.state.selectedCompetition]
        return this.state.graphData[this.mapCompNameToIndex[compName]].min;
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
                <div className="stats-buttons-container">{this.renderGroupList()}</div>
                <div className="scale-white-arrow-up-img" onClick={this.toggle}>
                    <img src={require("../resources/awardIcons/white-arrow-up-icon.png")}></img>
                </div>
            </div>
        )
    }

    renderError(errorMessage){
        return(
            <div className={errorMessage.startsWith("You") ? "no-competition-border-big" : "no-competition-border"}>
                <label className={errorMessage.startsWith("You") ? "no-competition-big" : "no-competition"}>
                    {errorMessage}</label>
            </div>
        )
    }

    renderGroupList(){
        let renderArray = []
        this.groups.forEach((element, index) => {
            renderArray.push(this.selectGroup(element, index))
        })

        return renderArray;
    }

    renderCompetitionToggle(competitionList){
        return(
            <div>
                <label className="stats-select-competition-text">Select Competition</label>
                <div className="stats-buttons-container">{competitionList}</div>
                <div className="scale-white-arrow-up-img" onClick={this.toggle}>
                    <img src={require("../resources/awardIcons/white-arrow-up-icon.png")}></img>
                </div>
            </div>
        )
    }
    
    renderCompetitionList(){
        let renderArray = []
        this.competitions.forEach((element, index) => {
            renderArray.push(this.selectCompetition(element, index))
        })

        return renderArray;
    }

    renderLoader(){
        return(
            <div className={this.state.isAccuracyDataDone ? "hidden" : "loader-container-profile"}>
                <div className={this.state.isAccuracyDataDone ? "hidden" : "loader"}></div>
                <div className={this.state.isAccuracyDataDone ? "hidden" : "target-loader-image"}></div>
                <div className={this.state.isAccuracyDataDone ? "hidden" : "loading-message-profile"}>Loading...</div>
            </div>
        )
    }

    renderLegendRectangle(){
        return(
            <div className="legend-rectangle">
                <Row>
                    <Col>
                        <div className="font-size-12px red-text padding-left-17px">
                            
                            {this.state.selectedGroup === -1 ? "Overall" :
                                this.groups[this.state.selectedGroup]
                            }
                        </div>
                        <div className="font-size-12px red-text stats-inline padding-left-17px">
                            <div className="scale-group-img">
                                <img src={require("../resources/awardIcons/groups-icon.png")}></img>
                            </div>
                                {this.state.selectedGroup === -1 ? 
                                this.state.competitionsUsersMap
                                    [this.competitions[this.state.selectedCompetition]] :
                                this.state.groupsUsersMap[this.groups[this.state.selectedGroup]]
                                }
                        </div>
                    </Col>
                    <Col>
                        <div className="legend-text font-size-12px">Group Total Score</div>                            
                        <div className="scale-group-total-img">
                            <img src={require("../resources/awardIcons/grey-bar.png")}></img>
                        </div>
                    </Col>
                    <Col>
                        <div className="black-text font-size-12px">My Total Score</div>
                        <div className="scale-personal-total-img">
                            <img src={require("../resources/awardIcons/black-bar.png")}></img>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }

    renderGraph(data, maxScore){
        return(
            <div className="stats-graph-container">
                <ResponsiveContainer  height={300}>
                    <ComposedChart height={260}
                            margin={{top: 5, right: 20, left: 20, bottom: 25}}
                            data={data}
                        >
                        <XAxis 
                            dataKey="label"
                            fontFamily="helvetica"
                            fontSize={15}
                            fontWeight={"bold"}
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
                            barSize = {data.length > 10 ? 8 : 30}
                            fontFamily="helvetica"
                        >
                        {
                            data.map((entry, index) => (
                                <Cell key={index} fill={entry.description === "min" ? "#9D9D9D" :
                                    entry.description === "max" ? "#BE0000" : "#000000"
                                    } />
                            ))
                        }
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        )
    }

    renderAccuracyGraph(){
        return(
            <div className="stats-graph-container">
                <ResponsiveContainer  height={300}>
                    <ComposedChart height={260}
                            margin={{top: 5, right: 20, left: 20, bottom: 25}}
                            data={this.state.accuracyData.data}
                        >
                        <XAxis 
                            dataKey="label"
                            fontFamily="helvetica"
                            fontSize={15}
                            fontWeight={"bold"}
                            tickSize={0}
                            dy={10}
                        />
                        <YAxis 
                            type="number" 
                            domain={[0, 100]}
                            tickCount={25}
                        />
                        <CartesianGrid 
                            vertical={false}
                            stroke="#ebf3f0"
                        />
                        <Bar 
                            dataKey="value" 
                            barSize = {this.state.accuracyData.data.length > 2 ? 15 : 30}
                            fontFamily="helvetica"
                            barCategoryGap={0}
                            barGap={0}
                        >
                            {
                                this.state.accuracyData.data.map((entry, index) => (
                                    <Cell key={index} fill={entry.description === "min" ? "#EC6A64" :
                                        entry.description === "max" ? "#BE0000" : "#00000"}
                                        />
                                ))
                            }
                        </Bar>
                        <Bar dataKey="groupValue" 
                            barSize = {this.state.accuracyData.data.length > 2 ? 15 : 30}
                            fontFamily="helvetica"
                            barCategoryGap={0}
                            barGap={0}
                        >
                            {
                                this.state.accuracyData.data.map((entry, index) => (
                                    <Cell key={index} fill="#9D9D9D" d={"M 215 157 h 30 v 88 h -30 Z"}
                                        />
                                ))
                            }
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        )
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

        this.fetchAccuracyData();

        return (
            <div className="stats-container">
                {this.state.exceptionCaught ? this.renderError("Something went wrong") :
                this.state.errorOccured ? this.renderError(this.state.apiResponse) : 
                this.state.isGraphFetchDone && this.state.isParticipantsFetchDone ?
                    <div>
                        <Collapse isOpened={this.state.collapse} fixedHeight={490}> 
                            <div className="stats-center-content stats-competition-select-rectangle-big">
                                <Row onClick={this.toggle}>
                                    <Col>
                                        <div className="scale-gun-type-img">
                                            {this.competitions[this.state.selectedCompetition].includes("Rifle") || 
                                                this.competitions[this.state.selectedCompetition].includes("rifle") ?
                                                <img src={require("../resources/awardIcons/rifle-icon.png")}></img>:
                                                <img src={require("../resources/awardIcons/white-pistol-icon.png")}></img>
                                            }
                                        </div>
                                        <div className="stats-competition-text stats-inline-text">
                                            {this.competitions[this.state.selectedCompetition]}
                                            <div className="white-down-triangle-img-scale stats-margin-left-7px">
                                                {this.state.collapse ?
                                                    <img src={require("../resources/awardIcons/white-up-triangle.png")}
                                                        alt="up-triangle" /> :
                                                    <img src={require("../resources/awardIcons/white-down-triangle.png")}
                                                        alt="down-triangle" />
                                                }
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
                                <Row className="stats-center-content">
                                    <Col sm={2} xs={2} lg={2} onClick={this.toggle}></Col>
                                    <Col className="stats-remove-left-right-paddings" sm={7} xs={7} lg={7}>
                                        <div className="stats-competition-container">
                                            {this.state.selectedCompetitionRankToggle == 0 ? 
                                                this.renderCompetitionToggle(list) :
                                                this.renderRankToggle()
                                            }
                                        </div>
                                    </Col>
                                    <Col sm={2} xs={2} lg={2} onClick={this.toggle}></Col>
                                </Row>
                            </div>
                        </Collapse>
                        {!this.state.collapse ? 
                            <Row className={this.state.collapse ? "" :
                                "stats-center-content stats-competition-select-rectangle push-bottom-13px"}
                                onClick={this.toggle}>
                                <Col className="stats-remove-left-padding">
                                    <div className="scale-gun-type-img">
                                        {this.competitions[this.state.selectedCompetition].includes("Rifle") || 
                                            this.competitions[this.state.selectedCompetition].includes("rifle") ?
                                            <img src={require("../resources/awardIcons/rifle-icon.png")}></img>:
                                            <img src={require("../resources/awardIcons/white-pistol-icon.png")}></img>
                                        }
                                    </div>
                                    <div className="stats-competition-text stats-inline-text">
                                        {this.competitions[this.state.selectedCompetition]}
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
                                {this.renderLegendRectangle()}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                 {this.renderGraph(data, maxScore)}
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
                                                            <img src={require("../resources/awardIcons/graph-up-icon.png")}/>
                                                        </div>
                                                    </div>
                                                    <div className="font-size-16px red-text font-weight-bold">
                                                        {this.getMaximumValue()}</div>
                                                </Col>
                                                <Col>
                                                    <div className="black-text font-size-12px font-weight-bold">AVERAGE</div>
                                                    <div className="font-size-16px black-text padding-left-15px">
                                                        {Math.round(this.getAverage())}</div>
                                                </Col>
                                                <Col>
                                                    <div className="peach-text font-size-12px font-weight-bold">LOWEST</div>
                                                    <div className="font-size-16px grey-color padding-left-30px">
                                                        {this.getMinimumValue()}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="push-accuracy-stats">
                            <Col className="line-divider">
                                <hr/>
                            </Col>
                        </Row>
                        <Row className="push-bottom-13px">
                            <Col className="align-text-center">
                                <label className="total-title black-text">
                                    MY ACCURACY
                                </label>
                            </Col>
                        </Row>
                        <Row className="push-bottom-16px">
                            <Col>
                                <div className="margin-left-right-8px">
                                    {this.state.isAccuracyDataDone ? 
                                        this.renderLegendRectangle() : null
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.state.errorOccuredOnAccuracyData ? this.renderError(this.state.apiAccuracyResponse) :
                                    this.state.isAccuracyDataDone ?
                                        this.renderAccuracyGraph()
                                        : this.renderLoader()
                                }
                            </Col>
                        </Row>
                        {this.state.isAccuracyDataDone ?
                            <Row>
                                <Col>
                                    <div className="last-20-rectangle margin-left-right-8px">
                                        <div className="last-20-container">
                                            <div className="last-20-text">Last 10 Shoots</div>
                                            <hr/>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <div className="stats-inline-flex">
                                                            <div className="red-text font-size-12px font-weight-bold">HIGHEST</div>
                                                            <div className="stats-arrow-up">
                                                                <img src={require("../resources/awardIcons/graph-up-icon.png")}/>
                                                            </div>
                                                        </div>
                                                        <div className="font-size-16px red-text font-weight-bold">
                                                            {this.state.accuracyData.max}</div>
                                                    </Col>
                                                    <Col>
                                                        <div className="black-text font-size-12px font-weight-bold">AVERAGE</div>
                                                        <div className="font-size-16px black-text padding-left-15px">
                                                            {Math.round(this.state.accuracyData.average)}</div>
                                                    </Col>
                                                    <Col>
                                                        <div className="peach-text font-size-12px font-weight-bold">LOWEST</div>
                                                        <div className="font-size-16px grey-color padding-left-30px">
                                                            {this.state.accuracyData.min}</div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row> : null}
                    </div>
                :this.renderLoader()}
            </div>
        )
    }
}

export default StatisticsPage;