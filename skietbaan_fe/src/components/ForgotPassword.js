import React, { Component } from 'react';
import '../components/ForgotPassword.css';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: "",
        }
        this.sendEmail = this.sendEmail.bind(this);
    }
    sendEmail() {
        let RequestObject ={
            "Email" : this.state.emailValue,
        }
        fetch(URL + "/api/Password", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(RequestObject)
            
        })
            .then(response => response.json())
            .then(data => this.setState({
            }))
            .catch(function (data) {
            });
    }
    render() {
        return (
            <div className="forgot-password-page-content">
                <div className="container-of-elements">
                    <label className="forgot-password-label">Enter Email</label>
                    <input
                        type="text"
                        name="emailValue"
                        id="email"
                        autoComplete = "off"
                        value={this.state.emailValue}
                        className="forgot-password-email"
                    />
                    <button className="button-email">Send Email</button>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;