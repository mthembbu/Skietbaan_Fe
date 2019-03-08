import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { createGroups } from "../actions/postActions";
import { BASE_URL } from "../actions/types";
import back from "./GroupImages/back.png";
import unmarked from "./GroupImages/unmarked.png";
import marked from "./GroupImages/marked.png";


class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      groups: [],
      count: 0,
      filterText: "",
      check: "Select all",
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectall = this.selectall.bind(this);
  }
  UNSAFE_componentWillMount() {
    if (this.props.name.length != 0) {
      fetch(BASE_URL + "/api/user")
        .then(res => res.json())
        .then(data => {
          this.setState({
            posts: data.map(users => {
              users.highlighted = false;
              return {
                ...users,
                highlighted: false,
                background: "white",
                image: unmarked
              };
            })
          });
        });
    } else {
      this.props.history.push("/AddGroup");
    }
    fetch(BASE_URL + "/api/Groups")
      .then(res => res.json())
      .then(data => this.setState({ groups: data.name }));
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  handleOnClick() {
    const requestedObj = {
      name: this.props.name.toLowerCase()
    };
    this.props.createGroups(requestedObj);
    const { newArray } = this.state;
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === true) {
        newArray.push(this.state.posts[i]);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
    }

    fetch(BASE_URL + "/api/groups/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArray)
    })
      .then(function(response) {})
      .catch(function(data) {});
      this.props.history.push("/ViewGroups");
  }

  selectall() {

    const newarry = [...this.state.posts];
    if (this.state.check == "Select all") {
      this.setState({count:newarry.length})
      for (var i = 0; i < this.state.posts.length; i++) {
        newarry[i].highlighted = true;
        this.state.posts[i].image = marked;
        this.state.posts[i].background = "#F3F4F9";
      }
      this.setState({ check: "Unselect all" });
      this.setState({ posts: newarry });
    } else {
      this.setState({count:0})
      for (var i = 0; i < this.state.posts.length; i++) {
        newarry[i].highlighted = false;
        this.state.posts[i].image = unmarked;
        this.state.posts[i].background = "white";
      }
      this.setState({ check: "Select all" });
      this.setState({ posts: newarry });
    }
  }

  toggleHighlight = event => {
    if (this.state.posts[event].highlighted == true) {
      this.state.posts[event].highlighted = false;
      this.state.posts[event].image = unmarked;
      this.state.posts[event].background = "white";

      this.setState({ count: this.state.count + 1 });
    } else {
      this.state.posts[event].highlighted = true;
      this.state.posts[event].background = "#F3F4F9";
      this.state.posts[event].image = marked;
      this.setState({ count: this.state.count - 1 });
    }
  };
  onBack() {
    this.props.history.push("/addGroup");
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
              <li
                class="list-group-item list-group-item-light"
                key={post.id}
                style={{
                  background: post.background
                }}
              >
                <img
                  className="checkbox-delete"
                  onClick={() => this.toggleHighlight(index)}
                  src={post.image}
                  alt=""
                />
                <label className="blabe">
                  <div className="userName" style={{ color: post.colors }}>
                    {post.username}
                  </div>
                  <div className="emails" style={{ color: post.colors }}>
                    {post.email}
                  </div>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
    return (
      <main className="The-Main">
        <div className="the-nav-bar">
          <img className="back-image" onClick={this.onBack} src={back} alt="" />
          <label className="center-label">{this.props.name}</label>
        </div>
        <div className="BNavBar">
          <input
            className="the-Text"
            id="username"
            type="text"
            onChange={this.onChange}
            autoComplete="off"
            placeholder="Search user"
          />
          <button
            className={this.state.check == "Select all" ? "select" : "select2"}
            id="check"
            onClick={this.selectall}
          >
            {this.state.check}
          </button>
        </div>

        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        {this.state.count == 0 ? null : (
          <label className="bottom-label">
            <button className="delete-User" onClick={this.handleOnClick}>
              Create Group
            </button>
          </label>
        )}
      </main>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName,
  thegroup: state.posts.selectedItem
});

export default withRouter(
  connect(
    mapStateToProps,
    { createGroups }
  )(Groups)
);
