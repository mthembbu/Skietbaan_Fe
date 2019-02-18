import React, { Component } from 'react'
import { connect } from 'react-redux';
import './groupStyle.css'

class GroupsName extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:'',
            valid:'',
            black:''
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
 onChange(e){
    this.setState({[e.target.name]:e.target.value})
    } 
    doit(){
        this.setState({black:this.state.name});
    }
onSubmit(){
  if(this.state.name.length>1){
    let RequestObject = {
        "Name": this.state.name,
      }
      localStorage.setItem(this.state.name,this.state.name);
      fetch("http://localhost:63474/api/groups", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(RequestObject)
      }).then(function(response) {
        return response.json();
      }).then( function(data) {
        
      }).catch(function(data) {
      });
    }
    window.location = "/Groups";

}
  render() {
    return (
      <div className="top">
        <label><b>GROUP NAME</b></label><br/>
        <input className="name" type="text" name="name" id="name" value={this.props.groupName} onChange={this.onChange} />
        <label>{this.state.valid}</label><br/><br/>
        <button onClick={this.onSubmit} className="next"><b>Next</b></button>
      </div>
    )
  }
}
const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item,
    groupName: state.groupName,
  });
const mapDispatchToProps = dispatch => ({
    onGroupNameChange: (newGroupName) => dispatch({type: "UPDATE_GROUPNAME",payload:newGroupName})
  });
  export default connect(mapStateToProps,mapDispatchToProps)(GroupsName);