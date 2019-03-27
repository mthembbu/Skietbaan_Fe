import React, { Component } from 'react';
import './bootstrap/NavbarMenuStyle.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavbarMenu from './components/NavbarMenu';
import LeaderboardPage from './components/LeaderboardPage';
import AddGroup from './components/AddGroup';
import Groups from './components/Groups';
import history from './components/history';
import notification from './components/Notifications';
import Documents from './components/Documents';
import ScoreCapture from './components/ScoreCapture';
import ProfileLanding from './components/ProfileLanding';
import GroupComponent from './components/GroupComponent';
import requirements from './components/requirements.js';
import './App.css';
import ForgotPassword from './components/ForgotPassword';
import ViewComp from './components/ViewComp';
import CreateComp from './components/CreateComp';
import createPages from './components/createPages';
import resetPassword from './components/resetPassword';
import MetaTags from 'react-meta-tags';
import { PersistGate } from 'redux-persist/integration/react';
//app.js
class App extends Component {
	render() {
		return (
			<PersistGate persistor={persistor}>
				<Provider store={store}>
					<div>
						<MetaTags>
							<meta name="google" content="notranslate" />
						</MetaTags>
						<NavbarMenu />
						<Router history={history}>
							<Switch>
								<Route path="/home" component={LeaderboardPage} exact />
								<Route path="/login" component={Login} exact />
								<Route path="/registerPage" component={Register} exact />
								<Route path="/" component={Register} exact />
								<Route path="/forgotPassword" component={ForgotPassword} />
								<Route path="/resetPassword" component={resetPassword} />
								<Route path="/new-competition" component={CreateComp} exact />
								<Route path="/AddGroup" component={AddGroup} exact />
								<Route path="/scoreCapture" component={ScoreCapture} exact />
								<Route path="/groups" component={Groups} exact />
								<Route path="/viewComp" component={ViewComp} exact />
								<Route path="/createComp" component={CreateComp} exact />
								<Route path="/notify" component={notification} exact />
								<Route path="/documents" component={Documents} exact />
								<Route path="/profile" component={ProfileLanding} exact />
								<Route path="/requirements" component={requirements} exact />
								<Route path={'/ViewGroups'} component={GroupComponent} exact />
								<Route path="/create" component={createPages} exact />
								<Redirect from="/" to="/home" />
							</Switch>
						</Router>
					</div>
				</Provider>
			</PersistGate>

		);
	}
}

export default App;
