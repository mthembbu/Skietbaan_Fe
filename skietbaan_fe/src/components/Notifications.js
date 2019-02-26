import React, { Component } from "react";
import "../components/NotificationsStyle.css";
import { Table, Button, Col } from "reactstrap";
import { getCookie } from "./cookie";
import  history  from "./history";

class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      notificationMsg: "",
      typeOfNotification: "",
      tokenValue: "",
      isRead: false,
      showDelete: false,
      deleteClicked: false,
      viewClicked: false
    };
    this.handleView = this.handleView.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleRead() {
    if (this.state.isRead) {
      //
    }
  }

  onDelete=key =>{
  console.log(key);
    let id = this.state.array[key].id
    let newArray  = this.state.array;
    newArray.splice(key,1)
   this.setState({array : newArray});
   
     fetch(`http://localhost:63474/api/Notification/${id}`, {
      method: "Delete"
    }).catch(err => {
      console.error("err", err);
    });
  }

  initialState() {
    return this.setState({
      showDelete: false
    });
  }

  handleView() {
    if (this.state.viewClicked) {
      //redirect to correct page
    } else {
    }
  }

  componentDidMount() {
    if (getCookie("token")) {
      var token = document.cookie;
      fetch("http://localhost:63474/api/Notification?" + token)
        .then(response => response.json())
        .then(data =>{
          this.setState({
            array: data
          })
          console.log(this.state.array)}
        )
        .catch(function(data) {
          console.log(data);
        });
    }
  }

  redirect(){
    history.push("/notify");
  }

  render() {
    const headingItems = (
      <div className="PageHeading">
        <img src={require("./Notification-Img/redirect2.png")} onClick={this.redirect.bind(this)} alt="redirect" />
        <b>Notifications</b>
      </div>
    );

    const viewButtons = (
      <div>
        <a href="">
          <img
            src={require("./Notification-Img/eyeIcon2.png")}
            alt="redirect"
          />
        </a>
      </div>
    );

    const threeDots = (
      <div>
          
      </div>
    );

    const deleteButtons = (
      <div>
          <img
            onClick={this.onDelete}
            className="Buttons"
            src={require("./Notification-Img/delete2.png")}
            alt="redirect"
          />
      </div>
    );

    const postItems = (
      <Table>
        <tbody>
          {this.state.array.map((post,i) => (
            <tr key={i} >
              <td>{post.notificationMessage}</td>
              <td>{viewButtons}</td>
              <td><img
           onClick={()=>{this.onDelete(i)}}
            className="Buttons"
            src={require("./Notification-Img/3dots.png")}
            alt="redirect"
          /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return (
      <div>
        <div>{headingItems}</div>
        <div>{postItems}</div>
        <div>
          <Col>
            <Button className="buttonCss" onClick={this.redirect}>
              Load older notifications
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}
export default notification;
