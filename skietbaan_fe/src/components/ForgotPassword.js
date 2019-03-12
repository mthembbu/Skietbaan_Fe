import React, { Component } from 'react';
import '../components/ForgotPassword.css';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: "",
        }
    }
    render() {
        return (
            <div>
                <div>
                    <label className="forgot-password-label">Enter Email</label>
                <input
                    type="text"
                    name="emailValue"
                    id="email"
                    value={this.state.emailValue}
                    className="forgot-password-email"
                  />
                  </div>
            </div>
        )
    }
}
export default ForgotPassword;