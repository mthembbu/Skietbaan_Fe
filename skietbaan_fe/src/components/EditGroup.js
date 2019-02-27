import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from "./history";
class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      filterText: ""
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    fetch("http://localhost:63474/api/Groups/edit?id=" + this.props.id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
    console.log(request);
    fetch("http://localhost:63474/api/groups/deleteMember/" + this.props.id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: request
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
  }
  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;
      {
        this.setState({ count: this.state.count - 1 });
      }
    } else {
      this.state.posts[event].highlighted = true;
      {
        this.setState({ count: this.state.count + 1 });
      }
    }
  };
  onBack() {
    history.push("/ViewGroups");
  }

  goToNext = () => {
    history.push("/AddMembersGroup");
  };
  render() {
    console.log(this.props.id);
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
                />
                <label className="blabe">
                  {post.username} <br />
                  {post.email}
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
          <div className="center_label">
            <b>{this.props.name}</b>
          </div>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
            id="username"
            type="text"
            placeholder="Search.."
            onChange={this.onChange}
            autoComplete="off"
          />
          <button className="select" onClick={this.goToNext}>
            Add new
          </button>
        </div>

        <div className="OnToTheNextOne" />
        <br />
        <br />
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        <label className="bottomlabel">
          <button className="deleteUser" onClick={this.handleOnClick}>
            delete
          </button>
        </label>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  id: state.posts.groupId,
  name: state.posts.groupName
});

export default connect(mapStateToProps)(EditGroup);
