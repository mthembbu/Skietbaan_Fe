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
      deleteState: false
    };
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }

  async componentWillMount() {
    await this.props.fetchGroups();
    await this.props.groupDictionary();
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
    } else {
      this.props.groupsList[index].isActive = false;
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
      .catch(function(data) {});
  }

  render() {
    const postitems = (
      <div className="the-main">
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
                      post.isActive === true ? "first-row" : "first-row-active"
                    }
                    onClick={() => this.editGroup(post)}
                  >
                    {post.name}
                  </td>

                  <td className="group-container">
                    {post.isActive === true ? (
                      <div>
                        <img src={group} className="groupIcon" alt="" />
                        <label className="numberOfUser">
                          {this.props.groupDict[post.id]}
                        </label>
                      </div>
                    ) : null}
                  </td>
                  <td>
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
      </div>
    );

    return (
      <main className="The-Main">
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
      </main>
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
  groupDict: state.posts.groupDict
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
