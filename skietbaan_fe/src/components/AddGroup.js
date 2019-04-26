import React, { Component } from "react";
import { connect } from "react-redux";
import { getName, pageState,setScreenSize } from "../actions/postActions";
import history from "./history";
import "./add.css";
import { BASE_URL } from "../actions/types";
import { getCookie } from "../components/cookie.js";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      txt: "",
      groups: [],
      exist: true,
      pageState: false,
			height: window.innerHeight,
			width: window.innerWidth
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getBodyHeight = this.getBodyHeight.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.setScreenSize(document.body.clientHeight);
    fetch(BASE_URL + "/api/groups")
      .then(res => res.json())
      .then(data =>
        this.setState({
          groups: data.map(names => names.name.toLowerCase())
        })
      ).catch(err => {
        /* DO SOMETHING WITH THE  ERROR TYPE CAUGHT*/
      });
  }

  componentWillMount(){
    this.props.setScreenSize(document.body.clientHeight);
    console.log(document.body.clientHeight)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick() {
    if (this.state.groups.indexOf(this.state.name.toLowerCase()) === -1) {
      if (this.state.name.length != 0) {
        this.props.getName(this.state.name);
        history.push("/Groups");
      } else {
        this.setState({ txt: "group name can't be empty" });
      }
    } else {
      this.setState({ exist: false });
    }
  }

  getBodyHeight() {
		if (this.state.width < 575) {
			return (this.state.height - 240) + "px";
		} else {
			return "61vh";
		}
	}

  render() {
    if (!getCookie("token")) {
      window.location = "/registerPage";
    }
    return (
      <div className="add-group-main" style={{ height: this.getBodyHeight()}}>
        <div className="page">
          <div className="middle-bar">
            <input
              className="texts"
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              autoComplete="off"
              autoCorrect="off"
              placeholder="Group Name"
            />
            {this.state.exist === true ? null : (
              <label className="errorMsg">Group Name Already Exists</label>
            )}
          </div>
          <div className="add-container">
            <button className={this.state.name===""?"add":"add-active"} onClick={this.onClick}>
              ADD USERS
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

export default connect(
  mapStateToProps,
  { getName, pageState,setScreenSize }
)(AddGroup);
