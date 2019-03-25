import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../bootstrap/UserProfile.css";
import $ from "jquery";
import { getCookie } from "./cookie.js";
import { BASE_URL } from "../actions/types.js";
import { Collapse } from "react-collapse";
import history from "./history";

class UserProfile extends Component {
        constructor(props){
            super(props);
            this.state = {
                awardCompetitions : [],
                hoursAward : {
                    hours: -1,
                },
                collapse: false,
                selectedCompetition : 0,
            }

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    UNSAFE_componentWillMount() {
        var token = getCookie("token");
        if (token === undefined) {
            history.push("/registerPage");
            return;
        }

        /*use the remote URL*/
        fetch(BASE_URL + "/api/awards/" + token, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ awardCompetitions: data });
            if (this.state.awardCompetitions.length == 0) {
            this.logout();
            history.push("/registerPage");
            }
        });

        fetch(BASE_URL + "/api/awards/hours/" + token, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ hoursAward: data });
        });
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

    animateAccuracyCircle(counter, element, index) {
        if (counter > element.accuracy) return;
        if (counter <= element.accuracy) {
        var degreees = (360 * counter) / 100;
        var activeBorder = $(`#${index}`);
        $(`#circle${index}`).html(Math.round(counter) + "%");

        if (degreees <= 180) {
            activeBorder.css(
            "background-image",
            "linear-gradient(" +
                (90 + degreees) +
                "deg, transparent 50%, #F3F4F9 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)"
            );
        } else {
            activeBorder.css(
            "background-image",
            "linear-gradient(" +
                (degreees - 90) +
                "deg, transparent 50%, #EA241A 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)"
            );
        }
        counter++;
        setTimeout(() => {
            this.animateAccuracyCircle(counter, element, index);
        }, 80);
        }
    }

    /*
        This function takes the total score as string and append zeros
        at the front if the total score has less than four digits
    */

    animateAccuracyCircle(counter, element, index){
        if(this.state.collapse) return;
        if(counter > element.accuracy) return;
        if(counter <= element.accuracy){
            var degreees = (360 * counter) / 100;
            var activeBorder = $(`#${index}`);
            $(`#circle${index}`).html(Math.round(counter)+"%");
            
            if (degreees<=180){
                activeBorder.css('background-image','linear-gradient(' + (90 + degreees) + 
                                    'deg, transparent 50%, #F3F4F9 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)');
            }
            else{
                activeBorder.css('background-image','linear-gradient(' + (degreees - 90) + 
                                'deg, transparent 50%, #EA241A 50%),linear-gradient(90deg, transparent 50%, #EA241A 50%)');
            }
            counter++;
            setTimeout(() => {
                this.animateAccuracyCircle(counter, element, index)
            }, 80)
        }
    }
    

    renderLockedIcon(){
        return(
            <div className="locked-icon">
                <img src={require("../resources/awardIcons/grey-locked-icon.png")} alt="lock-icon" />
            </div>
        )
    }

    renderActiveCircle(element,index){
        return(
            <div id={index} className="active-border">
                <div id={`circle${index}`} className="circle">
                    <label className="accuracy-text">0%</label>
                </div>
                <div>{this.animateAccuracyCircle(1, element, index)}</div>
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
                <img src={require("../resources/awardIcons/medal.png")}></img>
            </div>
        )
    }

    renderAllCompetitionsStats(){
        let renderArray = []
        this.state.awardCompetitions.forEach((element, index) => {
            renderArray.push(this.competitionsStat(element, index))
        })

        return renderArray;
    }

    setSelectedCompetition(index){
        this.setState({selectedCompetition : index})
        this.toggle();
    }

    selectCompetition(element, index){
        return(  
            <div key={index}>
                <Row>
                    <Col>
                        <button className={this.state.selectedCompetition == index ?
                             "button-style competition-button-text button-style-active" : 
                             "button-style competition-button-text button-style-inactive"}
                             onClick={() => this.setSelectedCompetition(index)}>
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
                <div className="pad-right-25px">
                    <label className="font-size-14px red-text award-type-label">ACCURACY</label>
                </div>
                <div className="circle-bigger">
                    {!element.isCompetitionLocked ?
                        this.renderActiveCircle(element,index) : this.renderRedLockIcon(index)}
                </div>
            </div>
        );
    }

    renderTotalCircle(element, index){
        return(
            <div>
                <div className="width-98px">
                    <label className="font-size-14px red-text award-type-label">TOTAL SCORE</label>
                </div>
                <div className="circle-bigger">
                    <div>
                        {!element.isCompetitionLocked ? 
                            <label className="total-text">{element.total}</label> : this.renderRedLockIcon(index)}
                    </div>
                </div>
            </div>
        );
    }

    renderBestInMonth(){
        return(
            <div className="grey-text pad-bottom-16px font-size-14px">
                {this.state.awardCompetitions[this.state.selectedCompetition].bestInMonth.toUpperCase()}
            </div>
        )
    }

    render() {
        return (
            <div className="my-container">
                {this.state.awardCompetitions.length > 0 ? //only render when the data has arrived from backend
                <Container className="remove-right-padding">
                    <Row>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="competition-name-text pad-bottom-16px">
                                <a onClick={this.toggle} className="lay-horizontal center-content">
                                    <div className="push-right-5px">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                        .competitionName.toUpperCase()}
                                    </div>
                                    <div className="down-triangle-img-scale">
                                        <img src={require("../resources/awardIcons/down-triangle.png")} alt="down-triangle">
                                        </img>
                                    </div>
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* {this.state.awardCompetitions[this.state.selectedCompetition].bestInMonth.startsWith("Best") ?
                                this.renderBestInMonth() : null} */}
                        </Col>
                    </Row>
                    <Row className="center-content competition-buttons-container">
                        <Collapse isOpened={this.state.collapse}>
                            <div className="grey-text select-competition-font">Select Competition</div>
                            {this.renderCompetitionList()}
                            <a className="scale-arrowupicon-img" onClick={() => this.toggle()}>
                                <img src={require("../resources/awardIcons/arrowUpIcon.png")} alt="lock-icon"></img>
                            </a>
                        </Collapse>
                    </Row>
                    <Row className="awards-container">
                        <Col xs={4}sm={4}md={4} className="push-bottom-41px">
                            {this.renderAccuracyCircle(this.state.awardCompetitions[this.state.selectedCompetition],
                                this.state.selectedCompetition)}
                        </Col>
                        <Col xs={8}sm={8}md={8}>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                    <label className="grey-text font-size-14px">
                                        BRONZE</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.state.awardCompetitions[this.state.selectedCompetition].accuracyAward.bronze 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className="red-text reached-award">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                            .accuracyAward.bronzeRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                    <label className="grey-text font-size-14px">
                                        SILVER</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.state.awardCompetitions[this.state.selectedCompetition].accuracyAward.silver 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className="red-text reached-award ">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                            .accuracyAward.silverRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}sm={4}md={4}>
                                    <label className="grey-text font-size-14px">
                                        GOLD</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.state.awardCompetitions[this.state.selectedCompetition].accuracyAward.gold 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className="red-text reached-award line-height-15px">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                            .accuracyAward.goldRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="awards-container">
                        <Col xs={4}sm={4}md={4} className="push-bottom-41px">
                            {this.renderTotalCircle(this.state.awardCompetitions[this.state.selectedCompetition],
                            this.state.selectedCompetition)}
                        </Col>
                        <Col xs={8}sm={8}md={8}>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                    <label className="grey-text font-size-14px">
                                        BRONZE</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.state.awardCompetitions[this.state.selectedCompetition].totalAward.bronze 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className="red-text reached-award">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                            .totalAward.bronzeRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row className="push-bottom-13px">
                                <Col xs={4}sm={4}md={4}>
                                    <label className="grey-text font-size-14px">
                                        SILVER</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.state.awardCompetitions[this.state.selectedCompetition].totalAward.silver 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className="red-text reached-award">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                            .totalAward.silverRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}sm={4}md={4}>
                                    <label className="grey-text font-size-14px">
                                        GOLD</label>
                                </Col>
                                <Col xs={2}sm={2}md={2}>
                                    {this.state.awardCompetitions[this.state.selectedCompetition].totalAward.gold 
                                    ? this.renderMedalIcon() : 
                                    this.renderLockedIcon()}
                                </Col>
                                <Col xs={6}sm={6}md={6} className="remove-right-padding">
                                    <label className="red-text reached-award line-height-15px">
                                        {this.state.awardCompetitions[this.state.selectedCompetition]
                                            .totalAward.goldRequirementStatus}
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                //only render when the data has arrived from backend
                : null} 
            </div>
        )
    }
}

export default UserProfile;
