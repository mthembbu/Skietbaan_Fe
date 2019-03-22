import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap';
import '../bootstrap/ProfileLanding.css';
import UserProfile from './UserProfile';
import Documents from './Documents';
import $ from "jquery";

export default class ProfileLanding extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedButton : 1
        }

        this.AwardPage = this.AwardPage.bind(this);
        this.DocumentsPage = this.DocumentsPage.bind(this);
        this.Details = this.Details.bind(this);
        this.Logout = this.Logout.bind(this);
    }
    
    AwardPage(){
        this.setState({selectedButton: 1});
        $(".fix-top").css("padding-bottom","55px");
        $(".content-container").css("padding-top", "150px");
    }

    DocumentsPage(){
        this.setState({selectedButton : 2});
        $(".fix-top").css("padding-bottom","0px");
        $(".content-container").css("padding-top", "50px");
    }

    Details(){
        this.setState({selectedButton: 3});
    }

    Logout(){
        var res = document.cookie;
        var multiple = res.split(";");
        for(var i = 0; i < multiple.length; i++) {
            var key = multiple[i].split("=");
            document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        }
        window.location= '/login';
        return false;
    }

    render() {
        return (
            <div>
                <div className="fix-top">
                <Row className="top-bar-rectangle">
                    <Col className="lay-horizontal">
                        <div className="center-block-content">

                        </div>
                        <a href="#" onClick={this.Logout}>
                            <div className="logout-button">
                                <label className="logout-text">Logout</label>
                            </div>
                        </a>
                    </Col>
                </Row>
                <div className="buttons-container">
                    <Row className="buttons-row">
                    <div className="buttons-rectangle lay-horizontal">
                        <Col id="remove-left-button-padding" className="pad-button-text-top">
                            <div>
                                <button className={this.state.selectedButton == 1 ? 
                                        "unstyle-button-active btn-block button-fill" : 
                                        "unstyle-button btn-block button-fill"} onClick={this.AwardPage}>
                                    <label className="button-text">AWARDS</label>
                                </button>
                            </div>
                        </Col>
                        <Col id="pad-middle-button" className="pad-button-text-top">
                            <div>
                                <button className={this.state.selectedButton == 2 ? 
                                        "unstyle-button-active btn-block button-fill" : 
                                        "unstyle-button btn-block button-fill"} onClick={this.DocumentsPage}>
                                    <label className="button-text">DOCUMENTS</label>
                                </button>
                            </div>
                        </Col>
                        <Col id="remove-right-button-padding" className="pad-button-text-top">
                            <div>
                                <button className={this.state.selectedButton == 3 ?  
                                        "unstyle-button-active btn-block button-fill" : 
                                        "unstyle-button btn-block button-fill"} onClick={this.Details}>
                                    <label className="button-text">DETAILS</label>
                                </button> 
                            </div>
                        </Col>
                    </div>
                    </Row>
                </div>
                </div>
                <div className="content-container">
                    {this.state.selectedButton == 1 ? <UserProfile/> : 
                        this.state.selectedButton == 2 ? <Documents/> : 
                            null}
                </div>
            </div>
            
        )
    }
}
