import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { getUser } from './api/github';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Landing from './components/Landing';
import About from './components/About';
import Welcome from './components/Welcome';
import Login from './components/Login';
import RegisterMember from './components/RegisterMember';
import { simpleAction } from './actions/simpleAction';

const mapDispatchToProps = dispatch => ({
simpleAction: () => dispatch(simpleAction())
})
const mapStateToProps = state => ({
...state
})

class App extends Component {

    componentDidMount () {
        getUser('vnglst').then(data => {
            this.setState({ user: data.entity })
        })
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                <Switch>
                <Route path="/home" component = {Landing} exact/>
                <Route path="/login" component = {Login} exact/>
                <Route path="/" component = {Landing} exact/>
                <Route path="/register" component = {RegisterMember} exact/>
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
