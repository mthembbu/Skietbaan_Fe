import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import List from './components/List';
import ScoreCapture from './components/ScoreCapture';
import Competitions from './components/Competitions';
import GroupsName from './components/GroupsName';
import Groups from './components/Groups';
import GroupDone from './components/GroupDone';
class App extends Component {

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
							<Route path="/groupsname" component={GroupsName} exact />
							<Route path="/groups" component={Groups} exact />
							<Route path="/GroupDone" component={GroupDone} exact />
							<Redirect from="/" to="/home" />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}
export default App;
