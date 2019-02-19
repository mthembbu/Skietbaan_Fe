import React, { Component } from "react";
import { connect } from 'react-redux';
import './groups.css'
import { Table } from "react-bootstrap";
import { fetchPosts } from '../actions/postActions';
class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:[]
    }
   console.log(this.props.allitems)
   this.toggleHighlight=this.toggleHighlight.bind(this);
   this.handleOnClick=this.handleOnClick.bind(this);
  } 

  componentWillMount(){

    this.props.allitems.fetchPosts()
  }

  handleOnClick(){
    const {newArray}=this.props
       for(var i = 0; i < this.props.allitems.length; i++){
        
         if(this.props.allitems[i].highlighted===true){
          newArray.push(this.props.allitems[i]);
         }
         delete this.props.allitems[i].highlighted;
         delete this.props.allitems[i].id;
        }
        let request = {
          newArray:this.props.newArray
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
     if (this.props.allitems[(event)].highlighted  === true) {
       this.props.allitems[(event)].highlighted=false;
       {this.setState({count:this.props.count-1})}
     }
     else {
       this.props.allitems[(event)].highlighted=true;
       {this.setState({count:this.props.count+1})}
     }
    
  }
  render() {
    const postItems = (   
      <Table striped hover condensed>
        <tbody >
          {this.props.allitems.map((post,index) => (
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
  allitems: state.posts.allItems
  
});

export default connect(mapStateToProps)( Groups );

