import React, { Component } from "react";
import "./groups.css";
import { BASE_URL } from "../actions/types";
import back from "./GroupImages/back.png";
import unmarked from "./GroupImages/unmarked.png";
import marked from "./GroupImages/marked.png";

class requirements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray: [],
      groups: [],
      count: 0,
      filterText: "",
      check: "Select all",
      numberofshots: 0
    };
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.onBack = this.onBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateNumberOfShots = this.updateNumberOfShots.bind(this);
  }
  UNSAFE_componentWillMount() {
    fetch(BASE_URL + "/api/Competition/all")
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.map(users => {
            users.highlighted = false;
            return {
              ...users,
              highlighted: false,
              background: "white",
              image: unmarked
            };
          })
        });
      }).catch(err =>  {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  updateNumberOfShots() {
    fetch(
      BASE_URL + "/api/Documents/changeShots?num=" + this.state.numberofshots,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.numberofshots)
      }
    )
      .then(function(response) {})
      .then(function(data) {})
      .catch(err =>  {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
    this.props.history.push("/requirements");
  }

  handleChange(event) {
    this.setState({ numberofshots: event.target.value });
  }
  toggleHighlight = event => {
    if (this.state.posts[event].highlighted == true) {
      this.state.posts[event].highlighted = false;
      this.state.posts[event].image = unmarked;
      this.state.posts[event].background = "white";

      this.setState({ count: this.state.count + 1 });
    } else {
      this.state.posts[event].highlighted = true;
      this.state.posts[event].background = "#F3F4F9";
      this.state.posts[event].image = marked;
      this.setState({ count: this.state.count - 1 });
    }
  };
  onBack() {
    this.props.history.push("/create");
  }
  render() {
    const postitems = (
      <div className="check documents-center">
        <ul class="list-group" style={{ textAlign: "left" }}>
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
                class="list-group-item list-group-item-light"
                key={post.id}
                style={{
                  background: post.background,
                  textAlign: "left"
                }}
              >
                <img
                  className="checkbox-delete"
                  onClick={() => this.toggleHighlight(index)}
                  src={post.image}
                  alt=""
                />
                <label className="blabe">
                  <div className="userName" style={{ color: post.colors }}>
                    {post.name}
                  </div>
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
    return (
      <main className="The-Main">
        <div className="the-nav-bar">
          <img className="back-image" onClick={this.onBack} src={back} alt="" />
          <label className="center-label">Requirements</label>
        </div>

        <div
          className="scrollbar"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          <div className="label-score">
            <div className="centre-label">
              <label className="scorelabel">Enter Number of SHots</label>
            </div>
            <div className="input-container">
              <input
                type="number"
                id="scoreInput"
                value={this.state.numberofshots}
                onChange={this.handleChange}
                min="0"
                step="1"
                name="score"
                className="score"
              />
            </div>
          </div>
          <br />
          <div className="centre-label">
            <label className="scorelabel">Select Competitions</label>
          </div>
          <br />
          {postitems}
        </div>

        <label className="bottom-label">
          <button className="create-group" onClick={this.updateNumberOfShots}>
            Create Group
          </button>
        </label>
      </main>
    );
  }
}

export default requirements;
