
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './groups.css';
import { BASE_URL } from '../actions/types';
import { withRouter } from 'react-router-dom';
import marked from './GroupImages/MarkedBox.png';
import unmarked from './GroupImages/Oval.png';
import back from './GroupImages/back.png';
import { AddMemberAction, pageState } from '../actions/postActions';
import seleteAll from './GroupImages/seleteAll.png';
import unSelectAll from './GroupImages/unSelectAll.png';
import { Row, Col } from "react-bootstrap";


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
			width: window.innerWidth
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.selectall = this.selectall.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.getBodyHeight = this.getBodyHeight.bind(this);
  }
  async componentDidMount() {
    this.updateDimensions();
    await this.props.AddMemberAction(this.props.id);
  }
  componentWillMount() {
		window.addEventListener('resize', this.updateDimensions);
  }
  getBodyHeight() {
		if (this.state.width < 575) {
      return (this.state.height - 240);
    } else {
      return 78;
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
    this.props.pageState(1);
  }

  toggleHighlight = event => {
    if (this.props.existing[event].highlighted === true) {
      this.props.existing[event].highlighted = false;
      this.setState({ count: this.state.count - 1 });
    } else {
      this.props.existing[event].highlighted = true;
      this.setState({ count: this.state.count + 1 });
    }
  };

  onBack() {
    this.props.pageState(1);
  }

  cancel = () => {
    for (var i = 0; i < this.props.existing.length; i++) {
      this.props.existing[i].highlighted = false;
    }
    this.setState({ count: 0 });
  };

  selectall() {
    if (this.state.check === "Select all") {
      this.setState({ count: this.props.existing.length });
      for (var i = 0; i < this.props.existing.length; i++) {
        this.props.existing[i].highlighted = true;
      }
      this.setState({ check: "Unselect all" });
    } else {
      this.setState({ count: 0 });
      for (var i = 0; i < this.props.existing.length; i++) {
        this.props.existing[i].highlighted = false;
      }
      this.setState({ check: "Select all" });
    }
  }

  render() {
    const postitems = (
      <div className="check-edit" style={{ height: this.getBodyHeight() + 'vh' }}>
      {this.props.existing.length===0?null:
        <ul class="list-group" style={{ textAlign: 'left' }}>
          {this.props.existing
            .filter((post) => {
              return (
                !this.state.filterText ||
                post.username.toLowerCase().startsWith(this.state.filterText.toLowerCase()) ||
                post.email.toLowerCase().startsWith(this.state.filterText.toLowerCase())
              );
            })
            .map((post, index) => (
              <li class="listItem" key={post.id}>
                <img
                  className="checkbox-delete"
                  onClick={() => this.toggleHighlight(index)}
                  src={post.highlighted ? marked : unmarked}
                  alt=""
                />
                <label className={post.highlighted === true ? 'blabe' : 'blabe2'}>
                  <div className={post.highlighted === true ? 'userName-active' : 'userName'}>
                    {post.username}
                  </div>
                  <div className={post.highlighted === true ? 'emails-active' : 'email'}>
                    {post.email}
                  </div>
                </label>
              </li>
            ))}
        </ul>}
      </div>
    );
    return (
          <div className="The-Main">
            <div className="navBar-containers">
              <img className="back-image" onClick={this.onBack} src={back} alt="" />
              <div className="the-nav-bar">
                <img className="back-image" onClick={this.onBack} src={back} alt="" />
                <table className="names-table">
                  <tbody className="nameTbody">
                    <tr>
                      <td className="center-labelss">ADD USERS</td>
                    </tr>
                    <tr>
                      <td className="nameOfGroup">{this.props.name.toUpperCase()}</td>
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
                  <img className="btn-select-all" src={this.state.count === this.props.existing.length ? seleteAll : unSelectAll} alt="" />
                </div>
              </div>
            </div>
            <div className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
              {postitems}
            </div>
            {this.state.count == 0 ? null : (
              <div className="bottom-panel">
                <div className="bpanel">
                  <button className="confirm-group" onClick={this.addUsers}>
                    ADD USERS
							</button>

                  <button className="cancel-delete" onClick={() => this.cancel()}>
                    CANCEL
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
  existing: state.posts.existing
});
export default withRouter(
  connect(
    mapStateToProps,
    { AddMemberAction, pageState }
  )(AddMembersGroup)
);
