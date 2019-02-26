import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from './history';
import { passId } from "../actions/postActions";
import { getname } from "../actions/postActions";

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      black: "",
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentWillMount() {
    fetch("http://localhost:63474/api/Groups")
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  handleOnClick() {
    const { newArray } = this.state;
    for (var i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].highlighted === true) {
        newArray.push(this.state.posts[i]);
      }
      delete this.state.posts[i].highlighted;
      delete this.state.posts[i].id;
    }
    let request = {
      newArray: this.state.newArray
    };
    fetch("https://api.skietbaan.retrotest.co.za/api/groups/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArray)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
    window.location = "/GroupDone";
  }
  toggleHighlight = event => {
    if (this.state.posts[event].highlighted === true) {
      this.state.posts[event].highlighted = false;
      {
        this.setState({ count: this.state.count - 1 });
      }
    } else {
      this.state.posts[event].highlighted = true;
      {
        this.setState({ count: this.state.count + 1 });
      }
    }
  };
  onBack() {
    
    //window.location = "/AddGroup";
  }
  editGroup(event,name){ 
    this.props.getname(name);
    this.props.passId(event);
    history.push("/AddMembersGroup");
  }

  delete(e){
    console.log(123)
  }

  render() {
    const postitems = (
      <div className="check">
        <ul class="list-group">
          {this.state.posts.map((post, index) => (
            <li class="list-group-item list-group-item-light" key={post.id}>
              <label className="blabe">
                {post.name} <br />
                <button type="button" onClick={()=>this.editGroup(post.id,post.name)} class="btn btn-default btn-sm">
                  <span class="glyphicon glyphicon-edit" /> Edit
                </button>
                <a href="#" className="delete" onClick={()=>this.delete(post.id)}>
                  <span class="glyphicon glyphicon-remove-circle" />
                </a>
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
            <b>Retro Rabbit</b>
          </div>
        </div>
        <div className="BNavBar">
         
        </div>

        <div className="OnToTheNextOne" />
        <br />
        <br />
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
const mapStateToProps = state => {
  console.log(state);
};

export default connect(mapStateToProps,{passId,getname})(ViewGroups);
