import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import LeaderboardPage from './components/LeaderboardPage';
import ScoreCapture from './components/ScoreCapture';
import GroupsName from './components/GroupsName';
import Groups from './components/Groups';
import GroupDone from './components/GroupDone';
import CreateComp from './components/CreateComp';
import notifications from './components/Notifications'
import ViewMembers from './components/ViewMembers'
import Documents from './components/Documents';
import CreatePage from './components/CreatePage';
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<NavbarMenu />
					<hr />
					<BrowserRouter>
						<Switch>
							<Route path="/home" component={LeaderboardPage} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/register-page" component={Register} exact />
							<Route path="/" component={Login} exact />
							<Route path="/registermember" component={RegisterMember} exact />
							<Route path="/new-competition" component={CreateComp} exact />
							<Route path="/scorecapture" component={ScoreCapture} exact />
							<Route path="/groupsname" component={GroupsName} exact />
							<Route path="/groups" component={Groups} exact />
							<Route psth="/create" component={CreatePage} exact />
							<Route path="/GroupDone" component={GroupDone} exact />
							<Route path="/notifications" component={notifications} exact />
							<Route path="/documents" component={Documents} exact />
							<Route path="/viewmembers" component={ViewMembers} exact />
							<Redirect from="/" to="/home" />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}
export default App;
