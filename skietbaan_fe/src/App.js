import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import { getUser } from './api/github';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import About from './components/About';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
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
					<BrowserRouter>
						<Switch>
							<Route path="/home" component={landing} exact />
							<Route path="/login" component={Login} exact />
							<Route path="/" component={Login} exact />
							<Route path="/register" component={Register} exact />
							<Route path="/about" component={About} exact />
							<Route path="/welcome" component={Welcome} exact />
							<Redirect from="/" to="/" />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}
export default App;
