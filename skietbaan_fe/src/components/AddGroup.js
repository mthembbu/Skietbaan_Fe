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
      name: ""
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
    this.props.groupActions.getname(this.state.name);
    history.push("/Groups");
  }
  render() {
    return (
      <div className="page">
        <div className="top_bar">
          <a href="#" class="fa fa-angle-left" />

          <h3 className="center_label">
            <b> Create Group</b>
          </h3>
        </div>
        <div className="middle_bar">
          <label className="name">
            <h3>Enter Group Name</h3>
          </label>
          <input
            className="texts"
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            autoComplete="off"
          />
          <button className="add" type="submit" onClick={this.onClick}>
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
