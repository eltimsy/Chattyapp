import React, {Component} from 'react';
import Message from './Message.jsx';

let MessageList = React.createClass({
  render: function() {
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        <Message />
      </div>
    );
  }
})
export default MessageList;
