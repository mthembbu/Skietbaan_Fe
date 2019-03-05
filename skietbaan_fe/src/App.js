import React, { Component } from 'react';
import './bootstrap/NavbarMenuStyle.css';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavbarMenu from './components/NavbarMenu';
import RegisterMember from './components/RegisterMember';
import LeaderboardPage from './components/LeaderboardPage';
 import AddGroup from './components/AddGroup';
import GroupsName from './components/GroupsName';
import Groups from './components/Groups';
import ViewGroups from './components/ViewGroups';
import GroupDone from './components/GroupDone';
import history from './components/history';
import notification from './components/Notifications';
import ViewMembers from './components/ViewMembers';
import Documents from './components/Documents';

import ScoreCapture from './components/ScoreCapture';
import CreatePage from './components/CreatePage';
import UserProfile from './components/UserProfile';
import './App.css';
import AddMembersGroup from './components/AddMembersGroup';
import EditGroup from './components/EditGroup';

import ViewComp from './components/ViewComp';
import CreateComp from './components/CreateComp';

class App extends Component {
	constructor(){
		super();
		//this.sendRequest = this.sendRequest.bind(this);
	}

	/*componentWillUnmount(){
		fetch('http://localhost:50963/api/awards/start-time',{
            method : 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        }) 
	}

	sendRequest(){
		fetch('http://localhost:50963/api/awards/start-time',{
            method : 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        }) 
	}

	componentWillMount(){
		window.addEventListener('beforeunload', this.sendRequest);	
	}*/
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<NavbarMenu />
					<Router history={history}>
						<Switch>
							<Route path="/home" component={LeaderboardPage} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/register-page" component={Register} exact />
							<Route path="/" component={Register} exact />
							<Route path="/registermember" component={RegisterMember} exact />
							<Route path="/new-competition" component={CreateComp} exact />
							<Route path="/AddGroup" component={AddGroup} exact /> 
							<Route path="/scorecapture" component={ScoreCapture} exact />
							<Route path="/groupsname" component={GroupsName} exact />
							<Route path="/groups" component={Groups} exact />
							<Route path="/create" component={CreatePage} exact />
							<Route path="/ViewGroups" component={ViewGroups} exact />
							<Route path="/view-comp" component={ViewComp } exact />
							<Route path="/create-comp" component={ CreateComp} exact />
							<Route path="/GroupDone" component={GroupDone} exact />

							<Route path="/notify" component={notification} exact />
							<Route path="/documents" component={Documents} exact />

							<Route path="/viewmembers" component={ViewMembers} exact />
							<Route path="/profile" component={UserProfile} exact />
							<Route path="/AddMembersGroup" component={AddMembersGroup} exact />
							<Route path="/EditGroup" component={EditGroup} exact />
							<Redirect from="/" to="/home" />
						</Switch>
					</Router>
				</div>
			</Provider>
		);
	}
}
export default App;
