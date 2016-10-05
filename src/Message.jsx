import React, {Component} from 'react';

let Message = React.createClass({

  render: function() {
    let style = {
      color: this.props.color
    };
    console.log("Rendering <Message/>");
    return (
        <div style={style} className="message">
          <span className="username">{this.props.name}</span>
          <span className="content">{this.props.content}</span>
        </div>
    );
  }
})
export default Message;
