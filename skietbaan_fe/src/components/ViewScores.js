import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedPage, updateSelectedCompetition } from "../actions/postActions";
import { BASE_URL } from "../actions/types.js";
import PropTypes from "prop-types";
import { getCookie } from "./cookie.js";
import { toggleToggleBar } from "./toggle.js";
import { checkUserType } from "../actions/adminAction";
import "../components/ScoreCapture.css";
class ViewScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionsList: [],
            getData: false,
            exceptionCaught: false,
            somethingClicked: false,
            clicked: null,
            token: getCookie("token"),
            scoresList: [],
            getDataScores: false,
            cameraClicked: false,
            someScoreClicked: null,
            lastName: "",
            duplicate: false

        };
        this.competitionClicked = this.competitionClicked.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.showPhoto = this.showPhoto.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this)
    }

    removeDuplicates(name) {
        if (this.state.lastName === name) {
            this.setState({
                duplicate: true
            })
        } else {
            this.setState({
                lastName: name
            })
            return this.state.lastName
        }
    }

    showPhoto(item) {
        this.setState({
            cameraClicked: !this.state.cameraClicked,
            someScoreClicked: item
        })
    }

    formatTime(time) {
        let formattedHours = time.substring(11, 16);
        let formattedYears = time.substring(0, 10);
        let formattedTime = formattedHours + " - " + formattedYears;
        return formattedTime;
    }

    competitionClicked(item, compName, compId) {
        this.setState({
            somethingClicked: true,
            clicked: item,
            competitionName: compName,
        });
        toggleToggleBar();
        if (compId !== "" && this.props.isAdmin === false) {
            fetch(BASE_URL + "/api/Scores/" + compId + "/" + this.state.token, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    return data;
                })
                .then(data =>
                    this.setState({
                        scoresList: data,
                        getDataScores: true
                    })
                )
                .catch(err => {
                    this.setState({ exceptionCaught: true })
                });
        } else if (this.props.isAdmin) {
            fetch(BASE_URL + "/api/Scores/GetUsers/" + compId, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    return data;
                })
                .then(data =>
                    this.setState({
                        scoresList: data,
                        getDataScores: true
                    })
                )
                .catch(err => {
                    this.setState({ exceptionCaught: true })
                });
        }

    }

    cancelClicked() {
        if (this.state.somethingClicked) {
            toggleToggleBar();
            this.setState({
                somethingClicked: !this.state.somethingClicked,
                clicked: null,
                cameraClicked: false
            });
        }
    }

    componentDidMount() {
        this.props.selectedPage(2);
        this.props.checkUserType(this.state.token);
        fetch(BASE_URL + "/api/Competition", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ competitionsList: data, getData: true }))
            .catch(err => {
                this.setState({ exceptionCaught: true })
            });
    }

    render() {

        let competitionItem = [];
        if (this.state.competitionsList && this.state.competitionsList.length > 0) {
            for (let i = 0; i < this.state.competitionsList.length; i++) {
                competitionItem.push(
                    <div className="competition-item-container" key={"mykey" + i}>
                        <div
                            key={"mykey" + i}
                            className={
                                this.state.somethingClicked === false &&
                                    this.state.clicked === null
                                    ? "competition-item"
                                    : this.state.clicked != null && this.state.clicked === i
                                        ? "competition-item active"
                                        : "competition-item fade-out"
                            }
                        >
                            <li
                                className="li-container"
                                onClick={() =>
                                    this.competitionClicked(
                                        i,
                                        this.state.competitionsList[i].name,
                                        this.state.competitionsList[i].id
                                    )
                                }
                            >
                                {this.state.competitionsList[i].name.toUpperCase()}
                            </li>
                            <div
                                onClick={() => this.cancelClicked()}
                                className="competiton-cancel-button"
                            />
                        </div>
                    </div>
                );
            }
        } else if (this.state.getData === true || this.state.exceptionCaught === true) {
            competitionItem.push(
                <div className="not-active">
                    <div className="not-active-message">
                        No Competitions available at this point, we’ll have them ready soon
                        !
          </div>
                </div>
            );
        }

        let loader = (
            <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                "loading-container-add-score" : "hidden "}>
                <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                    "loader" : "hidden"} />
                <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                    "target-loader-image" : "hidden"} />
                <div className={this.state.getData === false && this.state.exceptionCaught === false ?
                    "loading-message" : "hidden "}>Loading...</div>
            </div>
        )

        let scoreListForUser = [];
        if (this.state.scoresList.length !== 0 && this.state.getDataScores !== false && this.props.isAdmin === false) {
            for (let i = 0; i < this.state.scoresList.length; i++) {
                scoreListForUser.push(
                    <div className={this.state.cameraClicked === false || this.state.someScoreClicked === i ?
                        "score-content" : "hidden"}>
                        <div className="user-scores">{this.state.scoresList[i].userScore}
                        </div>
                        <div className="stretched min-height-22">
                            <div className="date-view-score float-left">
                                {this.formatTime(this.state.scoresList[i].uploadDate)}
                            </div>
                            <div className={this.state.scoresList[i].pictureURL !== "" ?
                                "view-scores-photo" : "hidden"} onClick={() => this.showPhoto(i)}>
                            </div>
                        </div>
                        <div className="border-line">
                        </div>
                        <div className={this.state.cameraClicked === false || this.state.someScoreClicked !== i
                            ? "hidden" : "image-container-view-scores"}>
                            <img className={this.state.cameraClicked === false || this.state.someScoreClicked !== i
                                ? "hidden" : "image-view background"}
                                src={this.state.scoresList[i].pictureURL}>
                            </img>
                        </div>
                    </div>
                )
            }
        }

        let adminScoresList = [];
        if (this.state.scoresList.length !== 0 && this.state.getDataScores !== false && this.props.isAdmin === true) {
            for (let i = 0; i < this.state.scoresList.length; i++) {
                adminScoresList.push(
                    <div className="score-content">
                        <div className="users-container">
                            <div className="usernames">{this.state.scoresList[i].username}</div>
                            <div className="user-emails">{this.state.scoresList[i].email}</div>
                        </div>
                        <div className="border-line">
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="page-content">
                <div className={this.state.somethingClicked === true ? "padding-top-40" : "centre-labels"}>
                    <label className={this.state.somethingClicked === true ? "hidden" : "label-competition"}>
                        Select Competition
                  </label>
                </div>
                {loader}
                <div className="view-score-competition-container">
                    {competitionItem}
                </div>
                <div className={this.state.clicked === null ?
                    "hidden" : "score-list-container"}>
                    {this.props.isAdmin === false ? (
                        <div>{scoreListForUser}</div>
                    ) : (
                            <div className="view-scores-input-container">
                                <input
                                    placeholder="Search"
                                    className="score"
                                    type="text"
                                ></input>
                                <div>
                                    {adminScoresList}
                                </div>
                            </div>

                        )}
                </div>
            </div>
        )
    }
}

ViewScores.propTypes = {
    checkUserType: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    selectedButton: state.landingReducer.selectedLandingPage,
    isAdmin: state.adminReducer.isAdmin
});

export default connect(
    mapStateToProps,
    { selectedPage, updateSelectedCompetition, checkUserType }
)(ViewScores);