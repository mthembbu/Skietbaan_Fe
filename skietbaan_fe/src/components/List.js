import React, { Component } from "react";
import { Table } from "react-bootstrap";
import '../components/ListStyle.css'
class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts :[]
    }
  }
  componentWillMount() {
    fetch('http://skietbaan.retrotest.co.za/api/User')
    .then(res => res.json())
    .then(data =>this.setState({posts : data}));
  }
  render() {
    const postItems = (
      <Table striped hover condensed>
        <thead>
         <tr>
          <td><b>USER_ID</b></td>
          <td><b>USERNAME</b></td>
          <td><b>EMAIL</b></td>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map(post => (
            <tr key={post.id}>
            <td><h5>{post.id}</h5></td>
              <td><h5>{post.username}</h5></td>
              <td>{post.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
    return (
      <div main className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
        {postItems}
      </div>
    );
  }
}
export default List;
