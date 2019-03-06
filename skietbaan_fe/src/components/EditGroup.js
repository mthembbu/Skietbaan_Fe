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
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    if (this.props.id != 0) {
      fetch(BASE_URL + "/api/Groups/edit?id=" + this.props.id)
        .then(res => res.json())
        .then(data => {
          this.setState({
            posts: data.map(users => {
              return {
                ...users,
                highlighted: true,
                colors: "black",
                backgrnd:"#F3F4F9"
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

  delete=()=> {
    this.setState({ count: 0 });
    console.log(this.state.newArray)
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
      delete this.state.posts[i].backgrnd;
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
      this.state.posts[event].backgrnd = "white";

      this.setState({ count: this.state.count - 1 });
    } else {
      this.state.posts[event].highlighted = true;
      this.state.posts[event].colors = "black";
      this.state.posts[event].backgrnd = "#F3F4F9";
      this.setState({ count: this.state.count + 1 });
    }
  };rt
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
                  color: "red",
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
          <button className="select2" onClick={this.goToNext}>
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
        {this.state.count==0 ? null : (
          <div className="bpanel">
            <table className="group-delete-table">
              <tbody>
                <tr>
                  <td>
                    <div className="thetextname">Delete</div>
                  </td>
                  <td>
                    <span className="name-of-group">
                      {this.state.selected}{" "}
                    </span>
                  </td>
                  <td>
                    <button
                      className="group-confirm"
                      onClick={() => this.delete()}
                    >
                      Confirm
                    </button>
                  </td>
                  <td className="group-undo">
                    <button className="updatess" onClick={() => this.cancel()}>
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
