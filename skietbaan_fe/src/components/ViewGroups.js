import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { passId, getName } from "../actions/postActions";
import { BASE_URL } from "../actions/types";
import deleteState from "./GroupImages/deleteState.png";
import normalstate from "./GroupImages/submit-plus.png";
import back from "./GroupImages/back.png";

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      ShowMe: true,
      ids: 0,
      index: 0,
      selected: "",
      deleteState: false
    };
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }

  UNSAFE_componentWillMount() {
    fetch(BASE_URL + "/api/Groups")
      .then(res => res.json())
      .then(data =>
        this.setState({
          posts: data.map(users => {
            return {
              ...users,
              colors: "black",
              image: normalstate
            };
          })
        })
      );
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  onBack() {
    this.props.history.push("/ViewGroups");
  }
  editGroup(event, name) {
    this.props.getName(name);
    this.props.passId(event);
    this.props.history.push("/EditGroup");
  }

  update = (id, indexs, name) => {
    const newarry = [...this.state.posts];
    newarry[indexs].colors = "red";
    newarry[indexs].image = deleteState;
    this.setState({
      ids: id,
      index: indexs,
      selected: name,
      ShowMe: false,
      posts: newarry,
      ShowMe: false,
      deleteState: true
    });
  };

  delete() {
    this.setState({ ShowMe: false });
    const newarry = [...this.state.posts];
    newarry.splice(this.state.index, 1);
    this.setState({ posts: newarry });

    fetch(BASE_URL + "/api/Groups/"+this.state.ids, {
      method:"POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.ids)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
  }

  changeState = () => {
    this.setState({ ShowMe: false });
  };

  do = () => {
    const newarry = [...this.state.posts];
    newarry[this.state.index].colors = "black";
    newarry[this.state.index].image = normalstate;
    if (this.state.ShowMe == false) {
      this.setState({ ShowMe: true });
    }
  };

  cancel = () => {
    const newarry = [...this.state.posts];
    newarry[this.state.index].colors = "black";
    newarry[this.state.index].image = normalstate;
    this.setState({ selected: "", posts: newarry });
  };
  S;

  handleOnClick = () => {};
  render() {
    const postitems = (
      <div className="the-main">
        <table className="table-member">
          <tbody>
            {this.state.posts
              .filter(post => {
                return (
                  !this.state.filterText ||
                  post.username
                    .toLowerCase()
                    .startsWith(this.state.filterText.toLowerCase()) ||
                  post.email
                    .toLowerCase()
                    .startsWith(this.state.filterText.toLowerCase()) ||
                  post.memberID.startsWith(this.state.filterText)
                );
              })
              .map((post, index) => (
                <tr className="view-group" key={post.id}>
                  <td
                    className="first-row"
                    onClick={() => this.editGroup(post.id, post.name)}
                    style={{ color: post.colors }}
                  >
                    {post.name}
                  </td>
                  <td>
                    <div
                      className="group-view"
                      onClick={() => this.update(post.id, index, post.name)}
                    >
                      <img src={post.image} alt="" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <main className="The-Main" onClick={() => this.do()}>
        <div className="The-nav-bar">
          <img className="back-Image" onClick={this.onBack} src={back} alt="" />
          <label className="center-label">View Groups</label>
        </div>
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        {this.state.ShowMe  ? null : (
          <div className="bpanel">
            <table className="group-delete-table">
              <tbody>
                <tr>
                  <td>
                    <div className="the-textname">Delete</div>
                  </td>
                  <td>
                    <span className="name-of-group">
                      {this.state.selected}{" "}
                    </span>
                  </td>
                  <div className="confrim-cancel">
                    <td>
                      <button
                        className="group-confirm"
                        onClick={() => this.delete()}
                      >
                        Confirm
                      </button>
                    </td>
                    <td className="group-undo">
                      <button
                        className="updatess"
                        onClick={() => this.cancel()}
                      >
                        Cancel
                      </button>
                    </td>
                  </div>
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
  name: state.posts.groupName,
  id: state.posts.groupId
});

export default withRouter(
  connect(
    mapStateToProps,
    { passId, getName }
  )(ViewGroups)
);
