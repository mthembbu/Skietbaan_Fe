import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../bootstrap/UserProfile.css";
import $ from "jquery";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types.js";
import { Collapse } from "react-collapse";
import history from "./history";
import { connect } from "react-redux";
import { setSelectedCompetition } from "../actions/userProfileActions"

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            awardCompetitions : [],
            hoursAward : {
                hours: -1,
            },
            collapse: false,
            exceptionCaught: false
        }
        
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.timeouts = [];
        this.mapCompetitionNameToIndex = {}
        this._isMounted = false;
        this.isBestInMonth = false;
    }

    UNSAFE_componentWillMount() {
        var token = getCookie("token");
        if (token == undefined) {
            history.push("/registerPage");
            return;
        }

        fetch(BASE_URL + "/api/awards/" + token, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                data.forEach((element, index) => {
                    this.mapCompetitionNameToIndex[element.competitionName] = index;
                })
                this.setState({ awardCompetitions: data });
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });

        fetch(BASE_URL + "/api/awards/hours/" + token, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(this._isMounted){
                this.setState({ hoursAward: data });
            }
        }).catch(() => {
            this.setState({ exceptionCaught: true });
        });
    }

    componentDidMount(){
        this._isMounted = true;
    }

    logout(){
        var res = document.cookie;
        var multiple = res.split(";");
        for(var i = 0; i < multiple.length; i++) {
            var key = multiple[i].split("=");
            document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        }
        window.location= '/login';
        return false;
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    animateAccuracyCircle(counter, element, index){
        if(this.state.collapse) return;
        if(counter <= element.accuracy){
            var degreees = (360 * counter) / 100;
            var activeBorder = $(`#${index}`);
            $(`#circle${index}`).html(Math.round(counter)+"%");
            
            if (degreees<=180){
                activeBorder.css('background-image','linear-gradient(' + (90 + degreees) + 
                                'deg, transparent 50%, #F3F4F9 50%),linear-gradient(90deg, transparent 50%, #BE0000 50%)');    
            }
            else{
                activeBorder.css('background-image','linear-gradient(' + (degreees - 90) + 
                                'deg, transparent 50%, #BE0000 50%),linear-gradient(90deg, transparent 50%, #BE0000 50%)');
            }
            counter++;
            const timeout = setTimeout(() => {
                this.animateAccuracyCircle(counter, element, index)
            }, 80)
            this.timeouts.push(timeout);
        }else{
            $(`#circle${index}`).html(element.accuracy+"%");
        }
    }

    renderLockedIcon(){
        return(
            <div className="locked-icon">
                <img src={require("../resources/awardIcons/light-red-locked-icon.png")} alt="lock-icon" />
            </div>
        )
    }

    renderActiveCircle(element,index){
        return(
            <div id={index} className="active-border">
                <div id={`circle${index}`} className={element.accuracy.toString().split(".")[0].length > 2 ? 
                    "circle font-size-15px" : "circle font-size-18px"}>
                    <label className="accuracy-text">0%</label>
                </div>
                {this.animateAccuracyCircle(0, element, index)}
            </div>
        )
    }

    renderRedLockIcon(){
        return(
            //TODO: find a better solution for removing background image after the animateAccuracyCircle
            //function is called (remove inline styling)
            <div className="lock-img-scale" style={{backgroundImage : "none"}}>
                <img src={require("../resources/awardIcons/red-locked-icon.png")} alt="lock image"></img>
            </div>
        )
    }

    renderMedalIcon(){
        return(
            <div className="medal-img">
                <img src={require("../resources/awardIcons/medal-icon.png")}></img>
            </div>
        )
    }

    setSelectedCompetition(competitionName){
        this.props.setSelectedCompetition(competitionName);
        this.toggle();
    }

    selectCompetition(element, index){
        return(  
            <div key={index}>
                <Row>
                    <Col>
                        <button className={this.getIndexByCompetitionName(this.props.selectedCompetition) === index ?
                             "button-style competition-button-text button-style-active" : 
                             "button-style competition-button-text button-style-inactive"}
                             onClick={() => this.setSelectedCompetition(element.competitionName)}>
                            {element.competitionName}
                        </button>
                    </Col>
                </Row>
            </div>
        )
    }

    renderCompetitionList(){
        let renderArray = []
        this.state.awardCompetitions.forEach((element, index) => {
            renderArray.push(this.selectCompetition(element, index))
        })

        return renderArray;
    }

    renderAccuracyCircle(element, index){
        return(
            <div>
                <div className="align-accuracy-text">
                    <label className="font-size-14px unlocked-award-text award-type-label">ACCURACY</label>
                </div>
                <div className="circle-bigger">
                    {!element.isCompetitionLocked ?
                        (element.accuracy === 0 ? <label className="accuracy-text">0%</label> : this.renderActiveCircle(element,index))
                        : this.renderRedLockIcon(index)}
                </div>
            </div>
        );
    }

    renderTotalCircle(element, index){
        return(
            <div>
                <div className="total-text-alignement">
                    <label className="font-size-14px unlocked-award-text award-type-label">TOTAL SCORE</label>
                </div>
                <div className="circle-bigger">
                    <div>
                        {!element.isCompetitionLocked ? 
                            <label className="total-text">{element.total}</label> : this.renderRedLockIcon(index)}
                        {!element.isCompetitionLocked ? 
                            <div className="total-img-scale">
                                <img src={require("../resources/awardIcons/total-icon.png")} alt="total-icon"></img>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }

    getIndexByCompetitionName(competitionName){
        return this.mapCompetitionNameToIndex[competitionName];
    }

    getInitialAward(){
        if(this.props.selectedCompetition.length === 0){
            return this.state.awardCompetitions[0]
        }else{
            return this.state.awardCompetitions[this.getIndexByCompetitionName(this.props.selectedCompetition)]
        }
    }

    renderBestInMonth(){
        {this.isBestInMonth = true}
        return(
            <div className="grey-text pad-bottom-16px font-size-14px best-month-text">
                {this.state.awardCompetitions[
                    this.getIndexByCompetitionName(this.props.selectedCompetition)].bestInMonth.toUpperCase()}
            </div>
        )
    }

    componentWillUnmount() {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this._isMounted = false;
    }
    
    render() {
        return (
            <div className="award-container pad-award-container">
                {this.state.exceptionCaught ? <div className="no-competition">No Competitions Available</div> :
                //only render when the data has arrived from backend
                this.state.awardCompetitions.length > 0 ?
                <div className="remove-right-padding">
                    <Row>
                        <Col>
                        <a onClick={this.toggle} className="make-cursor-point">
                        <div className="buttons-rectangle">
                            <div className="scale-gun-type-img">
                                {this.getInitialAward().competitionName.includes("Rifle") || 
                                    this.getInitialAward().competitionName.includes("rifle") ?
                                    <img src={require("../resources/awardIcons/rifle-icon.png")}></img>:
                                    <img src={require("../resources/awardIcons/pistol-icon.png")}></img>
                                }
                            </div>
                            <div className="competition-name-text red-text">
                                <div className="center-content profile-landing-vertical-align">    
                                    <div className="push-right-5px lighter-font">
                                        {this.getInitialAward().competitionName.toUpperCase()}
                                    </div>
                                    <div className="down-triangle-img-scale">
                                        <img src={require("../resources/awardIcons/down-triangle.png")} alt="down-triangle">
                                        </img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.getInitialAward().bestInMonth.startsWith("Best") ?
                                this.renderBestInMonth() : null}
                        </Col>
                    </Row>
                    <Row className="center-content competition-buttons-container">
                        <Col>
                            <Collapse isOpened={this.state.collapse}>
                                <div className="grey-text select-competition-font">Select Competition</div>
                                <div className="award-buttons-container">{this.renderCompetitionList()}</div>
                                <a className="scale-arrowupicon-img" onClick={this.toggle}>
                                    <img src={require("../resources/awardIcons/arrowUpIcon.png")} alt="lock-icon"></img>
                                </a>
                            </Collapse>
                        </Col>
                    </Row>
                    <div className={this.isBestInMonth ? "awards-container-background margin-top-43px" :
                    "awards-container-background margin-top-60px"}>
                    <div className="line adjust-top-line"></div>
                    <Row className="awards-container pad-top-30px">
                        <Col xs={4}sm={4}md={4} className="push-bottom-49px">
                            {this.renderAccuracyCircle(this.getInitialAward(),
                                this.getIndexByCompetitionName(this.getInitialAward().competitionName))}
                        </Col>
                        <Col xs={7}sm={7}md={7}>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                    <label className={this.getInitialAward().accuracyAward.bronze ?
                                        "unlocked-award-text font-size-14px" : 
                                        "locked-award-text font-size-14px"}>BRONZE</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.getInitialAward().accuracyAward.bronze 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className={this.getInitialAward().accuracyAward.bronze ? 
                                        "reached-award unlocked-award-text":
                                        "reached-award locked-award-text"}>
                                        {this.getInitialAward().accuracyAward.bronzeRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                <label className={this.getInitialAward().accuracyAward.silver ? 
                                    "unlocked-award-text font-size-14px" : 
                                    "locked-award-text font-size-14px"}>SILVER</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.getInitialAward().accuracyAward.silver 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className={this.getInitialAward().accuracyAward.silver ? 
                                        "reached-award unlocked-award-text":
                                        "reached-award locked-award-text"}>
                                        {this.getInitialAward().accuracyAward.silverRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}sm={4}md={4}>
                                <label className={this.getInitialAward().accuracyAward.gold ? "unlocked-award-text font-size-14px" : 
                                    "locked-award-text font-size-14px"}>GOLD</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.getInitialAward().accuracyAward.gold 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className={this.getInitialAward().accuracyAward.gold ? 
                                        "reached-award unlocked-award-text":
                                        "reached-award locked-award-text"}>
                                        {this.getInitialAward().accuracyAward.goldRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="line adjust-bottom-line"></div>
                    <Row className="awards-container">
                        <Col xs={4}sm={4}md={4} className="push-bottom-49px">
                            {this.renderTotalCircle(this.getInitialAward(),
                            this.getIndexByCompetitionName(this.getInitialAward().competitionName))}
                        </Col>
                        <Col xs={7}sm={7}md={7}>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                <label className={this.getInitialAward().totalAward.bronze ? 
                                    "unlocked-award-text font-size-14px" : 
                                    "locked-award-text font-size-14px"}>BRONZE</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.getInitialAward().totalAward.bronze 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className={this.getInitialAward().totalAward.bronze ? 
                                        "reached-award unlocked-award-text":
                                        "reached-award locked-award-text"}>
                                        {this.getInitialAward().totalAward.bronzeRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                <label className={this.getInitialAward().totalAward.silver ? 
                                    "unlocked-award-text font-size-14px" : 
                                    "locked-award-text font-size-14px"}>SILVER</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.getInitialAward().totalAward.silver 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                <label className={this.getInitialAward().totalAward.silver ? 
                                        "reached-award unlocked-award-text":
                                        "reached-award locked-award-text"}>
                                        {this.getInitialAward().totalAward.silverRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}sm={4}md={4}>
                                <label className={this.getInitialAward().totalAward.gold ?
                                    "unlocked-award-text font-size-14px" : 
                                    "locked-award-text font-size-14px"}>GOLD</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.getInitialAward().totalAward.gold 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className={this.getInitialAward().totalAward.gold ? 
                                        "reached-award unlocked-award-text":
                                        "reached-award locked-award-text"}>
                                        {this.getInitialAward().totalAward.goldRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="line adjust-bottom-line"></div>
                    </div>
                </div>
                //only render when the data has arrived from backend
                : null}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
	selectedCompetition: state.awardsReducer.selectedCompetition,
});

export default connect(mapStateToProps, {setSelectedCompetition})(UserProfile);
