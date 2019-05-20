import React, { Component } from 'react'
import './chatCont.css'
import { connect } from 'react-redux'
import { connectUser ,getMessages } from '../../actions/chatAction'
import ListRooms from './ListRooms'
import MessageList from './MessageList'


export class chatContainer extends Component {
    constructor(props){
        super(props);
        this.state ={
            message:[],
            rooms:[]
        }
    }

    componentWillMount(){
       this.props.connectUser()
    }

  render() {
    return (
      <div className="chat-container-main-container">
        <ListRooms />
        <MessageList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    user:state.chatReducer.currentUser,
    rooms:state.chatReducer.rooms,
})



export default connect(mapStateToProps, {connectUser,getMessages})(chatContainer)
