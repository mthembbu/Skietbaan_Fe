import React, { Component } from 'react';
import { Table, Label, Input } from 'reactstrap';
import '../components/ViewMembers.css';
import Collapsible from 'react-collapsible';
import {BASE_URL} from '../actions/types.js';

class ViewMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            isOpened: false,
            height: 100,
            timeLeftOnMembership: [],
            filterText:""
        }
        this.GetMembers = this.GetMembers.bind(this);
        this.GetTimeLeft = this.GetTimeLeft.bind(this);
        this.DoAllThese = this.DoAllThese.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    GetMembers() {
        fetch(BASE_URL,"/api/Features/SearchMember", {
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
            .catch(function() { });
    }

    GetTimeLeft() {
        fetch(BASE_URL,"/api/Features/TimeLeft", {
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
            .catch(function () { });
    }

    DoAllThese() {
        this.GetMembers();
        this.GetTimeLeft();
    }

    onChangeText(event){
        this.GetMembers();
        this.setState({filterText: event.target.value});
        this.GetTimeLeft();
    }

    render() {
        const postItems = (
            <Table striped hover condensed className="table-member">
                <thead>
                    <tr>
                        <td><b>Member</b></td>
                        <td><b>Membership Expiry Date</b></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.array.filter((post) => {
                        return (!this.state.filterText 
                            || post.username.toLowerCase().startsWith(this.state.filterText.toLocaleLowerCase()) 
                            || post.email.toLowerCase().startsWith(this.state.filterText.toLocaleLowerCase()))
                    }).map((post,index) => (
                        <tr key={post.id}>
                            <td>
                                <Collapsible trigger={<b>{post.username}</b>}>
                                    <p>{post.email}</p>
                                    <p>Membership Number: <b>{post.memberID}</b></p>
                                    <p>Start of Membership: <b>{post.memberStartDate.substring(0, 10)}</b></p>
                                </Collapsible>
                            </td>
                            <td>
                                <Collapsible trigger={<b>{post.memberExpiryDate.substring(0, 10)}</b>}>
                                    <p>{this.state.timeLeftOnMembership[index]} Months</p>
                                </Collapsible>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
        return (
            <div className="centre-register-member">
                <div className="page-name">
                    <h2>View Members</h2>
                </div>
                <div className="search-member-name">
                    <div className="label-search">
                        <Label><b>Search</b></Label>
                    </div>
                    <Input
                        type="text"
                        name="usernameValue"
                        id="usernameValue"
                        placeholder="Username or Email"
                        value={this.state.usernamesValue}
                        onChange={this.onChangeText} />
                    <br />
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
