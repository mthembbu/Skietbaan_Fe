import React, { Component } from 'react'
import './App.scss'
import { getUser } from './api/github'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"


//const renderLine = (user, key) => <li key={key}><b>{key}</b>: {user[key]}</li>

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { user: {} }


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
<BrowserRouter>
       <Switch>
          <Route path="/home" component = {Home}  exact/>
          <Route path="/" component = {Home}  exact/>
          <Route path="/about" component = {About}  />
          <Route path="/contact" component = {Contact}  />
          <Route component={Home}/>
          </Switch>  
</BrowserRouter>


     // </div>
    )
  }
}

export default App