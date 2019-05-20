import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import MessageSender from './SendMessage'
import './MessageL.css'
export class MessageList extends Component {
constructor(props){
  super(props);
}

componentWillUpdate(){
  const node = ReactDOM.findDOMNode(this)
  this.shouldScrollToBottom =node.scrollTop + node.clientHeight >= node.scrollHeight
}

componentDidUpdate(){
  const node = ReactDOM.findDOMNode(this);
  node.scrollTop = node.scrollHeight
}

  render() {
    return (
      <div className="message-list-main-container"> 
        {this.props.messages.map(data=>(
          <div>
           <div> {data.senderId}</div>
           <div> {data.text}</div>
           </div>
        ))}
        <MessageSender />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages:state.chatReducer.messages,
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
