import React, {Component} from 'react';
import Message from './Message.jsx';

let MessageList = React.createClass({
  render: function() {
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        {this.props.messages.map((message) => (
          <Message key={message.id} name={message.username} content={message.content}/>
        ))}

      </div>
    );
  }
})
export default MessageList;
