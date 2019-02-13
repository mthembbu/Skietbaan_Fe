import React, { Component } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
//import ReactDOM from 'react-dom';
//import { Navbar,
//   NavDropdown,
//   Nav,
//   Container,
//    Table
//   } from 'react-bootstrap';
//import { Table } from 'react-bootstrap';
import '../bootstrap/LeaderboardStyle.css';



class LeaderboardPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isLoading: false,
        };
    }

    handleClick() {
        //this.setState({ isLoading: true }, () => {
        //  simulateNetworkRequest().then(() => {
        //   this.setState({ isLoading: false });
        // });
        // });
    }
    render() {
        const { isLoading } = this.state;

        const techCompanies = [
            { label: "Competition 1", value: 1 },
            { label: "Competition 2", value: 2 },
            { label: "Competition 3", value: 3 },
            { label: "Competition 4", value: 4 },
            { label: "Competition 5", value: 5 },
        ];
        const scoreType = [
            { label: "Average", value: 1 },
            { label: "Best", value: 2 },
            { label: "Total", value: 3 }
        ];
        const goupsList = [
            { label: "Global", value: 1 },
            { label: "Retro rabbit", value: 2 },
            { label: "One-Hit-Wonders", value: 3 },
            { label: "Discovery", value: 4 }
        ];
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="competitionSelction">
                        <div className="col-md-4">
                            <Select options={techCompanies} />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="filterNav">
                        <div className="col-md-4">
                            <div className="groupFilt">
                                <div className="groupLabel">Groups</div>
                                   <div className="groupChoose">
                                      <Select options={goupsList} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                        <div className="scoreType">
                             <div className="scoreTypeLabel">ScoreType</div>
                             <div className="row justify-content-center">
                                 <div className="col-md-2">
                                    <div className="scoreTypeChoose"><Select options={scoreType} /></div>
                                 </div>
                             </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <table className="table">
                        <thead>
                            <tr className="filters">
                                <td>#</td>
                                <td>Username</td>
                                <td>Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>80</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>66</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry</td>
                                <td>57</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <hr />
                <div className="curentMember">
                    <table className="table">
                        <thead>
                            <tr className="filters">
                                <td>3</td>
                                <td>MyUsername</td>
                                <td>62</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

        )
    }
}
export default LeaderboardPage;
