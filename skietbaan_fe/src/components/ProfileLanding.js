import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap';
import '../bootstrap/ProfileLanding.css';
import UserProfile from './UserProfile';
import Documents from './Documents';

export default class ProfileLanding extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedButton : 1
        }

        this.awardPage = this.awardPage.bind(this);
        this.documentsPage = this.documentsPage.bind(this);
        this.details = this.details.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    awardPage(){
        this.setState({selectedButton: 1});
    }

    documentsPage(){
        this.setState({selectedButton : 2}); 
    }

    details(){
        this.setState({selectedButton: 3});
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

    render() {
        return (
            <div>
                <div className={this.state.selectedButton == 1 ? "fix-top pad-bottom-20px"
                    : this.state.selectedButton == 2 ? "fix-top pad-bottom-0px" : "fix-top"}>
                <Row className="top-bar-rectangle">
                    <Col className="lay-horizontal">
                        <div className="center-block-content">

                        </div>
                        <a href="#" onClick={this.logout}>
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
                                        "unstyle-button btn-block button-fill"} onClick={this.awardPage}>
                                    <label className="button-text">AWARDS</label>
                                </button>
                            </div>
                        </Col>
                        <Col id="pad-middle-button" className="pad-button-text-top">
                            <div>
                                <button className={this.state.selectedButton == 2 ? 
                                        "unstyle-button-active btn-block button-fill" : 
                                        "unstyle-button btn-block button-fill"} onClick={this.documentsPage}>
                                    <label className="button-text">DOCUMENTS</label>
                                </button>
                            </div>
                        </Col>
                        <Col id="remove-right-button-padding" className="pad-button-text-top">
                            <div>
                                <button className={this.state.selectedButton == 3 ?  
                                        "unstyle-button-active btn-block button-fill" : 
                                        "unstyle-button btn-block button-fill"} onClick={this.details}>
                                    <label className="button-text">DETAILS</label>
                                </button> 
                            </div>
                        </Col>
                    </div>
                    </Row>
                </div>
                </div>
                <div className={this.state.selectedButton == 1 ? "content-container pad-top-150px" :
                    this.state.selectedButton == 2 ? "content-container pad-top-50px" : "content-container"}>
                    {this.state.selectedButton == 1 ? <UserProfile/> : 
                        this.state.selectedButton == 2 ? <Documents/> : 
                            null}
                </div>
            </div>
            
        )
    }
}
