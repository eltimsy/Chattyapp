import React, {Component} from 'react';

let ChatBar = React.createClass({
  render: function() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)" />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
})
export default ChatBar;
