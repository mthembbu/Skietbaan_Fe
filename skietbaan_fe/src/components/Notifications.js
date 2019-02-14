import React, { Component } from 'react';
import '../components/NotificationsStyle.css';
import { Table, Button } from 'reactstrap'

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
        return data;
      }).then(data => this.setState({array:data}))
      .catch(function() {});
  }


    render() {
      const postItems = (
        <Table striped hover condensed>
        <thead>
        <tr>
        <td>
        
                                <b>#</b>
                            </td>
                            <td>
                                <b>Notification Heading</b>
                            </td>
                            <td>
                                <b>Notification Content</b>
                            </td>
                        </tr>
                    </thead>
        
                    <tbody>
                        {this.state.array.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.notificationsHeading}</td>
                                <td>{post.notificationContent}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            );
    return (
    <div > 
      <div>{postItems}</div>
      <Button className="buttonCss" onClick={this.notfications}>Load previous notifications</Button>
    </div> 
    )
  }
}
export default notifications;