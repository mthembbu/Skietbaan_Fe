import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../actions/types";
class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      filterText: "",
      count: 0
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentwillmount() {
    if (this.props.id != 0) {
      fetch(BASE_URL + "/api/Groups/edit?id=" + this.props.id)
        .then(res => res.json())
        .then(data => {
          this.setState({
            posts: data.map(users => {
              return {
                ...users,
                highlighted: true,
                colors: "black"
              };
            })
          });
        });
    } else {
      this.props.history.push("/ViewGroups");
    }
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  handleOnClick() {
    this.setState({ count: 0 });

    const { newArray } = this.state;
    const newarry = [...this.state.posts];

    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === false) {
        newArray.push(this.state.posts[i]);
        newarry.splice(i, 1);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
      delete this.state.posts[i].colors;
    }
    this.setState({ posts: newarry });

    let request = {
      GroupIds: this.props.id,
      users: this.state.newArray
    };
    fetch(BASE_URL + "/api/groups/deleteMember/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .catch(function(data) {});
  }
  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;
      this.state.posts[event].colors = "red";
      this.setState({ count: this.state.count - 1 });
    } else {
      this.state.posts[event].highlighted = true;
      this.state.posts[event].colors = "black";
      this.setState({ count: this.state.count + 1 });
    }
  };
  onBack() {
    this.props.history.push("/ViewGroups");
  }

  goToNext = () => {
    this.props.history.push("/AddMembersGroup");
  };
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
                  color: "red"
                }}
              >
                <input
                  type="checkbox"
                  className="boxs"
                  onClick={() => this.toggleHighlight(index)}
                  checked={post.highlighted}
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
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />
          <div className="center_label">{this.props.name}</div>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
            id="username"
            type="text"
            onChange={this.onChange}
            autoComplete="off"
          />
          <button className="select" onClick={this.goToNext}>
            Add new
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
        {this.state.count == 0 ? null : (
          <label className="bottomlabel">
            <button className="deleteUser" onClick={this.handleOnClick}>
              delete
            </button>
          </label>
        )}
      </main>
    );
  }
}
const mapStateToProps = state => ({
  id: state.posts.groupId,
  name: state.posts.groupName
});

export default withRouter(connect(mapStateToProps)(EditGroup));
