

import React, { Component } from 'react'
import { connect } from 'react-redux';
import './App.scss'
import { getUser } from './api/github'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
import Welcome from "./components/Welcome"
import Login from "./components/Login"
import { simpleAction } from './actions/simpleAction';
import axios from 'axios';

const mapDispatchToProps = dispatch => ({
simpleAction: () => dispatch(simpleAction())
})
const mapStateToProps = state => ({
...state
})
//const renderLine = (user, key) => <li key={key}><b>{key}</b>: {user[key]}</li>

class App extends Component {
    constructor (props) {
        super(props)
        this.state = { user: {} }
    }
    simpleAction = (event) => {
        this.props.simpleAction();
    }

    handleClick() {
        axios.get('https://localhost:44333/api/User/2',{
            
        method: 'GET',
        
    }).then(response => console.log(response.data))
}

    componentDidMount () {
        getUser('vnglst').then(data => {
            this.setState({ user: data.entity })
        })
    }

    render () {
    // const { user } = this.state
        return (
            /** * <div className='App'>
            <ul style={{ listStyle: 'none' }}>{
            // Loop over the object keys and render each key
            Object.keys(user).map(key => renderLine(user, key))
            }
            </ul>
            */

            <div className="App">

                <button onClick={this.simpleAction}>Test redux action</button>
                <button onClick={this.handleClick}>Endpoint Test</button>
                <pre>
                    {
                    JSON.stringify(this.props)
                    }
                </pre>
                <BrowserRouter>
                <Switch>
                <Route path="/home" component = {Home} exact/>
                <Route path="/login" component = {Login} exact/>
                <Route path="/" component = {Home} exact/>
                <Route path="/about" component = {About} exact />
                <Route path="/welcome" component = {Welcome} exact/>
                <Redirect from="/" to="/"/>
                </Switch>
                </BrowserRouter>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);