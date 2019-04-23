import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import './ScoreCapture.css';
import history from './history';
import { getCookie } from './cookie.js';
import { BASE_URL } from '../actions/types.js';
import { pageStateScore } from '../actions/scoresAction';
import { selectedPage } from '../actions/postActions'
import ScoreCapture from '../components/ScoreCapture.js';
import ViewScores from '../components/ViewScores.js';
export class scorePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToken: true,
            selectedButton: 1,
            user: [],
            height: document.body.clientHeight
        };

        this.viewScoresPage = this.viewScoresPage.bind(this);
        this.scoreCapturePage = this.scoreCapturePage.bind(this);
        this.noShadowOnMember = this.noShadowOnMember.bind(this);
    }

    noShadowOnMember() {
        if (this.state.selectedButton === 3) {
            return "0px 0px 0px 0px grey";
        } else {
            return "0px 21px 18px -26px grey";
        }
    }
    scoreCapturePage() {
        this.setState({ selectedButton: 1 });
    }

    viewScoresPage() {
        this.setState({ selectedButton: 2 });
    }
    componentDidMount() {
        this.props.selectedPage(2);
        if (getCookie('token') !== null) {
            let token = getCookie('token');
            fetch(BASE_URL + '/api/features/getuserbytoken/' + token, {
                method: 'Get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then(function (data) {
                })
                .catch(function (data) { })
                .catch((err) => {
                    /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
                });
        } else {
            window.location = '/registerPage';
        }

    }

    componentWillMount() {
        window.addEventListener("resize", () => {
            let Navbar = document.querySelector(".navbar-admin");
            if (this.state.height === document.body.clientHeight) {
                Navbar.classList.remove("hidden");
            } else {
                Navbar.classList.add("hidden");
            }
        });
    }

    render() {
        let headerLabel = (
            <div className="label-for-score">{this.state.selectedButton === 1 ? "ADD SCORE" : "VIEW SCORES"}</div>  
        )
        return (
            <div className="page-content-scores-page">
                    <div className="score-capture-header">
                        <div className="gun-overlay-image">
                            {headerLabel}
                        </div>
                        <Row className="row justify-content-center">
                            <div className="scores-page-switch-top">
                                <div
                                    className={
                                        this.state.selectedButton === 1 ?
                                            'scores-page-switch-active' : 'scores-page-switch-inactive'
                                    }
                                    onClick={this.scoreCapturePage}
                                >
                                    ADD SCORES
										</div>
                                <div
                                    className={
                                        this.state.selectedButton === 2 ?
                                            'scores-page-switch-active' : 'scores-page-switch-inactive'
                                    }
                                    onClick={this.viewScoresPage}
                                >
                                    VIEW SCORES
										</div>
                            </div>
                        </Row>
                    </div>


                <div className="components-create">

                    {this.state.selectedButton === 1 ? (
                        <ScoreCapture />
                    ) : this.state.selectedButton === 2 ? (
                        <ViewScores />
                    ) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    page: state.posts.page
});

export default connect(mapStateToProps, { pageStateScore, selectedPage })(scorePages);