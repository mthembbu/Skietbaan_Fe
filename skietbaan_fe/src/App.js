import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch, Redirect,Router } from 'react-router-dom';
import Login from './components/Login';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import LeaderboardPage from './components/LeaderboardPage';
import ScoreCapture from './components/ScoreCapture';
import theGroupsUser from './components/theGroupsUser';
import Groups from './components/Groups';
import GroupsName from './components/GroupsName';
import AddGroup from './components/AddGroup';
import GroupDone from './components/GroupDone';
import ViewGroups from './components/ViewGroups';
import CreateComp from './components/CreateComp';
import AddMembersGroup from './components/AddMembersGroup';
import notifications from './components/Notifications'
import history from './components/history'
class App extends Component {

	render() {
		return (
				<div className="App">
					<NavbarMenu />
					<hr></hr>
					<hr></hr>
					<hr></hr>
					<hr></hr>
					<Router history={history}>
						<Switch>
							<Route path="/home" component={LeaderboardPage} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/" component={Login} exact />
							<Route path="/register" component={RegisterMember} exact />
							<Route path="/new-competition" component={CreateComp} exact />
							<Route path="/scorecapture" component={ScoreCapture} exact />
							<Route path="/groupsname" component={GroupsName} exact />
							<Route path="/AddGroup" component={AddGroup} exact />
							<Route path="/GroupDone" component={GroupDone} exact />
							<Route path="/notifications" component={notifications} exact />
							<Route path="/theGroupsUser" component={theGroupsUser} exact />
							<Route path="/ViewGroups" component={ViewGroups} exact />
							<Route path="/Groups" component={Groups} exact />
							<Route path="/AddMembersGroup" component={AddMembersGroup} exact />
							<Redirect from="/" to="/home" />
						</Switch>
					</Router>
				</div>
		);
	}
}
export default App;
