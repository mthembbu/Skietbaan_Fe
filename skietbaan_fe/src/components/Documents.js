import React, { Component } from 'react';
import { Label, Table, Input, Button } from 'reactstrap';
import '../components/Documents.css';
import {BASE_URL} from '../actions/types.js';

class Documents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            email: ""
        }
        this.GetMembers = this.GetMembers.bind(this);
        this.SendMail = this.SendMail.bind(this);
    }
    
    GetMembers() {
        fetch(BASE_URL+"/api/Features/SearchMember", {
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

    SearchMember(index,user) {
        this.setState({
            email: user.email
        });
     
        document.getElementById("usernameValue").value = user.email;
        
        fetch(BASE_URL,"/api/Features/Search?Username=" + user.name, {
            method: 'Get',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
                document.getElementById("usernameValue").value = data.email;
            })
            .catch(function () { });
    }

    SendMail(){
        (async () => {
            const rawResponse = await fetch(BASE_URL+`/api/Documents/Email/${this.state.email}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "email": this.state.email
                })
            });
      })();
    }


    render() {
        const postItems = (
            <Table striped hover condensed>
                <tbody>
                    {this.state.array.map((post, index) => (
                        <tr key={post.id} onClick={() => this.SearchMember(index,post)}>
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
                    <div className="search-name">
                        <Input
                            type="text"
                            name="usernameValue"
                            id="usernameValue"
                            placeholder="Username or Email"
                            value={this.state.email}
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
                        <Button className="send-email" onClick={this.SendMail}>SendEmail</Button>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default Documents;
