import React, {Component} from 'react';

let Message = React.createClass({
  render: function() {
    console.log("Rendering <Message/>");
    return (
      <div>
        <div className="message">
          <span className="username">Anonymous1</span>
          <span className="content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
})
export default Message;
