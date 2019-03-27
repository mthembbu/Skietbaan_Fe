import React, { Component } from 'react';
import '../components/ViewMembers.css';
import Collapsible from 'react-collapsible';
import { BASE_URL } from '../actions/types.js';
import memberIcon from '../components/assets/membership-icon.png';
import { getCookie } from '../components/cookie.js';

class ViewNonMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            isOpened: false,
            height: 100,
            timeLeftOnMembership: [],
            filterText: ""
        }
        this.getNonMembers = this.getNonMembers.bind(this);
        this.getTimeLeft = this.getTimeLeft.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.status = this.status.bind(this);
    }

    componentDidMount(){
        this.getNonMembers();
        this.getTimeLeft()
    }

    getNonMembers() {
        fetch(BASE_URL + "/api/Features/SearchNonMember", {
            method: 'Get',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            }).then(data => this.setState({
                array: data
            }))
    }

    getTimeLeft() {
        fetch(BASE_URL + "/api/Features/TimeLeft", {
            method: 'Get',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data;
            }).then(data => this.setState({
                timeLeftOnMembership: data
            }))
    }

    onChangeText(event) {
        this.setState({ filterText: event.target.value });
    }

    status(timeLeft) {
        if (timeLeft < 2 || timeLeft === 2) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        if(!getCookie("token")){
            window.location = "/registerPage";
        }
        const postItems = (
            <table striped hover condensed className="table-member">
                <tbody >
                    {this.state.array.filter((post) => {
                        return (!this.state.filterText
                            || post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase())
                            || post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
                            || post.memberID.startsWith(this.state.filterText))
                    }).map((post, index) => (
                        <tr className="view-members-user" key={post.id}>
                            <td className="first-column">
                                <Collapsible trigger={<div className="username-and-email">
                                    <b>{post.username}</b>
                                    <img src={memberIcon}
                                        className="membership-icon" alt='Is a Member'></img>
                                    <div>{post.email}</div>
                                </div>}>
                                    <div className="membership-details">Membership No: <b>{post.memberID}</b>
                                        <div>Start of Membership: <b>{post.memberStartDate}</b>
                                        </div>
                                    </div>
                                </Collapsible>
                            </td>
                            <td className="second-column">
                                <div className="expiry-time-column">
                                    <div className={(this.status(this.state.timeLeftOnMembership[index])) ? "bad" : "okay"}>
                                        {post.memberExpiryDate}
                                    </div>
                                    <div>{this.state.timeLeftOnMembership[index]} Months
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
        return (
            <div className="centre-view-member">
                <div className="username-search">
                    <div className="search">
                        <input
                            autoComplete="off"
                            type="text"
                            className="user-value"
                            id="usernameValue"
                            value={this.state.filterText}
                            onChange={this.onChangeText}
                        />
                    </div>
                </div>
                <div className="table-search-members" >
                    {postItems}
                </div>
            </div>
        );
    }
}

export default ViewNonMembers;
