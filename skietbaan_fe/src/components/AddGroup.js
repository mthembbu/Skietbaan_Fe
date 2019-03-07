import React, { Component } from "react";
import { connect } from "react-redux";
import { createGroups, getname } from "../actions/postActions";
import "./add.css";
import { BASE_URL } from "../actions/types";
import error from "./GroupImages/error.png"
import back from "./GroupImages/back.png"


class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colors: true,
      txt: "",
      groups: [],
      exist: true
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
   
  }
  onClick() {
    if (this.state.groups.indexOf(this.state.name) == -1) {
      if (this.state.name.length != 0) {
        this.props.getname(this.state.name);
        // history.push("/Groups");
        window.location = "/Groups"
      } else {
        this.setState({ txt: "group name can't be empty" });
      }
    } else {
      this.setState({ exist: false });
    }
  }
  

 UNSAFE_componentWillMount() {
    fetch(BASE_URL + "/api/Groups")
      .then(res => res.json())
      .then(data =>
        this.setState({
          groups: data.map(group => group.name)
        })
      );
  }
  render() {
    return (
      <div className="addgroup-main">
      <div className="page">
        <div className="top_bar">
        <img className="fa-angle-left" src={back} alt="" />
          <label className="center_labels">Create Group</label>
        </div>

        <div className="middle_bar">
          <label className="name">Enter Group Name {" "}
          {this.state.exist?null:
          <img src={error} alt="" />}
          </label>
          <input
            className={this.state.name==""? "texts":"texts-active"}
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            autoComplete="off"
            autoCorrect="off"
            placeholder={this.state.txt}
          />
          {this.state.exist? <div className="group-error"></div> : (
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
  { createGroups, getname }
)(AddGroup));
