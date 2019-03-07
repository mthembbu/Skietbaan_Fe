import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { createGroups } from "../actions/postActions";
import { BASE_URL } from "../actions/types";
import back from "./GroupImages/back.png"

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      groups: [],
      count: 0,
      filterText: "",
      check: "Select all"
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
              users.highlighted=false;
              return {
                ...users,
                highlighted: false,
                backgrnd:"white"
              };
            })
          });
        });
    } else {
      this.props.history.push("/AddGroup");
    }
    fetch("http://localhost:50209/api/Groups")
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
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArray)
    })
      .then(function(response) {})
      .catch(function(data) {});
  }

  selectall() {
    const newarry = [...this.state.posts];
    if (this.state.check == "Select all") {
      for (var i = 0; i < this.state.posts.length; i++) {
        newarry[i].highlighted = true;
        this.state.posts[i].backgrnd = "#F3F4F9";
      }
      this.setState({ check: "Unselect all" });
      this.setState({ posts: newarry });
    } else {
      for (var i = 0; i < this.state.posts.length; i++) {
        newarry[i].highlighted = false;
        this.state.posts[i].backgrnd = "white";
      }
      this.setState({ check: "Select all" });
      this.setState({ posts: newarry });
    }
  }

  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;
      this.state.posts[event].backgrnd = "white";
      
      this.setState({ count: this.state.count + 1 });
    } else {
      this.state.posts[event].highlighted = true;
      this.state.posts[event].backgrnd = "#F3F4F9";
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
                  borderLeftStyle: "none",
                  borderRightStyle: "none",
            
                  background:post.backgrnd
                }}
              >
                <input
                  type="checkbox"
                  className="boxs"
                  onClick={() => this.toggleHighlight(index)}
                  checked={post.highlighted}
                  style={{border:"2px solid black", marginTop:"17px" ,marginRight:"23px"}}
                />
                <label className="blabe">
                  <div className="userName" style={{ color: post.colors }}>
                    {" "}
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
      <main className="TheMain">
        <div className="TheNavBar">
          <img className="backImage" src={back} alt="" />
          <div className="center_label">{this.props.name}</div>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
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

export default withRouter(
  connect(
    mapStateToProps,
    { createGroups }
  )(Groups)
);
