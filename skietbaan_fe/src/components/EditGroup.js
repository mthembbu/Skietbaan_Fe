import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from "./history";
import { BASE_URL } from "../actions/types";
class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      filterText: "",
      count:0
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 componentWillMount() {
   if(this.props.id!=0){
    fetch(BASE_URL+"/api/Groups/edit?id=?33" )
    .then(res => res.json())
    .then(data => {
      this.setState({
        posts: data.map(users => {
          users.highlighted = false;
          return {
            ...users,
            highlighted: false
          };
        })
      });
    });
   }
   else{
    // history.push("/ViewGroups");
   }
 
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  handleOnClick() {
    this.setState({count:0})
    const { newArray } = this.state;
    const newarry = [...this.state.posts];

    newarry.splice(this.state.index, 1);
    this.setState({ posts: newarry });
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === true) {
        newArray.push(this.state.posts[i]);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
    }
    let request = {
      GroupIds:this.props.id,
      users: this.state.newArray
    }
    fetch(BASE_URL+"/api/groups/deleteMember/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(res =>res.json())
      .catch(function(data) {});
  }
  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;

      this.setState({ count: this.state.count - 1 });
    } else {
      this.state.posts[event].highlighted = true;

      this.setState({ count: this.state.count + 1 });
    }
  };
  onBack() {
    history.push("/ViewGroups");
  }

  goToNext = () => {
    history.push("/AddMembersGroup");
  };
  render() {
    const postitems = (
      <div className="check">
        <ul class="list-group">
          {this.state.posts
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
              <li class="list-group-item list-group-item-light" key={post.id}>
                <input
                  type="checkbox"
                  className="boxs"
                  onClick={() => this.toggleHighlight(index)}
                />
                <label className="blabe">
                  <div className="userName"> {post.username}</div>
                  <div className="emails">{post.email}</div>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
    return (
      <main className="TheMain">
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />
          <div className="center_label">
            {this.props.name}
          </div>
        </div>
        <div className="BNavBar">
          <input
            className="theText"
            id="username"
            type="text"
            onChange={this.onChange}
            autoComplete="off"
          />
          <button className="select2" onClick={this.goToNext}>
            Add new
          </button>
        </div>

        <div className="OnToTheNextOne" />
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        {this.state.count==0?null:
        <label className="bottomlabel">
          <button className="deleteUser" onClick={this.handleOnClick}>
            delete
          </button>
        </label>}
      </main>
    );
  }
}
const mapStateToProps = state => ({
  id: state.posts.groupId,
  name: state.posts.groupName
});

export default connect(mapStateToProps)(EditGroup);
