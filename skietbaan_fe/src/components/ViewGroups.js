import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from "./history";
import { passId } from "../actions/postActions";
import { getname } from "../actions/postActions";
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
      .then(data => this.setState({ posts: data }));
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  onBack() {
    history.push("/ViewGroups");
  }
  editGroup(event, name) {
    this.props.getname(name);
    this.props.passId(event);
    history.push("/EditGroup");
  }

  update = (post, indexs, name) => {
    this.setState({ ids: post });
    this.setState({ index: indexs });
    this.setState({ selected: name });
  };

  delete() {
    this.setState({ ShowMe: false });
    const newarry = [...this.state.posts];

    newarry.splice(this.state.index, 1);
    this.setState({ posts: newarry });
    fetch(BASE_URL + "/api/groups/" + this.state.ids, {
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
    if (this.state.ShowMe == true) {
      this.setState({ ShowMe: false });
    } else {
      this.setState({ ShowMe: true });
    }
  };

  handleOnClick = () => {};
  render() {
    const postitems = (
      <div className="check" onClick={() => this.do()}>
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
                style={{
                  width: "100%",
                  background: "#504F51",
                  borderColor: "white"
                }}
                class="list-group-item list-group-item-light"
                key={post.id}
              >
                <label className="the-container">
                  <label
                    className="nn"
                    onClick={() => this.editGroup(post.id, post.name)}
                  >
                    <div className="groupNames"> {post.name}</div>
                  </label>
                  <div className="group-delete" style={{ marginRight: "32px" }}>
                    <img
                      src={require("./GroupImages/submit plus add score.png")}
                      alt=""
                      onClick={() => this.update(post.id, index, post.name)}
                    />
                  </div>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );

    return (
      <main className="TheMain" onClick={() => this.do()}>
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />

          <h2 className="center_label">View Groups</h2>
        </div>
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        {this.state.ShowMe ? null : (
          <div className="bpanel">
            <div className="thetextname">Delete {this.state.selected}</div>
            <div className="cntra">
              <button className="group-confirm" onClick={() => this.delete()}>
                Confirm
              </button>
            </div>
            <div className="botname">
              <button className="updatess">Undo</button>
            </div>
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

export default connect(
  mapStateToProps,
  { passId, getname }
)(ViewGroups);
