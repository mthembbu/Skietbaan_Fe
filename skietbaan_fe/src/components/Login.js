import React from "react"

const Login = () =>{

return ( 
     <div class="login-page">
            <div class="form">
              <form class="login-form">
                <input type="text" id="username" placeholder="username"/>
                <input type="password" id="password" placeholder="password"/>
                <label id="error"></label>
                <button type="button" onclick="login(username, password)">login</button>
                <p class="message">Not registered? <a href="register.html">Register</a></p>                
              </form>
            </div>
          </div>
);
};

export default Login;