import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage ,emptyMessageArray} from '../../actions/chatAction'


export class SendMessage extends Component {
constructor(props){
    super(props);
    this.state = {
        text:""
    }
}

handleSubmit = (e)=>{
    e.preventDefault()
    this.props.emptyMessageArray()
    this.props.sendMessage(this.state.text,this.props.roomId,this.props.user)
    this.setState({text:""})
}
handleChange = (e)=>{
    this.setState({text:e.target.value})
}
render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"  onChange={this.handleChange} value={this.state.text}/>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user:state.chatReducer.currentUser,
  rooms:state.chatReducer.rooms,
  roomId:state.chatReducer.roomId,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, {sendMessage ,emptyMessageArray})(SendMessage)
