import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { BASE_URL } from "../actions/types";
import { withRouter } from "react-router-dom";
import marked from "./GroupImages/selectedIcon.png";
import unmarked from "./GroupImages/Oval.png";
import back from "./GroupImages/back.png";
import { AddMemberAction, pageState } from "../actions/postActions";
import seleteAll from "./GroupImages/seleteAll.png";
import unSelectAll from "./GroupImages/unSelectAll.png";

class AddMembersGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      filterText: "",
      selected: "",
      count: 0,
      check: "Select all",
      height: window.innerHeight,
      width: window.innerWidth,
      heightOfClient: document.body.clientHeight

    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.selectall = this.selectall.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
    this.extractEmails = this.extractEmails.bind(this);
  }
  async componentDidMount() {
    this.updateDimensions();
    await this.props.AddMemberAction(this.props.id);
  }
  componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - 225 + "px";
    } else {
      return "63vh";
    }
  }
  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  async addUsers() {
    const { newArray } = this.state;
    for (var i = 0; i < this.props.existing.length; i++) {
      if (this.props.existing[i].highlighted === true) {
        newArray.push(this.props.existing[i]);
      }
      delete this.props.existing[i].highlighted;
      delete this.props.existing[i].id;
    }

    let request = {
      users: this.state.newArray,
      GroupIds: this.props.id
    };
    await fetch(BASE_URL + "/api/groups/postMember/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(function (response) { })
      .then(function (data) { })
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
    this.setState({ filterText: "" })
    this.props.pageState(1);
  }

  toggleHighlight = event => {
    const index = this.props.memberIds.indexOf(event);
    if (this.props.existing[index].highlighted === true) {
      this.props.existing[index].highlighted = false;
      this.setState({ count: this.state.count - 1 });
    } else {
      this.props.existing[index].highlighted = true;
      this.setState({ count: this.state.count + 1 });
    }
  };

  onBack() {
    this.props.pageState(1);
  }


  extractEmails(text) {
    if (this.state.filterText[0] === "@") {
      let ser = text.search("@")
      let word = text.substring(ser, text.length)
      let ss = word.split(".")
      return ss[0];
    }
    else {
      return text;
    }
  }

  cancel = () => {
    for (var i = 0; i < this.props.existing.length; i++) {
      this.props.existing[i].highlighted = false;
    }
    this.setState({ count: 0 });
    this.setState({ check: "Select all" });
  };

  selectall() {
    let arr = []
    this.props.existing.filter(post => {
      return (
        !this.state.filterText ||
        post.username
          .toLowerCase()
          .startsWith(this.state.filterText.toLowerCase()) ||
        post.email
          .toLowerCase()
          .startsWith(this.state.filterText.toLowerCase()) || (this.extractEmails(post.email)).startsWith(this.state.filterText.toLowerCase())
      );
    }).map(data => arr.push(data.id))

    if (this.state.check === "Select all") {
      this.setState({ count: arr.length });
      for (var i = 0; i < arr.length; i++) {
        (this.props.existing[this.props.memberIds.indexOf(arr[i])]).highlighted = true;
      }
      this.setState({ check: "Unselect all" });
    } else {
      this.setState({ count: 0 });
      for (var j = 0; j < arr.length; j++) {
        (this.props.existing[this.props.memberIds.indexOf(arr[j])]).highlighted = false;
      }
      this.setState({ check: "Select all" });
    }
  }
  keyboardHideNav = ()=>{
    let Navbar = document.querySelector(".navbar-admin");
    if(Navbar!=null){
      if (window.innerWidth < 575 && window.innerHeight < 800) {
        if (this.props.screenSize === document.body.clientHeight) {
          if(this.state.count === 0){
            Navbar.classList.remove("hidden");
          }
          else{
            Navbar.classList.add("hidden"); 
          }          
        } else {
          Navbar.classList.add("hidden");
        }
      }
    }
  }


  render() {
    this.keyboardHideNav();
    const postitems = (
      <div
        className="adding-check-edit"
        style={{ height: this.getBodyHeight() }}
      >
        {this.props.existing.length === 0 ? (
          <div className="edit-no-user-container">
            <label className="edit-no-user-msg">
              All users/members have already been added to this group.
            </label>
          </div>
        ) : (
            <ul class="list-group">
              {this.props.existing
                .filter(post => {
                  return (
                    !this.state.filterText ||
                    post.username
                      .toLowerCase()
                      .startsWith(this.state.filterText.toLowerCase()) ||
                    post.email
                      .toLowerCase()
                      .startsWith(this.state.filterText.toLowerCase()) ||
                    (this.extractEmails(post.email)).startsWith(this.state.filterText.toLowerCase())
                  );
                })
                .map(post => (
                  <li
                    class="listItem"
                    key={post.id}
                    onClick={() => this.toggleHighlight(post.id)}
                  >
                    <div className="addMember-image-container">
                    <img
                      className="checkbox-delete"
                      src={post.highlighted ? marked : unmarked}
                      alt=""
                    /></div>  
                    <label
                      className={
                        post.highlighted === true ? "add-blabe" : "add-blabe2"
                      }
                    >
                      <div
                        className={
                          post.highlighted === true
                            ? "userName-active"
                            : "userName"
                        }
                      >
                        {post.username}
                      </div>
                      <div
                        className={
                          post.highlighted === true ? "emails-active" : "email"
                        }
                      >
                        {post.email}
                      </div>
                    </label>
                  </li>
                ))}
            </ul>
          )}
      </div>
    );
    return (
      <div className="add-The-Main">
        <div className="navBar-containers">
          <img className="back-image" onClick={this.onBack} src={back} alt="" />
          <div className="the-nav-bar">
            <img
              className="back-image"
              onClick={this.onBack}
              src={back}
              alt=""
            />
            <table className="names-table">
              <tbody className="nameTbody">
                <tr>
                  <td className="center-labelss">ADD USERS</td>
                </tr>
                <tr>
                  <td className="nameOfGroup">
                    {this.props.name.toUpperCase()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="BNavBars">
            <div className="inputBox">
              <input
                className="the-Text"
                id="username"
                type="text"
                onChange={this.onChange}
                autoComplete="off"
                placeholder="Search"
              />
            </div>
            <div className="switchAll" onClick={this.selectall}>
              <img
                className="btn-select-all"
                src={
                  this.state.count === this.props.existing.length
                    ? seleteAll
                    : unSelectAll
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div>
          {this.props.loader === true ? (
            postitems
          ) : (
            <div className={this.props.loader ? "hidden" : "loader-formatting"}>
              <div className={this.props.loader ? "hidden" : "loader"} />
              <div
                className={this.props.loader ? "hidden" : "target-loader-image"}
              />
              <div className={this.props.loader ? "hidden" : "loading-message"}>
                Loading...
              </div>
            </div>
          )}
        </div>

        {this.state.count === 0 ? null : (
          <div className="bottom-panel">
            <div className="bpanel">
              <button  className="add-member-cancel-delete" onClick={() => this.cancel()}>
                 CANCEL
              </button>

              <button className="add-member-confirm-group" onClick={this.addUsers}>
              ADD USERS
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  id: state.posts.groupId,
  name: state.posts.groupName,
  existing: state.posts.existing,
  memberIds: state.posts.memberIds,
  loader: state.posts.loader,
  screenSize: state.posts.screenSize
});
export default withRouter(
  connect(
    mapStateToProps,
    { AddMemberAction, pageState }
  )(AddMembersGroup)
);
