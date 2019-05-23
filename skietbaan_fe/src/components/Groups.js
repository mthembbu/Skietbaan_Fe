import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import { withRouter } from "react-router-dom";
import { createGroups, pageState } from "../actions/postActions";
import { BASE_URL } from "../actions/types";
import back from "./GroupImages/back.png";
import unmarked from "./GroupImages/Oval.png";
import marked from "./GroupImages/selectedIcon.png";
import history from "./history";
import seleteAll from "./GroupImages/seleteAll.png";
import unSelectAll from "./GroupImages/unSelectAll.png";
import { Row, Col } from "react-bootstrap";
import { getCookie } from "./cookie";
import { fetchNumberOfNotification } from "../actions/notificationAction";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      groups: [],
      newArray: [],
      ids: [],
      count: 0,
      st: true,
      filterText: "",
      check: "Select all",
      height: window.innerHeight,
      width: window.innerWidth,
      token: getCookie("token"),
      getData: false,
      heightOfClient: document.body.clientHeight

    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectall = this.selectall.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
    this.extractEmails = this.extractEmails.bind(this);
  }
  UNSAFE_componentWillMount() {
    fetch(BASE_URL + "/api/user")
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.map(users => {
            this.state.ids.push(users.id);
            return {
              ...users,
              highlighted: false
            };
          })
        });
      });

    fetch(BASE_URL + "/api/Groups")
      .then(res => res.json())
      .then(data =>
        this.setState({
          groups: data.name,
          getData: true
        })
      )
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }
  componentWillMount() {
    window.addEventListener('resize',this.updateDimensions());
    this.setState({count:0})
    let Navbar = document.querySelector(".navbar-admin");
      if(Navbar!=null){
        Navbar.classList.remove("hidden");
      }
	}
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - 225 + "px";
    } else {
      return "61vh";
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

  async handleOnClick() {
    const { newArray } = this.state;
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === true) {
        newArray.push(this.state.posts[i]);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
    }

    const requestedObj = {
      name: this.props.name,
      users: this.state.newArray
    };

    await fetch(BASE_URL + "/api/groups/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestedObj)
    })
      .then(function(response) {})
      .catch(function(data) {})
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
    this.props.fetchNumberOfNotification(this.state.token);
    this.props.pageState(0);
    history.push("/create");
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

  selectall() {
    let arr = []
    this.state.posts.filter(post => {
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
        (this.state.posts[this.state.ids.indexOf(arr[i])]).highlighted = true;
      }
      this.setState({ check: "Unselect all" });
    } else {
      this.setState({ count: 0 });
      for (var j = 0; j < arr.length; j++) {
        (this.state.posts[this.state.ids.indexOf(arr[j])]).highlighted = false;
      }
      this.setState({ check: "Select all" });
    }
  }

  cancel = () => {
    for (var i = 0; i < this.state.posts.length; i++) {
      this.state.posts[i].highlighted = false;
    }
    this.setState({ count: 0 });
  };

  toggleHighlight = event => {
    const index = this.state.ids.indexOf(event);
    if (this.state.posts[index].highlighted === true) {
      this.state.posts[index].highlighted = false;
      this.setState({ count: this.state.count - 1 });
    } else {
      this.state.posts[index].highlighted = true;
      this.setState({ count: this.state.count + 1 });
    }
  };
  onBack() {
    this.setState({ count: 0 });
    this.props.history.push("/create");
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
      <div className="check" style={{ height: this.getBodyHeight() }}>
        {this.state.posts.length === 0 ? null : (
          <ul class="list-group" style={{ textAlign: "left" }}>
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
                  this.extractEmails(post.email).startsWith(
                    this.state.filterText.toLowerCase()
                  )
                );
              })
              .map((post, index) => (
                <li
                  className="listItem"
                  key={post.id}
                  onClick={() => this.toggleHighlight(post.id)}
                >`
                <div className="group-image-container"
                >
                  <img
                    className="checkbox-delete"
                    src={post.highlighted === true ? marked : unmarked}
                    alt=""
                  /></div>
                  <label
                    className={post.highlighted === true ? "blabe" : "blabe2"}
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
      <Row className="row justify-content-center">
        <Col
          sm={8}
          className="createpage-bootstrap-col-center-container"
          style={{ position: "inherit" }}
        >
          {" "}
          {/* inline style to avoid affecting all bootstrap col-sm-8 in all pages */}
          <div className="The-Main">
            <div className="group-navBar-container">
              <div className="the-nav-bar">
                <img
                  className="back-image"
                  onClick={this.onBack}
                  src={back}
                  alt=""
                />
                <label className="center-label">ADD USERS</label>
              </div>
              <div class="BNavBar">
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
                      this.state.count === this.state.posts.length
                        ? seleteAll
                        : unSelectAll
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              className={
                this.state.getData === false ? "loader-formatting" : "hidden"
              }
            >
              <div
                className={this.state.getData === false ? "loader" : "hidden"}
              />
              <div
                className={
                  this.state.getData === false
                    ? "target-loader-image"
                    : "hidden"
                }
              />
              <div
                className={
                  this.state.getData === false ? "loading-message" : "hidden"
                }
              >
                Loading...
              </div>
            </div>
            {postitems}
            {this.state.count === 0 ? null : (
              <label className="bottom-label">
                <button className="cancel-creating-group" onClick={()=>this.cancel()}>
                  CANCEL
                </button>
                <button className="create-group" onClick={this.handleOnClick}>
                  CREATE GROUP
                </button>
              </label>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName,
  thegroup: state.posts.selectedItem,
  screenSize: state.posts.screenSize
});

export default withRouter(
  connect(
    mapStateToProps,
    { pageState, createGroups, fetchNumberOfNotification }
  )(Groups)
);
