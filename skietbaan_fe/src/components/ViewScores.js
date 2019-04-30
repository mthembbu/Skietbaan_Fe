import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedPage, updateSelectedCompetition } from "../actions/postActions";
import { BASE_URL } from "../actions/types.js";
import PropTypes from "prop-types";
import { getCookie } from "./cookie.js";
import { toggleToggleBar } from "./toggle.js";
import { checkUserType } from "../actions/adminAction";
import whiteBin from './GroupImages/whiteBin.png';
import blackBin from './GroupImages/blackBin.png';
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
            usersList: [],
            cameraClicked: false,
            someScoreClicked: null,
            lastName: "",
            duplicate: false,
            competitionId: null,
            userClicked: false,
            someUserClick: null,
            originalUserList: [],
            username: "",
            email: "",
            clickedOnBin: false,
            itemsToDelete: [],
            toggleDeletionIcon: false,
            markedForDeletion: false,
            amountBeingDeleted: 0,

        };
        this.competitionClicked = this.competitionClicked.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.showPhoto = this.showPhoto.bind(this);
        this.getScoresForAdmin = this.getScoresForAdmin.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.usernameCancelClicked = this.usernameCancelClicked.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
        this.markedForDeletion = this.markedForDeletion.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.delete = this.delete.bind(this);
        this.cancel = this.cancel.bind(this)
    }

    cancel() {
        this.toggleNavbar();
        for (var i = 0; i < this.state.scoresList.length; i++) {
            this.state.scoresList[i].markedForDeletion = false;
        }
        this.setState({
            toggleDeletionIcon: false,
            clickedOnBin: false,
            markedForDeletion: false
        });
    }

    delete() {
        const deletingArray = [];
        for (var i = 0; i < this.state.scoresList.length; i++) {
            if (this.state.scoresList[i].markedForDeletion === true) {
                deletingArray.push(this.state.scoresList[i]);
            }
        }
        fetch(BASE_URL + '/api/Scores/DeleteScoresById', {
            method: 'Post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletingArray)
        })
            .then((res) => res.json())
            .then(this.setState({
                toggleDeletionIcon: false,
                clickedOnBin: false,
                markedForDeletion: false
            }),
                this.toggleNavbar()
            )
            .catch(function (data) { }).catch(err => {
                /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
            });
        this.competitionClicked()
    }

    toggleNavbar() {
        this.setState({
            navbarState: !this.state.navbarState
        });
        var navbar = document.querySelector(".navbar-admin");
        if (navbar.classList.contains("hidden")) {
            navbar.classList.remove("hidden");
            navbar.removeAttribute("hidden");
        } else {
            navbar.classList.add("hidden");
            navbar.setAttribute("hidden", "true");
        }
    }

    markedForDeletion(index) {

        let temp = this.state.scoresList;
        let amountBeingDeleted = this.state.amountBeingDeleted;
        if (amountBeingDeleted == 0) {
            this.toggleNavbar();
        }
        if (temp[index].markedForDeletion) {
            temp[index].markedForDeletion = false;
            amountBeingDeleted -= 1;
        }
        else {
            temp[index].markedForDeletion = true
            amountBeingDeleted += 1;
        }

        if (amountBeingDeleted == 0) {
            this.toggleNavbar();
        }

        this.setState({
            scoresList: temp,
            markedForDeletion: amountBeingDeleted > 0 ? true : false,
            amountBeingDeleted: amountBeingDeleted
        })

    }

    changeIcon() {
        for (var i = 0; i < this.state.scoresList.length; i++) {
            this.state.scoresList[i].markedForDeletion = false;
        }
        this.setState({
            clickedOnBin: !this.state.clickedOnBin,
            markedForDeletion: false,
            toggleDeletionIcon: false,
        });
        if(this.state.markedForDeletion && this.state.clickedOnBin){
            this.toggleNavbar();
        }
    }

    showPhoto(item) {
        this.setState({
            cameraClicked: !this.state.cameraClicked,
            someScoreClicked: item
        })
    }

    handleSearch({ target }) {
        let tempList = [];
        for (var i = 0; i < this.state.originalUserList.length; i++) {
            let username = this.state.originalUserList[i].username;
            let emailAddress = this.state.originalUserList[i].email;
            if (username.indexOf(target.value) > -1 || emailAddress.indexOf(target.value) > -1)
                tempList.push(this.state.originalUserList[i]);
        }
        this.setState({
            usersList: tempList
        });
    }

    getScoresForAdmin(token, item, emailUser, username) {
        this.setState({
            userClicked: !this.state.userClicked,
            someUserClick: item,
            username: username,
            email: emailUser
        })
        fetch(BASE_URL + "/api/Scores/" + this.state.competitionId + "/" + token, {
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

    formatTime(time) {
        let formattedHours = time.substring(11, 16);
        let formattedYears = time.substring(0, 10);
        let formattedTime = formattedHours + " - " + formattedYears;
        return formattedTime;
    }

    competitionClicked(item, compName, compId) {
        if (this.state.clicked == null) {
            this.setState({
                somethingClicked: true,
                clicked: item,
                competitionName: compName,
                competitionId: compId
            });
            document.getElementById("username").value = "";
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
                            usersList: data,
                            getDataScores: true,
                            originalUserList: data
                        })
                    )
                    .catch(err => {
                        this.setState({ exceptionCaught: true })
                    });
            }
        }
    }

    cancelClicked() {
        if (this.state.somethingClicked) {
            toggleToggleBar();
            this.setState({
                somethingClicked: !this.state.somethingClicked,
                clicked: null,
                cameraClicked: false,
                scoresList: [],
                userClicked: false,
                usersList: [],
                originalUserList: []
            });
        }
    }

    usernameCancelClicked() {
        this.setState({
            scoresList: [],
            userClicked: false,
            clickedOnBin: false
        });
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
            if (this.props.isAdmin === true) {
                competitionItem.push(
                    <div className={this.state.userClicked === false ? "hidden" : "competition-item active"}>
                        <div
                            onClick={() => this.usernameCancelClicked()}
                            className="view-scores-cancel-button"
                        />
                        <div className="username-and-email-view-scores">
                            <div className="view-scores-username">{this.state.username}</div>
                            <div className="view-scores-email">{this.state.email} </div>
                        </div>
                    </div>
                )
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
        if (this.state.scoresList.length !== 0 && this.state.getDataScores !== false) {
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
                            {this.props.isAdmin === true ? (
                                <div className={this.state.scoresList[i].pictureURL !== "" ?
                                    "view-scores-photo-admin" : "hidden"} onClick={() => this.showPhoto(i)}>
                                </div>
                            ) : (
                                    <div className={this.state.scoresList[i].pictureURL !== "" ?
                                        "view-scores-photo" : "hidden"} onClick={() => this.showPhoto(i)}>
                                    </div>
                                )}
                        </div>
                        <div onClick={() => this.markedForDeletion(i)}
                            className={
                                this.state.clickedOnBin ?
                                    typeof this.state.scoresList[i].markedForDeletion == "undefined"
                                        || !this.state.scoresList[i].markedForDeletion
                                        ? "delete-icon-view-score"
                                        : "delete-icon-red-view-scores"
                                    : "hide"
                            }
                            alt="redirect"
                        />
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
        if (this.state.usersList.length !== 0 && this.state.getDataScores !== false && this.props.isAdmin === true) {
            for (let i = 0; i < this.state.usersList.length; i++) {
                adminScoresList.push(
                    <div className={this.state.userClicked === true ? "hidden" : "score-content"}>
                        <div className={this.state.userClicked === true ? "hidden" : "users-container"}
                            onClick={() => this.getScoresForAdmin(this.state.usersList[i].token, i,
                                this.state.usersList[i].email, this.state.usersList[i].username)}>
                            <div className={this.state.userClicked === true ? "hidden" : "usernames"}>
                                {this.state.usersList[i].username}</div>
                            <div className={this.state.userClicked === true ? "hidden" : "user-emails"}>
                                {this.state.usersList[i].email}</div>
                        </div>
                        <div className={this.state.userClicked === true ? "hidden" : "border-line"}>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="page-content">
                <div className={this.state.userClicked === true ? "" : "hidden"}>
                    <img
                        className="bin-image-view-score"
                        src={this.state.clickedOnBin ? blackBin : whiteBin}
                        alt=""
                        onClick={() => this.changeIcon()}
                    />
                </div>
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
                    {this.props.isAdmin === false || this.state.scoresList.length !== 0 ? (
                        <div>{scoreListForUser}</div>
                    ) : (
                            <div>
                                <div className="view-scores-input-container">
                                    <input
                                        placeholder="Search"
                                        className={this.state.userClicked === true ? "hidden" : "view-score-input"}
                                        type="text"
                                        onChange={this.handleSearch}
                                        id="username"
                                    ></input>
                                    <div>
                                        {adminScoresList}
                                    </div>
                                </div>

                            </div>
                        )}
                </div>
                {this.state.markedForDeletion === false ? null : (
                    <div className="bpanel">
                        <button className="cancel-delete" onClick={() => this.cancel()}>
                            cancel
                                             </button>
                        <button className="confirm-group" onClick={() => this.delete()}>
                            {this.state.amountBeingDeleted > 1 ? "Delete scores" : "Delete score"}
                        </button>
                    </div>
                )}
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