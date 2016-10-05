import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleUserChange(e) {
    e.preventDefault();
    if(e.key=== "Enter"){
      this.props.updateUser()
    }
  }
  handleKeyPress(e) {
    e.preventDefault();
    if(e.key=== "Enter"){
      this.props.update()
    }
  }
  render() {
    console.log("Rendering <ChatBar/>");
    console.log(this.props.value)
    return (
      <footer>
        <input
        id="username"
        type="text"
        placeholder="Your Name (Optional)"
        value={this.props.username}
        onChange={this.props.userChange}
        onKeyUp={this.handleUserChange.bind(this)}
         />
        <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        value={this.props.value}
        onChange={this.props.requestChange}
        onKeyUp={this.handleKeyPress.bind(this)}
         />
      </footer>
    );
  }
}
// ChatBar.propTypes = {
//
// }
export default ChatBar;
