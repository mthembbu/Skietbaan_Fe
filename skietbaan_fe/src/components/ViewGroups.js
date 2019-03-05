import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { passId, getname } from "../actions/postActions";
import { BASE_URL } from "../actions/types";
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
      selected: ""
    };
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }
  componentWillMount() {
    fetch(BASE_URL + "/api/Groups")
      .then(res => res.json())
      .then(data =>
        this.setState({
          posts: data.map(users => {
            return {
              ...users,
              colors: "black"
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
    this.props.getname(name);
    this.props.passId(event);
    this.props.history.push("/EditGroup");
  }

  update = (id, indexs, name) => {
    const newarry = [...this.state.posts];
    newarry[indexs].colors = "red";
    this.setState({
      ids: id,
      index: indexs,
      selected: name,
      ShowMe: false,
      posts: newarry
    });
  };

  delete() {
    this.setState({ ShowMe: false });
    const newarry = [...this.state.posts];
    newarry.splice(this.state.index, 1);
    this.setState({ posts: newarry });
    fetch(BASE_URL + "/api/Groups" + this.state.ids, {
      method: "delete",
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
    if (this.state.ShowMe == false) {
      this.setState({ ShowMe: true });
    }
  };

  cancel = () => {
    this.setState({ selected: "" });
  };

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
                    <div className="group-view">
                      <img
                        src={require("./GroupImages/submit plus add score.png")}
                        alt=""
                        onClick={() => this.update(post.id, index, post.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <main className="TheMain" onClick={() => this.do()}>
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />

          <label className="center_label">View Groups</label>
        </div>
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>

        <div className="bpanel">
          <table className="group-delete-table">
            <tbody>
              <tr>
                <td>
                  <div className="thetextname">Delete</div>
                </td>
                <td>
                  <span className="name-of-group">{this.state.selected} </span>
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
    { passId, getname }
  )(ViewGroups)
);
