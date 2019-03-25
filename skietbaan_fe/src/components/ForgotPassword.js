import React, { Component } from 'react';
import '../components/ForgotPassword.css';
import { BASE_URL } from "../actions/types";
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: "",
            isSent:"",
        }
        this.sendEmail = this.sendEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    sendEmail() {

            fetch(BASE_URL + "/api/Features/ForgotPassword?user=" + this.state.emailValue,{
                method: "post",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.emailValue)
              })
              .then(res=>res.json())
              .then(data=>this.setState({isSent:data}))

              
    }

    handleChange(event) {   

        this.setState({ emailValue: event.target.value });
    }   

    render() {
        return (
            <div className="forgot-password-page-content">
                   
                <div className="container-of-elements">
                    <div className="docuements-heading">
                        <div className="documents-text">Forgot Password</div>
                    </div>
                    <label className="password-reset-label-2 container-reset">Enter Email Or Username</label>

                    <div>
                        <input
                            type="text"
                            name="emailValue"
                            id="email"
                            autoComplete = "off"
                            value={this.state.emailValue} 
                            onChange={this.handleChange}
                            className="forgot-password-email"
                        />
                    </div>

                    <div>
                        <label className="password-reset-label">{this.state.isSent}</label>
                    </div>
                    <button className="button-email" onClick={this.sendEmail}>Send Email</button>
                    <br/>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;
