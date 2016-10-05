import React, {Component} from 'react';

let Message = React.createClass({

  render: function() {
    let style = {
      color: this.props.color
    };
    let fiximage = {
      //width: '500px',
    };
    console.log("Rendering <Message/>");
    return (
        <div style={style} className="message">
          <span className="username">{this.props.name}</span>
          <span className="content">{this.props.content}</span>
          <span ><img style={fiximage} src={this.props.image}/></span>
        </div>
    );
  }
})
export default Message;
