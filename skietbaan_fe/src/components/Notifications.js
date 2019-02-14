import React, { Component } from 'react';
import '../components/NotificationsStyle.css';
import {Input, Button} from 'reactstrap'

class notifications extends Component {

    constructor(props) {
      super(props);
      this.state = {
        array:[]
      }
      this.notfications = this.notfications.bind(this);
    }
  
 
  notfications(){
      fetch("http://localhost:63474/api/Notification", {
      method: 'Get',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      })
      .then(function(response) {
         return response.json();})
      .then(function(data) { 
        console.log(data);
       document.getElementById("Label1").value = data[0].id;
       document.getElementById("Label2").value = data[0].isRead;
       document.getElementById("Label3").value = data[0].notificationsHeading;
        return data;
      }).then(data => this.setState({array:data}))
      .catch(function() {});
  }


    render() {
    return (
    
    <form onSubmit={this.handleSubmit}>
    <div className="centre"> 
      <Input id="Label1"></Input>
      <Input id="Label2"></Input>
      <Input id="Label3"></Input>
      <Button className="buttonCss" onClick={this.notfications}>Load previous notifications</Button>
    </div> 
    </form>
    )
  }
}
export default notifications;