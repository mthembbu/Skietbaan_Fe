import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import {
  passId,
  getName,
  newGroupArrayState,
  fetchGroups,
  groupDictionary,
  pageState,
  emptyState
} from "../actions/postActions";
import { BASE_URL } from "../actions/types";
import Switch from "@material-ui/core/Switch";
import group from "./GroupImages/Group.png";
import PropTypes from "prop-types";

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      ids: 0,
      indexs: "",
      selected: "",
      deleteState: false,
      height: window.innerHeight,
      width: window.innerWidth
    };
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
  }

  async componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    await this.props.fetchGroups();
    await this.props.groupDictionary();
  }
  getBodyHeight() {
    if (this.state.width < 575) {
      return this.state.height - 240 + "px";
    } else {
      return "57vh";
    }
  }
  componentDidMount() {
    this.updateDimensions();
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

  editGroup(obj) {
    this.props.emptyState();
    this.props.getName(obj.name);
    this.props.passId(obj.id);
    this.props.pageState(1);
  }

  async delete(groupId, index) {
    if (this.props.groupsList[index].isActive === false) {
      this.props.groupsList[index].isActive = true;
      this.props.groupsList[index].highlighted = true;
    } else {
      this.props.groupsList[index].isActive = false;
      this.props.groupsList[index].highlighted = false;
    }
    this.props.newGroupArrayState([...this.props.groupsList]);
    await fetch(BASE_URL + "/api/Groups/" + groupId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(groupId)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {})
      .catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }
  toggleHighlight = event => {
    if (this.props.groupsList[event].highlighted === true) {
      this.props.groupsList[event].highlighted = false;
    } else {
      this.props.groupsList[event].highlighted = true;
    }
  };

  render() {
    const loader = (
      <div className="loader-formatting">
        <div className={this.props.loader ? "hidden" : "loader"} />
        <div className={this.props.loader ? "hidden" : "target-loader-image"} />
        <div className={this.props.loader ? "hidden" : "loading-message"}>
          Loading...
        </div>
      </div>
    );

    const postitems = (
      <div
        className="view-the-main"
        style={this.state.width >= 575 ? { marginTop: "-19px" } : null}
      >
        {this.props.groupsList.length === 0 ? (
          <div className="view-error-container">
            <label className="view-error-msg">
              No Groups have been created yet.
            </label>
          </div>
        ) : (
          <table className="table-member">
            <tbody>
              {this.props.groupsList
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
                      className={
                        post.isActive === true
                          ? "first-row"
                          : "first-row-active"
                      }
                      onClick={() => this.editGroup(post)}
                    >
                      {post.name}
                    </td>

                    <td
                      className="group-container"
                      onClick={() => this.editGroup(post)}
                    >
                      {post.isActive === true ? (
                        <div>
                          <img src={group} className="groupIcon" alt="" />
                          <label className="numberOfUser">
                            {this.props.groupDict[post.id]}
                          </label>
                        </div>
                      ) : null}
                    </td>
                    <td className="switch-container">
                      <div className="group-view">
                        <Switch
                          color={"primary"}
                          className="Active"
                          focus={true}
                          checked={post.isActive}
                          onClick={() => this.delete(post.id, index)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    );

    return (
      <div className="The-Main" style={{ height: this.getBodyHeight() }}>
        {this.props.loader ? postitems : loader}
      </div>
    );
  }
}

ViewGroups.propTypes = {
  groupDict: PropTypes.shape({
    Id: PropTypes.arrayOf(PropTypes.number),
    count: PropTypes.arrayOf(PropTypes.number)
  })
};

const mapStateToProps = state => ({
  name: state.posts.groupName,
  id: state.posts.groupId,
  groupsList: state.posts.groupsList,
  groupDict: state.posts.groupDict,
  loader: state.posts.loader
});

export default connect(
  mapStateToProps,
  {
    passId,
    getName,
    groupDictionary,
    newGroupArrayState,
    pageState,
    fetchGroups,
    emptyState
  }
)(ViewGroups);
