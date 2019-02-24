import React, { Component } from 'react'
import { Container, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import '../bootstrap/UserProfile.css';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalScore : [],
            accuracy: [],
            awards : [],
        }

        this.StatsClick = this.StatsClick.bind(this);
    }

    UNSAFE_componentWillMount(){
        fetch('http://localhost:63474/api/awards/zintle',{
            method : 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => this.setState({awards : data}));
    }

    StatsClick(){
        if(!this.state.isStats){
            this.setState({isAwardsPressed : false});
            this.setState({isStats : true});
        }
    }

    render() {      
        return (
            
            <div className="card-view">
                <Row>
                    <Col id="col-profile">
                        <div className="top-pane">
                                <h5>Profile</h5>
                        </div>
                    </Col>
                    <Col id="col-icon">
                        <div className="profile-icon">
                            <img src={require('../resources/profile.png')} />
                       </div>
                    </Col>
                </Row>
                <br></br>
                <Container>
                    <Row>
                        <Col>
                            <h4>Donald Trump</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Awards & Statistics</h3>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col className="award-info">
                            {this.state.awards.length > 0 ? ForEach(this) : null}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function AwardDetails(element){
    return(
        <Container key={element.id}>
            <Row className="award-details">
                <Col>
                    <div> 
                        <img src={element.iconURL} alt="icon"></img>
                    </div>
                </Col>
                <Col>
                    <div>
                        <h6>{element.description}</h6>
                    </div>
                </Col>
                <Col>
                    <div><h6>{element.stat}</h6></div>
                </Col>
            </Row>
        </Container>
        
    )
}

function ForEach(props){
    var array = [];
    props.state.awards.forEach(element =>{
        array.push(AwardDetails(element))
    })
    return array;
}

export default UserProfile;
