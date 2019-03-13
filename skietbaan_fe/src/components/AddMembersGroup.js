import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { BASE_URL } from "../actions/types";
import { EditGroupAction ,AddMemberAction } from "../actions/postActions";
import { withRouter } from "react-router-dom";
import marked from "./GroupImages/marked.png";
import unmarked from "./GroupImages/unmarked.png";
import back from "./GroupImages/back.png";
import { getCookie } from '../components/cookie.js';
class AddMembersGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      filterText: "",
      selected: "",
      count: 0,
      pageState:false
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addUsers = this.addUsers.bind(this);
  }

  componentDidMount() {
    if(!getCookie("token")){
      window.location = "/registerPage";
  }
    if (this.props.id != 0) {
        this.props.AddMemberAction(this.props.id)  
    } else {
      this.props.history.push("/ViewGroups");
    }
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

 addUsers() {
    if(this.state.pageState==false){
      const { newArray } = this.state;
      for (var i = 0; i < this.props.existing.length; i++) {
        if (this.props.existing[i].highlighted === true) {
          delete this.props.existing[i].highlighted;
          delete this.props.existing[i].image;
          delete this.props.existing[i].background;
          newArray.push(this.props.existing[i]);
        }
      }
      let request = {
        users: this.state.newArray,
        GroupIds: this.props.id
      };
  
      fetch(BASE_URL + "/api/groups/postMember/", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      })
       this.props.EditGroupAction(this.props.id)
        this.props.history.push("/EditGroup");
        this.setState({pageState:true})
    }
  }

  toggleHighlight = (name, event) => {
    if (this.props.existing[event].highlighted === true) {
      this.props.existing[event].background = "#fdfdfd";
      this.props.existing[event].highlighted = false;
      this.setState({ count: this.state.count - 1 });
    } else {
      this.setState({ selected: name });
      this.props.existing[event].background = "#F3F4F9";
      this.props.existing[event].highlighted = true;
      this.setState({ count: this.state.count + 1 });
    }
  };

  onBack() {
    this.props.history.push("/EditGroup");
  }

  cancel = () => {
    for (var i = 0; i < this.props.existing.length; i++) {
      if (this.props.existing[i].highlighted === true){
        this.props.existing[i].highlighted=false;
        this.props.existing[i].background = "#fdfdfd";
      }
      
    }
    this.setState({count:0})
  }
  
  render() {
    const postitems = (
      <div className="check">
        <ul class="list-group" style={{textAlign:"left"}}>
          {this.props.existing
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
                style={{ background: post.background ,textAlign:"left"}}
              >
                <img
                  className="checkbox-delete"
                  onClick={() => this.toggleHighlight(post.username, index)}
                  src={post.highlighted ? marked : unmarked}
                  alt=""
                />
                <label className="blabe">
                  <div className="userName"> {post.username}</div>
                  <div className="email">{post.email}</div>
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
          <label className="center-labels">{this.props.name}</label>
        </div>
        <div className="BNavBar">
          <input
            className="the-Text"
            id="username"
            type="text"
            onChange={this.onChange}
            autoComplete="off"
          />
        </div>

        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>

        {this.state.count==0  ? null : (
          <div className="bottom-panel">
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
                        className="group-confirm-add"
                        onClick={() => this.addUsers()}
                      >
                        Confirm
                      </button>
                    </td>
                    <td className="group-undo">
                      <button className="updatess" onClick={() => this.cancel()}
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
  id: state.posts.groupId,
  name: state.posts.groupName,
  existing: state.posts.existing
});
export default withRouter(connect(mapStateToProps,{EditGroupAction ,AddMemberAction})(AddMembersGroup));
