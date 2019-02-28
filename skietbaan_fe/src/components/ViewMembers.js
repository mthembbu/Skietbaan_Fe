import React, { Component } from 'react';
import '../components/ViewMembers.css';
import { Table } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { BASE_URL } from '../actions/types.js';

class ViewMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            isOpened: false,
            height: 100,
            timeLeftOnMembership: [],
            filterText: ""
        }
        this.GetFilteredMembers = this.GetFilteredMembers.bind(this);
        this.GetAllMembers = this.GetAllMembers.bind(this);
        this.GetTimeLeft = this.GetTimeLeft.bind(this);
        this.DoAllThese = this.DoAllThese.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.BackToCreate = this.BackToCreate.bind(this);
        this.Status = this.Status.bind(this);
    }

    GetAllMembers() {
        fetch(BASE_URL + "/api/Features/SearchMember", {
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


    GetFilteredMembers() {
        fetch(BASE_URL + "/api/Features/SearchMember", {
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

    GetTimeLeft() {
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

    DoAllThese() {
        this.GetFilteredMembers();
        this.GetTimeLeft();
    }

    onChangeText(event) {
        this.GetFilteredMembers();
        this.setState({ filterText: event.target.value });
        this.GetTimeLeft();
    }

    BackToCreate(){
        window.location = "/create";
    }

    Status(timeLeft){
        if(timeLeft < 2 || timeLeft === 2){
            return true;
        }
        else{
            return false;
        }
    }

    render() {
        this.GetAllMembers();
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
                                <Collapsible trigger={<div className="username-and-email"><b>{post.username}</b><p>{post.email}</p></div>}>
                                    <p>Membership No: <b>{post.memberID}</b></p>
                                    <p>Start of Membership: <b>{post.memberStartDate.substring(0, 10)}</b></p>
                                </Collapsible>
                            </td>
                            <td className="second-column">
                                {this.state.timeLeftOnMembership[index]} Months<br />
                                <label className={(this.Status(this.state.timeLeftOnMembership[index])) ? "bad":"okay"}>
                                {post.memberExpiryDate.substring(0, 10)}</label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
        return (
            <div className="centre-view-member">
                <div className="page-name-view">
                    <div className="image-comtainer">
                     <img src={require('../components/assets/back-button-white.png')} onClick={this.BackToCreate}
                        className="go-back-to-create-page" alt=''></img>
                        </div>
                    <div className ="view-members-container">   
                    <label className="view-members">
                        View Members
                    </label>
                    </div> 
                </div>
                <div className="username-search">
                    <div className="search">
                        <input
                            autoComplete="off"
                            type="text"
                            className="userValue"
                            id="usernameValue"
                            placeholder="Username or Email"
                            value={this.state.filterText}
                            onChange={this.onChangeText}
                        />
                    </div>
                </div>
                <div className="table-search-members" >
                    {this.DoAllThese}
                    {postItems}
                </div>
            </div>
        );
    }
}

export default ViewMembers;
