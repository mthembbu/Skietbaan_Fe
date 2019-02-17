import React, { Component } from 'react'
import { Container, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import './UserProfile.css';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalScore : [],
            accuracy: [],
            awards : [],
        }

        this.StatsClick = this.StatsClick.bind(this);
        this.AwardsClick = this.AwardsClick.bind(this);
    }

    componentWillMount(){
        fetch('http://localhost:63474/api/awards/worked',{
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

    AwardsClick(){
        Icon(this)
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
                        <Col>
                            {this.state.awards.length > 0 ? ForEach(this) : null}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function Icon(iconURL, id){
    return(
        <div className="icon" key={id}>
            <img src={iconURL} alt="icon"></img>
        </div>
    )
}

function ForEach(props){
    var x = [];
    props.state.awards.forEach(element =>{
        x.push(Icon(element.iconURL, element.id))
    })
    return x;
}

export default UserProfile;
