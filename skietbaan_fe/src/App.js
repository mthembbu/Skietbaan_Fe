import React, { Component } from 'react';
import './bootstrap/NavbarMenuStyle.css';
import { Provider } from 'react-redux';
import store from './store';
import ViewGroups from './components/ViewGroups';
import CreateComp from './components/CreateComp';;
import ScoreCapture from './components/ScoreCapture';
import CreatePage from './components/CreatePage';
import AddMembersGroup from './components/AddMembersGroup';
import EditGroup from './components/EditGroup';
import history from './components/history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import LeaderboardPage from './components/LeaderboardPage';
 import AddGroup from './components/AddGroup';
import theGroupsUser from './components/theGroupsUser';
import Groups from './components/Groups';
import GroupsName from './components/GroupsName';
import GroupDone from './components/GroupDone';

import notifications from './components/Notifications'
import ViewMembers from './components/ViewMembers'
import Documents from './components/Documents';

class App extends Component {
	render() {
		return (
				<div className="App">
					<NavbarMenu />
					<Router history={history}>
			
						<Switch>
							<Route path="/home" component={LeaderboardPage} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/register-page" component={Register} exact />
							<Route path="/" component={Login} exact />
							<Route path="/registermember" component={RegisterMember} exact />
							<Route path="/new-competition" component={CreateComp} exact />
							<Route path="/AddGroup" component={AddGroup} exact /> 
							<Route path="/scorecapture" component={ScoreCapture} exact />
							<Route path="/groupsname" component={GroupsName} exact />
							<Route path="/AddGroup" component={AddGroup} exact />
							<Route path="/create" component={CreatePage} exact />
							<Route path="/ViewGroups" component={ViewGroups} exact />
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
