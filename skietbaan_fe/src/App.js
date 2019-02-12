import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { getUser } from './api/github';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import List from './components/List';
import ScoreCapture from './components/ScoreCapture';
import Competitions from './components/Competitions';
class App extends Component {
	componentDidMount() {
		getUser('vnglst').then((data) => {
			this.setState({ user: data.entity });
		});
	}
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<NavbarMenu /> <hr />
					<BrowserRouter>
						<Switch>
							<Route path="/home" component={List} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/" component={Login} exact />
							<Route path="/register" component={RegisterMember} exact />
							<Route path="/competition" component={Competitions} exact />
							<Route path="/scorecapture" component={ScoreCapture} exact />
							<Redirect from="/" to="/home" />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}
export default App;
