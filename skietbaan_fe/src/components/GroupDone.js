import React, { Component } from "react";
import { Table } from "react-bootstrap";

class GroupDone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    fetch("http://localhost:63474/api/User")
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.map(users => {
            users.highlighted = false;
            return {
              ...users,

              highlighted: false
            };
          })
        });
      });
  }

  render() {

    return (
      <div id="tu" class="jumbotron">
        <h1>
          <b>WELCOME</b>
        </h1>
        <p>
          <b>congratulations you have created a group</b>
        </p>
        <br />
        <br />
    
      </div>
    );
  }
}
export default GroupDone;
