

import React, { Component } from 'react'
import { connect } from 'react-redux';
import './App.scss'
import { getUser } from './api/github'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import { simpleAction } from './actions/simpleAction';

const mapDispatchToProps = dispatch => ({
simpleAction: () => dispatch(simpleAction())
})
const mapStateToProps = state => ({
...state
})
//const renderLine = (user, key) => <li key={key}><b>{key}</b>: {user[key]}</li>

class App extends Component {
constructor (props) {
super(props)
this.state = { user: {} }

}
simpleAction = (event) => {
this.props.simpleAction();
}
componentDidMount () {
getUser('vnglst').then(data => {
this.setState({ user: data.entity })
})
}

render () {
// const { user } = this.state
return (
/** * <div className='App'>
<ul style={{ listStyle: 'none' }}>{
// Loop over the object keys and render each key
Object.keys(user).map(key => renderLine(user, key))
}
</ul>
*/

 <div className="App">

<button onClick={this.simpleAction}>Test redux action</button>
<pre>
{
JSON.stringify(this.props)
}
</pre>
<BrowserRouter>
<Switch>
<Route path="/home" component = {Home} exact/>
<Route path="/" component = {Home} exact/>
<Route path="/about" component = {About} exact />
<Route path="/contact" component = {Contact} exact/>
<Redirect from="/" to="/"/>
</Switch>
</BrowserRouter>

 </div>
)
}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);