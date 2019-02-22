import React, { Component } from 'react';
import { Label, Table, Input, Button } from 'reactstrap';
import '../components/Documents.css';
import {BASE_URL} from '../actions/types.js';

class Documents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        }
        this.GetMembers = this.GetMembers.bind(this);
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
                array: data.filter(function (datas) {
                    return ((datas.username).startsWith(document.getElementById("usernameValue").value)
                        || (datas.email).startsWith(document.getElementById("usernameValue").value));
                })
            }))
            .catch(function () { });
    }

    SearchMember(user) {
        this.setState({
            usernameValue: user
        });
        let name = this.state.array[user].username;
        let email = this.state.array[user].email;
        fetch("https://api.skietbaan.retrotest.co.za/api/Features/Search?Username=" + name, {
            method: 'Get',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
                document.getElementById("usernameValue").value = email;
            })
            .catch(function () { });
    }

    render() {
        const postItems = (
            <Table striped hover condensed>
                <tbody>
                    {this.state.array.map((post, index) => (
                        <tr key={post.id} onClick={() => this.SearchMember(index)}>
                            <td>
                                <b>{post.username}</b>
                                <p>{post.email}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
        return (
            <div className="documents-container">
                <div className="page-name">
                    <h2>Documents</h2>
                </div>
                <div className="documents-body">
                    <div className="label-select-member">
                        <Label>Select Member</Label>
                    </div>
                    <div className="search-member-name">
                        <Input
                            type="text"
                            name="usernameValue"
                            id="usernameValue"
                            placeholder="Username or Email"
                            value={this.state.usernamesValue}
                            onChange={this.GetMembers} />
                    </div>
                    <div className="table-search-members">
                        {this.GetMembers}
                        {postItems}
                    </div>
                    <br />
                    <div>
                        <div className="button-upload-document">
                            <Button className="upload-document-button">UploadDocument</Button>
                        </div>
                        <br />
                    </div>
                    <div className="button-upload-document">
                        <Button className="send-email">SendEmail</Button>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default Documents;
