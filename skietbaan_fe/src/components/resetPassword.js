import React, { Component } from 'react';
import '../components/ForgotPassword.css';
import { BASE_URL } from "../actions/types";
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordValue: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    resetPassword() {

        let token = window.location.pathname.split("/")[2];
        let sha1 = require('sha1');
        let hash = sha1(this.state.passwordValue);

        fetch(BASE_URL + `/api/Features/resetpassword?token=${token}&password=${hash}`,{
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.passwordValue)
          })
            .then(function(response) {})
            .then(function(data) {})
            .catch(function(data) {});
}


    handleChange(event) {   

        this.setState({ passwordValue: event.target.value });
    }   

    render() {
        return (
            <div className="forgot-password-page-content">

                    <div className="docuements-heading">
                        <div className="documents-text">Documents</div>
                    </div>
                <div className="container-of-elements">
                    <label className="forgot-password-label">Enter Email</label>
                    <br/>
                    <input
                         type="text"
                         name="emailValue"
                         id="email"
                         autoComplete = "off"
                         className="forgot-password-email"
                            value={this.state.passwordValue} 
                            onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        type="text"
                        name="emailValue"
                        id="email"
                        autoComplete = "off"
                        className="forgot-password-email"
                    />
                    <button className="button-email" onClick={this.resetPassword}>Send Email</button>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;
