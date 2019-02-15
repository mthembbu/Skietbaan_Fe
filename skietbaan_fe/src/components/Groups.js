import React, { Component } from "react";
import { connect } from 'react-redux';
import './groups.css'
import { Table, Jumbotron } from "react-bootstrap";
class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newArray:[],
      count:0,
      black: ''  
    }
   this.toggleHighlight=this.toggleHighlight.bind(this);
   this.handleOnClick=this.handleOnClick.bind(this);
  } 
  componentWillMount() {
    fetch('http://localhost:63474/api/user')
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
        }
        )
      });
  }


  handleOnClick(){
    const {newArray}=this.state
       for(var i = 0; i < this.state.posts.length; i++){
        
         if(this.state.posts[i].highlighted===true){
          newArray.push(this.state.posts[i]);
         }
         delete this.state.posts[i].highlighted;
         delete this.state.posts[i].id;
        }
        let request = {
          newArray:this.state.newArray
        }
         fetch("http://localhost:63474/api/groups/add", {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(newArray)
         }).then(function(response) {
        
         }).then( function(data) {
           }).catch(function(data) {
      
        });
        window.location = "/GroupDone";
  }
  toggleHighlight = event => {
     if (this.state.posts[(event)].highlighted  === true) {
       this.state.posts[(event)].highlighted=false;
       {this.setState({count:this.state.count-1})}
     }
     else {
       this.state.posts[(event)].highlighted=true;
       {this.setState({count:this.state.count+1})}
     }
  }
  render() {
    const postItems = (   
      <Table striped hover condensed>
        <tbody >
          {this.state.posts.map((post,index) => (
            <tr key={post.id.toString()}  onClick={()=>this.toggleHighlight(index)} value={post.id} onChange={()=>this.onChange(post.id)}>
              <td ><h5>{post.username} {index}</h5>
                <h5>{post.email}</h5></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
    return (
      <main>
        <div main className="topnav" data-simplebar data-simplebar-auto-hide="false">
          <label className="create">Create Groups</label>
         
          <label className="label" onChange={this.handleOnChange}>{this.state.count}</label>
          <br />
          <a className="search" href="/Groups"><span class="glyphicon glyphicon-chevron-left"></span></a>
          <input className="texts" type="text" placeholder="Search.." />
        </div>
        <div className="middle">
          <label className="b"><b>Add Members</b></label>
          <button className="add" onClick={this.handleOnClick}>Add all</button>
       </div>
        <br />
        <br />
        <div className="scrollbar" data-simplebar data-simplebar-auto-hide="false">
          {postItems}
        </div>
      </main>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(Groups);
