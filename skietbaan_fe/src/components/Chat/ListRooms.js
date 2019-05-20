import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './ListRoom.css'
import { getMessages } from '../../actions/chatAction'

export class ListRooms extends Component {
  static propTypes = {
    prop: PropTypes
  }
  handleChange = (id , room)=>{
    this.props.getMessages(id,this.props.user);
  }
  
  render() {
    return (
      <div className="list-rooms-main-container">
       {this.props.rooms.map((room,index)=>(
         
           <div ke={index} onClick={()=>this.handleChange(room.id)}>{room.name}</div>
       ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rooms:state.chatReducer.rooms,
  user:state.chatReducer.currentUser,
  users:state.chatReducer.users,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, {getMessages})(ListRooms)
