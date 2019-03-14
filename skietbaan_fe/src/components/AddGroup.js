import React, { Component } from "react";
import { connect } from "react-redux";
import { createGroups, getName } from "../actions/postActions";
import history from './history';
import "./add.css";
import { BASE_URL } from "../actions/types";
import error from "./GroupImages/error.png";
import back from "./GroupImages/back.png";
import { getCookie } from '../components/cookie.js';

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colors: true,
      txt: "",
      groups: [],
      exist: true,
      pageState:false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount(){
    fetch(BASE_URL + "/api/groups")
    .then(res=>res.json())
    .then(data=>this.setState({
      groups:data.map(names=>
        names.name
        )
    }))
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick() {
    
      if (this.state.groups.indexOf(this.state.name) == -1) {
        if (this.state.name.length != 0) {
          this.props.getName(this.state.name);
          history.push("/Groups");
        } else {
          this.setState({ txt: "group name can't be empty" });
        }
      } else {
        this.setState({ exist: false });
      }
  }

  render() {
    if(!getCookie("token")){
      window.location = "/registerPage";
  }
    return (
      <div className="add-group-main">
        <div className="page">
          <div className="the-nav-bar">
          <a href="/create" className="back-container">
            <img
              className="back-image"
              onClick={this.onBack}
              src={back}
              alt=""
            /></a>
              <label className="center-label">Create Groups</label>
            </div>
        
          <div className="middle-bar">
            <label className="name">
              Enter Group Name{" "}
              {this.state.exist ? null : <img src={error} alt="" />}
            </label>
            <input
              className={this.state.name == "" ? "texts" : "texts-active"}
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              autoComplete="off"
              autoCorrect="off"
              placeholder={this.state.txt}
            />
            {this.state.exist ? (
              <div className="group-error" />
            ) : (
              <div className="group-error">Group name already taken</div>
            )}
            <button
              className={this.state.name == "" ? "add" : "add2"}
              type="submit"
              onClick={this.onClick}
            >
              Add Users
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName
});

export default (connect(
  mapStateToProps,
  { createGroups, getName }
)(AddGroup));
