import React, { Component } from 'react';
import { getCookie } from './cookie.js';
import { URL } from '../actions/types.js';
import '../components/ViewScores.css';

class ViewScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoresList: []
        }
    }

    componentDidMount() {
        let token = getCookie("token");
        fetch(URL + "/api/Scores/" + token, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            })
            .then(data => {
                this.setState({
                    scoresList: data
                });
            })
            .catch(function (data) {
            });
    }

    render() {
        let displayScores = [];
        if (this.state.scoresList.length > 0) {
            for (let i = 0; i < this.state.scoresList.length; i++) {
                displayScores.push(<div className="scores-list">{this.state.scoresList[i].userScore}
                    <div className={this.state.scoresList[i].pictureURL !== "" ? "view-scores-image" : "hidden"}>
                        <img src={this.state.scoresList[i].pictureURL}></img>
                    </div>
                </div>)
            }
        }
        return (
            <div className="view-scores-page-content">
                <div className="display-scores">
                    {displayScores}
                </div>
            </div>


        );
    }
}

export default ViewScores;