import React, { Component } from 'react'
import { Container, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import '../bootstrap/UserProfile.css';
import { func } from 'prop-types';
import $ from "jquery";
import { inherits } from 'util';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            awardCompetitions : [],
        }
    }

    UNSAFE_componentWillMount(){
        /*user the remote URL*/
        fetch('http://localhost:63472/api/awards/9d44cbcf4b81',{
            method : 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({awardCompetitions : data}));   
    }

    AnimateAccuracyCircle(counter, element, index){
        
        if(counter <= element.accuracy){
            var degreees = (360 * counter) / 100;
            var activeBorder = $(`#${index}`);
            $(`#circle${index}`).html(Math.round(counter)+"%");
            
            if (degreees<=180){
                activeBorder.css('background-image','linear-gradient(' + (90 + degreees) + 
                                    'deg, transparent 50%, #0c0c0e 50%),linear-gradient(90deg, transparent 50%, white 50%)');
            }
            else{
                activeBorder.css('background-image','linear-gradient(' + (degreees - 90) + 
                                'deg, transparent 50%, white 50%),linear-gradient(90deg, transparent 50%, white 50%)');
            }
            counter++;
            setTimeout(() => {
                this.AnimateAccuracyCircle(counter, element, index)
            }, 80)
        }
    }

    /*
        This function takes the total score as string and append zeros
        at the front if the total score has less than four digits
    */
    Tokenize(str){
        var _array = []
        if(str == null){
            _array = ["0", "0", "0", "0"]
            return _array
        }else{
            var loopCount = 4 - str.length
            _array = str.split("")
            
            if(loopCount > 0){
                for(var i = 0; i < loopCount; i++){
                    _array.unshift("0") //append zeros at start of array
                }
            }
        }

        return _array
    }

    SetDigits(str, isCompetitionLocked){
        var _array = this.Tokenize(str)
        return(
            <div className="lay-horizontal">
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[0]}</label></div>
                </div>
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[1]}</label></div>
                </div>
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[2]}</label></div>
                </div>
                <div className={isCompetitionLocked ? "box box-grey-background" : "box box-white-background"}>
                    <div className={isCompetitionLocked ? "grey-text" : "black-text"}><label className="box-label-text">
                    {_array[3]}</label></div>
                </div>
            </div>
        )
    }    
    
    RenderLockedIcon(){
        return(
            <div className="locked-icon" style={{display: "inline"}}>
                <img src={require("../resources/awardIcons/locked.png")} alt="lock-icon" />
            </div>
        )
    }

    CompetitionsStat(element, index){
        return(
            <div className={element.isCompetitionLocked ? "shooting-award push-shooting-award-bottom grey-text" :
             "shooting-award push-shooting-award-bottom white-text"} key={index}>
                <Row>
                    <Row>
                        <Col>
                            <div className="float-left">
                                <h3>{element.competitionName}</h3>
                            </div>
                        </Col>
                        <Col>
                            {element.isCompetitionLocked ? this.RenderLockedIcon() : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{paddingLeft : "0px"}}>
                            <div className="month-award">
                                    {/*make month and year dynamic | remove if no month award*/}
                                    <label className="light-weight">January 2019 - <span id="month-award-description">Best Shooter</span></label>
                            </div>
                        </Col>
                        <Col className="bullet-col" xs={3} sm={3} md={3} lg={3} xl={3}>
                            <div className="bullet-img-scale">
                                <img src={require("../resources/awardIcons/bullet.png")}></img>
                            </div>
                        </Col>
                    </Row>
                    {/*<Col className="month-col" xs={9} sm={9} md={9} lg={9} xl={9}>
                        <div className="float-left">
                            <div>
                                <h3>{element.competitionName}</h3>
                                {element.isCompetitionLocked ? this.RenderLockedIcon() : null}
                            </div>
                            <div className="month-award">
                                {/*make month and year dynamic | remove if no month award}
                                <label className="light-weight">January 2019 - <span id="month-award-description">Best Shooter</span></label>
                            </div>
                        </div>
                    </Col>
                    <Col className="bullet-col" xs={3} sm={3} md={3} lg={3} xl={3}>
                        <div className="bullet-img-scale">
                            <img src={require("../resources/awardIcons/bullet.png")}></img>
                        </div>
                </Col>*/}
                </Row>
                <div className="push-bottom-27px">
                    <Row>
                        <Col>
                            <div className="shooting-award-left push-bottom hours-heading">
                                My Total Score
                            </div>
                            <div className="right push-bottom">
                                {this.SetDigits(element.total, element.isCompetitionLocked)}
                            </div>
                        </Col>
                        <Col>
                            <div className="lay-horizontal scale-img">
                                <img src={element.isCompetitionLocked ? require('../resources/awardIcons/black-icon.png') :
                                    require('../resources/awardIcons/gold-icon.png')} alt="locked award" />
                                <img src={element.isCompetitionLocked ? require('../resources/awardIcons/black-icon.png') :
                                    require('../resources/awardIcons/silver-icon.png')} alt="silver award" />
                                <img src={element.isCompetitionLocked ? require('../resources/awardIcons/black-icon.png') :
                                    require('../resources/awardIcons/bronze-icon.png')} alt="bronze award" />
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <div className="shooting-award-left">
                            <div className="push-bottom-8px hours-heading">My Accuracy</div>
                            <div id={index} className="active-border">
                                <div id={`circle${index}`} className="circle">
                                    <label>0%</label>
                                </div>
                            </div>
                        </div>
                        <div>{this.AnimateAccuracyCircle(1, element, index)}</div>
                    </Col>
                    <Col>
                        <div className="lay-horizontal scale-img">
                            <img src={element.isCompetitionLocked ? require('../resources/awardIcons/black-icon.png') :
                                require('../resources/awardIcons/gold-icon.png')} alt="gold award" />
                            <img src={element.isCompetitionLocked ? require('../resources/awardIcons/black-icon.png') :
                                require('../resources/awardIcons/silver-icon.png')} alt="silver award" />
                            <img src={element.isCompetitionLocked ? require('../resources/awardIcons/black-icon.png') :
                                require('../resources/awardIcons/bronze-icon.png')} alt="bronze award" />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    //map all sheet using dictionary then in the anim function change the css then mount

    RenderAllCompetitionsStats(){
        let renderArray = []
        var i = 1
        this.state.awardCompetitions.forEach((element, index) => {
            renderArray.push(this.CompetitionsStat(element, index))
        })
        
        return renderArray;
    }

    render() {
        return (
            <div>
                <div className="row" style={{backgroundColor: "black"}}>
                    <Col>
                        <label className="username">
                            {this.state.awardCompetitions.length > 0 ? this.state.awardCompetitions[0].username : null}    
                        </label></Col>
                </div>
                <Container>
                    <div className="member-number white-text">
                        <label className="light-weight">Membership No:<span id="member-number-span">{this.state.awardCompetitions.length > 0 ?
                            this.state.awardCompetitions[0].membershipNumber : null}</span>
                        </label>
                    </div>
                    <div className="page-title white-text"><label>Awards & Statistics</label></div>
                    <div className="restrict-row-height">
                        <Row>
                            <Col>
                                <div className="hours-award">
                                    <div className=" hours-heading white-text"><label>Hours Shooting</label></div>
                                    <div className="lay-horizontal center">
                                        {/*make hours dynamic*/}
                                        {this.state.awardCompetitions.length > 0 ?
                                            this.SetDigits("0900") : this.SetDigits(null)}
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="lay-horizontal scale-img">
                                    <img src={require('../resources/awardIcons/black-icon.png')} alt="locked award" />
                                    <img src={require('../resources/awardIcons/silver-icon.png')} alt="silver award" />
                                    <img src={require('../resources/awardIcons/bronze-icon.png')} alt="bronze award" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div>{this.state.awardCompetitions.length > 0 ? this.RenderAllCompetitionsStats() : null}</div>
                </Container>
            </div>
        )
    }
}

export default UserProfile;
