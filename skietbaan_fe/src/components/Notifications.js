import React, { Component } from 'react';
import '../components/NotificationsStyle.css';
import { Table, Button, Col} from 'reactstrap';
import { getCookie } from './cookie';

class notifications extends Component {

    constructor(props) {
      super(props);
      this.state = {
        array:[],
        tokenValue: ""
      }
     // this.redirect = this.redirect.bind(this);
    }

    componentWillMount(){
      if(getCookie("token")){
          var token = document.cookie;
          fetch("http://localhost:63474/api/Notification?" + token, {
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
    }

    render() {
      const headingItems = (
        <div className="PageHeading">
            <a href = "/" ><img src ={require ('./Notification-Img/redirect2.png')}alt="redirect"/></a>
            <b>Notifications</b>
        </div>
      );

      const viewButtons = (
        <div>
          <Button>View</Button>
        </div>
      );

      const postItems = (
        <Table>
           <tbody>
            {this.state.array.map((post) => (
                <tr key={post.id}>
                    <td>{post.notificationMessage}</td>
                    <td>{viewButtons}</td>
                </tr>
            ))}
        </tbody>
        </Table>
      );

    return (
    <div> 
      <div>{headingItems}</div>
      <div>{postItems}</div>
      <div><Col className="buttonCss"><Button className="buttonCss" onClick={this.redirect}>Load older notifications</Button></Col></div>
      <div>{this.redirect}</div>
    </div>
    )
  }
}
export default notifications;
