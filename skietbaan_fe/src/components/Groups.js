import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from "./history";
import { createGroups } from "../actions/postActions";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      filterText: "",
      check: "select all"
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectall = this.selectall.bind(this);
  }
  componentWillMount() {
    fetch("https://api.skietbaan.retrotest.co.za/api/user")
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
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  handleOnClick() {
    this.props.createGroups(this.props.name);
    const { newArray } = this.state;
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === true) {
        newArray.push(this.state.posts[i]);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
    }
    let request = {
      newArray: this.state.newArray
    };
    fetch("https://api.skietbaan.retrotest.co.za/api/groups/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArray)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
  }

  selectall() {
    const newarry = [...this.state.posts];
    if (this.state.check == "Select all") {
      for (var i = 0; i < this.state.posts.length; i++) {
        newarry[i].highlighted = true;
      }
      this.setState({ check: "Unselect" });
    } else {
      for (var i = 0; i < this.state.posts.length; i++) {
        newarry[i].highlighted = false;
      }
      this.setState({ check: "Select all" });
    }
    this.setState({ posts: newarry });
  }

  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;
      this.setState({ count: this.state.count + 1 });
    } else {
      this.state.posts[event].highlighted = true;
      this.setState({ count: this.state.count - 1 });
    }
  };
  onBack() {
    history.push("/addGroup");
  }
  render() {
    const postitems = (
      <div className="check">
        <ul class="list-group">
          {this.state.posts
            .filter(post => {
              return (
                !this.state.filterText ||
                post.username
                  .toLowerCase()
                  .startsWith(this.state.filterText.toLowerCase()) ||
                post.email
                  .toLowerCase()
                  .startsWith(this.state.filterText.toLowerCase())
              );
            })
            .map((post, index) => (
              <li class="list-group-item list-group-item-light" key={post.id}>
                <input
                  type="checkbox"
                  className="boxs"
                  onClick={() => this.toggleHighlight(index)}
                  checked={post.highlighted}
                />
                <label className="blabe">
                  <div className="userName">{post.username}</div>
                  <div className="emails">{post.email}</div>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
    return (
      <main className="TheMain">
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />

          <h2 className="center_label">
            <b>{this.props.name}</b>
          </h2>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
            id="username"
            type="text"
            onChange={this.onChange}
            autoComplete="off"
          />
          <button
            className={this.state.count == 0 ? "select" : "select2"}
            id="check"
            onClick={this.selectall}
          >
            {this.state.check}
          </button>
        </div>

        <div className="OnToTheNextOne" />
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        <label className="bottomlabel">
          <button className="deleteUser" onClick={this.handleOnClick}>
            Create Group
          </button>
        </label>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName,
  thegroup: state.posts.selectedItem
});

export default connect(
  mapStateToProps,
  { createGroups }
)(Groups);
