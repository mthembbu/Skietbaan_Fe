import React, { Component } from 'react';
import './bootstrap/NavbarMenuStyle.css';
import { Provider } from 'react-redux';
import {store} from './store';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavbarMenu from './components/NavbarMenu';
import NavbarMenuUser from './components/NavbarMenuUser';
import RegisterMember from './components/RegisterMember';
import LeaderboardPage from './components/LeaderboardPage';
import AddGroup from './components/AddGroup';
import Groups from './components/Groups';
import ViewGroups from './components/ViewGroups';
import history from './components/history';
import notification from './components/Notifications'
import ViewMembers from './components/ViewMembers'
import Documents from './components/Documents';
import { getCookie } from './components/cookie.js';
import ScoreCapture from './components/ScoreCapture';
import CreatePage from './components/CreatePage';
import AddMembersGroup from './components/AddMembersGroup';
import EditGroup from './components/EditGroup';
import ViewComp from './components/ViewComp';
import CreateComp from './components/CreateComp';
import {BASE_URL, URL} from './actions/types.js';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  nav: null
		}
		this.TypeUser = this.TypeUser.bind(this);
	}

	TypeUser(){
		let token = getCookie("token");
		fetch(BASE_URL + "/api/features/getuserbytoken/" + token, {
			method: 'Get',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => this.setState({
				nav:data.admin
			}))
			.then(function (data) {})
			.catch(function (data) {
				console.log("error")
			});
			if(this.state.nav === true){
				return <NavbarMenu/>
			}else{
				return <NavbarMenuUser/>
			}
	}

	render() {
		return (
			<Provider store={store}>
				<div className="App">
				{this.TypeUser()}
					<Router history={history}>
						<Switch>
							<Route path="/home" component={LeaderboardPage} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/registerPage" component={Register} exact />
							<Route path="/" component={Register} exact />
							<Route path="/registerMember" component={RegisterMember} exact />
							<Route path="/new-competition" component={CreateComp} exact />
							<Route path="/AddGroup" component={AddGroup} exact />
							<Route path="/scorecapture" component={ScoreCapture} exact />
							<Route path="/groups" component={Groups} exact />
							<Route path="/create" component={CreatePage} exact />
							<Route path="/ViewGroups" component={ViewGroups} exact />
							<Route path="/view-comp" component={ViewComp} exact />
							<Route path="/create-comp" component={CreateComp} exact />
							<Route path="/notify" component={notification} exact />
							<Route path="/documents" component={Documents} exact />
							<Route path="/viewMembers" component={ViewMembers} exact />
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
