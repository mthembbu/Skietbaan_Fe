import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as GroupActions from "../actions/postActions";
import "./add.css";
import history from "./history";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      colors: true
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    let RequestObject = {
      Name: this.state.name
    };
    this.props.groupActions.getname(RequestObject);
    history.push("/Groups");
  }
  render() {
    return (
      <div className="page">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />

          <label className="center_label">Create Group</label>
        </div>
        <div className="middle_bar">
          <label className="name">Enter Group Name</label>
          <input
            className="texts"
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            autoComplete="off"
          />
          <button
            className={this.state.name == "" ? "add" : "add2"}
            type="submit"
            onClick={this.onClick}
          >
            Add Users
          </button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    groupActions: bindActionCreators(GroupActions, dispatch)
  };
};
const mapStateToProps = state => ({
  name: state.posts.groupName
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGroup);
