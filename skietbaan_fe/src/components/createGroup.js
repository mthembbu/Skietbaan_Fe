import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fetchPosts } from "../actions/postActions";
import { createPost } from "../actions/postActions";

export class createGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: [],
      check: false
    };
    this.submitChange = this.submitChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
    // this.checked = this.checked.bind(this);
  }
  static propTypes = {
    prop: PropTypes
  };
  componentWillMount() {
    this.props.fetchPosts();
    
  }
  onClick(e) {
    if (this.state.isChecked.indexOf(e) >= 0) {
      let index = this.state.isChecked.indexOf(e);
      this.state.isChecked.splice(index, 1);
      console.log(this.state.isChecked.length);
    } else {
      this.state.isChecked.push(e);
    }
  }
  submitChange() {
    if (this.state.check == false) {
      for (let i = 0; i < this.props.data.length; i++) {
        this.state.isChecked.push(this.props.data[i].id);
        this.setState({ check: true });
      }
      console.log(this.state.isChecked.length);
    } else {
      for (let i = 0; i < this.props.data.length; i++) {
        this.state.isChecked.splice(i, 1);
        this.setState({ check: false });
      }
      console.log(this.state.isChecked.length);
    }
  }

  onSave() {
    const postsitems = {
      usersSelected: this.state.isChecked
    };

    this.props.createPost(postsitems);
  }

  render() {
    console.log(this.props.data)
    const theList = (
      <Table striped hover condensed>
        <tbody>
          {this.props.data.map((post, index) => (
            <tr key={post.id.toString()}>
              <td>
                <h5>{post.username}</h5>
                <input
                  type="checkbox"
                  name={post.username}
                  id={post.id}
                  onc
                  onClick={() => this.onClick(post.id)}
                />
                <h5>{post.email}</h5>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
    return (
      <div className="Top">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />
          <div className="center_label">
            <b>Users 1</b>
          </div>
        </div>
        <div className="the_middle">
          <input className="theText" type="text" placeholder="Search.." />
          <button className="select" onClick={this.submitChange}>
            {" "}
            Select all
          </button>
          <div className="nextpage">
            <button onClick={this.onSave}>NEXT</button>
          </div>
        </div>

        {theList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.groupData.allItems,
  groupName: state.groupData.groupName
});

export default connect(
  mapStateToProps,
  { fetchPosts, createPost }
)(createGroup);
