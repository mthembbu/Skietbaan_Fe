import React, { Component } from "react";
import { connect } from "react-redux";
import "./groups.css";
import history from "./history";
import { passId } from "../actions/postActions";
import { getname } from "../actions/postActions";

class ViewGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      count: 0,
      ShowMe: true,
      ids:0,
      index:0
    };
    this.onBack = this.onBack.bind(this);
    this.onChange = this.onChange.bind(this);
    this.delete = this.delete.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }
  componentWillMount() {
    fetch("http://localhost:64444/api/Groups")
      .then(res => res.json())
      .then(data => this.setState({ posts: data }));
  }
  onChange(event) {
    this.setState({ filterText: event.target.value });
  }

  onBack() {
    history.push("/ViewGroups");
  }
  editGroup(event, name) {
    this.props.getname(name);
    this.props.passId(event);
      history.push("/EditGroup");
  }

  update=(post,indexs)=>{
    
    this.setState({ids:post})
    this.setState({index:indexs})
    
  }

  delete() {
    this.setState({ ShowMe: false });
    const newarry = [...this.state.posts];

    newarry.splice(this.state.index, 1);
    this.setState({ posts: newarry });
    fetch("http://localhost:64444/api/groups/" + this.state.ids, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.ids)
    })
      .then(function(response) {})
      .then(function(data) {})
      .catch(function(data) {});
      
  }

  changeState = () => {
    this.setState({ ShowMe: false });
  };

  do = () => {
    if(this.state.ShowMe==true){
      this.setState({ ShowMe: false });
    }
    else{
      this.setState({ ShowMe: true });

    }
    
  };

  handleOnClick = () => {};
  render() {
    const postitems = (
      <div className="check" onClick={()=>this.do()}>
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
              <li
                style={{ width: "100%", background: "#bbbcbd" }}
                class="list-group-item list-group-item-light"
                key={post.id}
              >
                <label className="the-container">
                  <label
                    className="nn"
                    onClick={() => this.editGroup(post.id, post.name)}
                  >
                   <div className="groupNames">  {post.name}</div>
                  </label>
                  <div className="im">
                    <img
                      src={require("./GroupImages/submit plus add score.png")}
                      alt="" onClick={()=>this.update(post.id,index)}
                    />
                  </div>
                </label>
              </li>
            ))}
        </ul>
        
      </div>
    );

    return (
      <main className="TheMain" onClick={()=>this.do()}>
        <div className="TheNavBar">
          <a href="#" class="fa fa-angle-left" onClick={this.onBack} />

          <h2 className="center_label">View Groups</h2>
        </div>
        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          {postitems}
        </div>
        {this.state.ShowMe?null:
        <div className="bottompanel">
          <div className="ctext">
            <label className="confirmText">Delete Group C</label>
          </div>
          <div className="cbutns">
            <button className="confirm"  onClick={() => this.delete()}>Confirm</button>
          </div>
          <div className="ubutns">
            <button className="undo">undo</button>
          </div>
        </div>}
      </main>
    );
  }
}
const mapStateToProps = state => ({
  name: state.posts.groupName,
  id: state.posts.groupId
});

export default connect(
  mapStateToProps,
  { passId, getname }
)(ViewGroups);
